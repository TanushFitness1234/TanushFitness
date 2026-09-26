import { Request, Response, NextFunction } from 'express';
import { UserRole, UserStatus } from '@prisma/client';
import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { verifyAccessToken } from './auth.utils';
import { AuthenticatedRequest } from '../../types';

/**
 * Strict Authentication Middleware
 * Validates JWT access token and verifies active status of user
 */
export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Authentication token is missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw ApiError.unauthorized('Authentication token is required');
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw ApiError.unauthorized('Access token has expired. Please refresh your token.');
      }
      throw ApiError.unauthorized('Invalid access token');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        isActive: true,
        deletedAt: true,
      },
    });

    if (!user) {
      throw ApiError.unauthorized('User associated with this token no longer exists');
    }

    // Status Validations
    if (user.status === UserStatus.SUSPENDED) {
      throw ApiError.forbidden('Your account has been suspended. Please contact customer support.');
    }
    if (user.status === UserStatus.DELETED || user.deletedAt) {
      throw ApiError.forbidden('Your account has been deleted.');
    }
    if (user.status === UserStatus.INACTIVE || !user.isActive) {
      throw ApiError.forbidden('Your account is currently inactive.');
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Role-Based Access Control Middleware
 * Restricts access to specified UserRoles
 */
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Forbidden: Role '${req.user.role}' does not have permission to access this resource`
        )
      );
    }

    next();
  };
};

/**
 * Optional Authentication Middleware
 * Attaches req.user if a valid token is provided, but allows unauthenticated requests through
 */
export const optionalAuthenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) return next();

    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, status: true },
    });

    if (user && user.status === UserStatus.ACTIVE) {
      req.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
    }

    next();
  } catch (_err) {
    // Silently continue without error for optional authentication
    next();
  }
};
