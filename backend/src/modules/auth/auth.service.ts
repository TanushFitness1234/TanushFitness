import crypto from 'crypto';
import { UserRole, UserStatus } from '@prisma/client';
import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { logger } from '../../config/logger';
import { env } from '../../config/env';
import {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  UpdateProfileInput,
  SanitizedUser,
} from './auth.types';
import {
  hashPassword,
  comparePassword,
  hashToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiryDate,
} from './auth.utils';

export class AuthService {
  /**
   * Helper to format sanitized user without sensitive credentials
   */
  private static sanitizeUser(user: any): SanitizedUser {
    return {
      id: user.id,
      name: user.name ?? null,
      email: user.email,
      mobile: user.mobile ?? null,
      city: user.city ?? null,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      emailVerified: user.emailVerified,
      mobileVerified: user.mobileVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      gymOwnerProfile: user.gymOwnerProfile
        ? {
            id: user.gymOwnerProfile.id,
            companyName: user.gymOwnerProfile.companyName,
            phone: user.gymOwnerProfile.phone,
            city: user.gymOwnerProfile.city,
            address: user.gymOwnerProfile.address,
            gstNumber: user.gymOwnerProfile.gstNumber,
          }
        : null,
      jobSeekerProfile: user.jobSeekerProfile
        ? {
            id: user.jobSeekerProfile.id,
            fullName: user.jobSeekerProfile.fullName,
            phone: user.jobSeekerProfile.phone,
            preferredCity: user.jobSeekerProfile.preferredCity,
            experience: user.jobSeekerProfile.experience,
            skills: user.jobSeekerProfile.skills,
            resumeUrl: user.jobSeekerProfile.resumeUrl,
          }
        : null,
    };
  }

  /**
   * 1. Register User (Gym Owner or Job Seeker)
   */
  static async register(input: RegisterInput): Promise<SanitizedUser> {
    const { name, email, mobile, password, role, city, gymName, preferredCity } = input;

    // Check unique email
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      throw ApiError.conflict('Email address is already registered');
    }

    // Check unique mobile
    const existingMobile = await prisma.user.findUnique({ where: { mobile } });
    if (existingMobile) {
      throw ApiError.conflict('Mobile number is already registered');
    }

    const hashedPassword = await hashPassword(password);

    // Transaction to create User and Profile
    const newUser = await prisma.$transaction(async tx => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          mobile,
          city: city || preferredCity || null,
          password: hashedPassword,
          role,
          status: UserStatus.ACTIVE,
          isActive: true,
        },
      });

      if (role === UserRole.GYM_OWNER && gymName) {
        await tx.gymOwner.create({
          data: {
            userId: user.id,
            companyName: gymName,
            phone: mobile,
            city: city || null,
          },
        });
      } else if (role === UserRole.JOB_SEEKER) {
        await tx.jobSeeker.create({
          data: {
            userId: user.id,
            fullName: name,
            phone: mobile,
            preferredCity: preferredCity || null,
          },
        });
      }

      return tx.user.findUnique({
        where: { id: user.id },
        include: {
          gymOwnerProfile: true,
          jobSeekerProfile: true,
        },
      });
    });

    logger.info(`✨ User registered successfully: [${newUser?.email}] as [${newUser?.role}]`);
    return this.sanitizeUser(newUser);
  }

  /**
   * 2. Login using Email or Mobile Number
   */
  static async login(
    input: LoginInput,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ accessToken: string; refreshToken: string; user: SanitizedUser }> {
    const { identifier, password } = input;

    // Find by Email OR Mobile
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { mobile: identifier }],
      },
      include: {
        gymOwnerProfile: true,
        jobSeekerProfile: true,
      },
    });

    if (!user) {
      throw ApiError.unauthorized('Invalid email/mobile number or password');
    }

    // Check Password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email/mobile number or password');
    }

    // Validate User Status
    if (user.status === UserStatus.SUSPENDED) {
      throw ApiError.forbidden('Your account has been suspended. Please contact customer support.');
    }
    if (user.status === UserStatus.DELETED || user.deletedAt) {
      throw ApiError.forbidden('Account not found.');
    }
    if (user.status === UserStatus.INACTIVE || !user.isActive) {
      throw ApiError.forbidden('Your account is currently inactive.');
    }

    // Generate JWT Access & Refresh Tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save HASHED Refresh Token in DB
    const hashedRefreshToken = hashToken(refreshToken);
    const expiresAt = getRefreshTokenExpiryDate();

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        hashedToken: hashedRefreshToken,
        expiresAt,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    });

    logger.info(`🔑 User logged in: [${user.email}] from IP: [${ipAddress || 'unknown'}]`);

    return {
      accessToken,
      refreshToken,
      user: this.sanitizeUser(user),
    };
  }

  /**
   * 3. Refresh Token Rotation
   */
  static async refreshToken(
    rawRefreshToken: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ accessToken: string; newRefreshToken: string; user: SanitizedUser }> {
    if (!rawRefreshToken) {
      throw ApiError.unauthorized('Refresh token is required');
    }

    // Verify JWT integrity
    let payload;
    try {
      payload = verifyRefreshToken(rawRefreshToken);
    } catch (_err) {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }

    const hashedInputToken = hashToken(rawRefreshToken);

    // Find active stored token
    const storedToken = await prisma.refreshToken.findUnique({
      where: { hashedToken: hashedInputToken },
      include: {
        user: {
          include: {
            gymOwnerProfile: true,
            jobSeekerProfile: true,
          },
        },
      },
    });

    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
      throw ApiError.unauthorized('Invalid, expired, or revoked refresh token');
    }

    const user = storedToken.user;
    if (user.status !== UserStatus.ACTIVE || !user.isActive) {
      throw ApiError.forbidden('User account is not active');
    }

    // REVOKE Old Refresh Token
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    // GENERATE New Tokens (Rotation)
    const newPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);
    const newHashedToken = hashToken(newRefreshToken);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        hashedToken: newHashedToken,
        expiresAt: getRefreshTokenExpiryDate(),
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    });

    logger.info(`🔄 Token refreshed for user: [${user.email}]`);

    return {
      accessToken: newAccessToken,
      newRefreshToken,
      user: this.sanitizeUser(user),
    };
  }

  /**
   * 4. Logout Current Device
   */
  static async logout(rawRefreshToken?: string): Promise<void> {
    if (!rawRefreshToken) return;

    const hashedInputToken = hashToken(rawRefreshToken);

    await prisma.refreshToken.updateMany({
      where: { hashedToken: hashedInputToken, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /**
   * Logout All Devices
   */
  static async logoutAll(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    logger.info(`🚪 Logged out all active sessions for user ID: [${userId}]`);
  }

  /**
   * 5. Forgot Password
   */
  static async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && user.status === UserStatus.ACTIVE) {
      // Generate 32-byte hex token
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedResetToken = hashToken(rawToken);
      const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: hashedResetToken,
          resetTokenExpiry,
        },
      });

      const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${rawToken}`;
      logger.info(`🔑 [FORGOT PASSWORD] Password reset URL generated for [${email}]: ${resetUrl}`);
    }

    return {
      message: 'If an account exists with that email, a password reset link has been generated.',
    };
  }

  /**
   * 6. Reset Password
   */
  static async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    const hashedResetToken = hashToken(rawToken);

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedResetToken,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw ApiError.badRequest('Invalid or expired password reset token');
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      }),
      // Invalidate all active sessions for security
      prisma.refreshToken.updateMany({
        where: { userId: user.id, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);

    logger.info(`🔐 Password reset successful for user: [${user.email}]`);
  }

  /**
   * 7. Change Password
   */
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const isCurrentValid = await comparePassword(currentPassword, user.password);
    if (!isCurrentValid) {
      throw ApiError.badRequest('Current password is incorrect');
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      }),
      // Invalidate all active sessions
      prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);

    logger.info(`🔐 Password changed by authenticated user: [${user.email}]`);
  }

  /**
   * 8. Get Current Authenticated User Profile
   */
  static async getProfile(userId: string): Promise<SanitizedUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        gymOwnerProfile: true,
        jobSeekerProfile: true,
      },
    });

    if (!user) {
      throw ApiError.notFound('User profile not found');
    }

    return this.sanitizeUser(user);
  }

  /**
   * 9. Update User Profile
   */
  static async updateProfile(userId: string, data: UpdateProfileInput): Promise<SanitizedUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        gymOwnerProfile: true,
        jobSeekerProfile: true,
      },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Check duplicate mobile if updating
    if (data.mobile && data.mobile !== user.mobile) {
      const existingMobile = await prisma.user.findUnique({ where: { mobile: data.mobile } });
      if (existingMobile) {
        throw ApiError.conflict('Mobile number is already in use by another account');
      }
    }

    const updatedUser = await prisma.$transaction(async tx => {
      // Update User root fields
      await tx.user.update({
        where: { id: userId },
        data: {
          name: data.name !== undefined ? data.name : user.name,
          mobile: data.mobile !== undefined ? data.mobile : user.mobile,
          city: data.city !== undefined ? data.city : user.city,
        },
      });

      // Update GymOwner profile
      if (user.role === UserRole.GYM_OWNER && user.gymOwnerProfile) {
        if (data.gymName || data.city || data.mobile) {
          await tx.gymOwner.update({
            where: { userId },
            data: {
              companyName: data.gymName ?? user.gymOwnerProfile.companyName,
              city: data.city ?? user.gymOwnerProfile.city,
              phone: data.mobile ?? user.gymOwnerProfile.phone,
            },
          });
        }
      }

      // Update JobSeeker profile
      if (user.role === UserRole.JOB_SEEKER && user.jobSeekerProfile) {
        if (data.preferredCity || data.name || data.mobile) {
          await tx.jobSeeker.update({
            where: { userId },
            data: {
              fullName: data.name ?? user.jobSeekerProfile.fullName,
              preferredCity: data.preferredCity ?? user.jobSeekerProfile.preferredCity,
              phone: data.mobile ?? user.jobSeekerProfile.phone,
            },
          });
        }
      }

      return tx.user.findUnique({
        where: { id: userId },
        include: {
          gymOwnerProfile: true,
          jobSeekerProfile: true,
        },
      });
    });

    logger.info(`👤 Profile updated for user: [${user.email}]`);
    return this.sanitizeUser(updatedUser);
  }
}
