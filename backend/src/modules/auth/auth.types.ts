import { UserRole, UserStatus } from '@prisma/client';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface RegisterInput {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword?: string;
  role: UserRole;
  city?: string;
  gymName?: string;
  preferredCity?: string;
}

export interface LoginInput {
  identifier: string; // Email or Mobile Number
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface UpdateProfileInput {
  name?: string;
  mobile?: string;
  city?: string;
  gymName?: string;
  preferredCity?: string;
}

export interface SanitizedUser {
  id: string;
  name: string | null;
  email: string;
  mobile: string | null;
  city: string | null;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  emailVerified: boolean;
  mobileVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  gymOwnerProfile?: {
    id: string;
    companyName: string;
    phone: string;
    city: string | null;
    address: string | null;
    gstNumber: string | null;
  } | null;
  jobSeekerProfile?: {
    id: string;
    fullName: string;
    phone: string;
    preferredCity: string | null;
    experience: string | null;
    skills: string[];
    resumeUrl: string | null;
  } | null;
}
