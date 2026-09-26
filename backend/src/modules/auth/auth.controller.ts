import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiResponse';
import { HTTP_STATUS } from '../../config/constants';
import { AuthService } from './auth.service';
import { setRefreshTokenCookie, clearRefreshTokenCookie } from './auth.utils';
import { AuthenticatedRequest } from '../../types';

export class AuthController {
  /**
   * POST /api/v1/auth/register
   */
  static register = asyncHandler(async (req: Request, res: Response) => {
    const user = await AuthService.register(req.body);
    return ApiResponse.success(
      res,
      'User registered successfully',
      { user },
      HTTP_STATUS.CREATED
    );
  });

  /**
   * POST /api/v1/auth/login
   */
  static login = asyncHandler(async (req: Request, res: Response) => {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const { accessToken, refreshToken, user } = await AuthService.login(
      req.body,
      ipAddress,
      userAgent
    );

    // Set HTTP-Only Cookie for Refresh Token
    setRefreshTokenCookie(res, refreshToken);

    return ApiResponse.success(
      res,
      'Login successful',
      {
        accessToken,
        user,
        role: user.role,
      },
      HTTP_STATUS.OK
    );
  });

  /**
   * POST /api/v1/auth/refresh
   */
  static refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const rawRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const { accessToken, newRefreshToken, user } = await AuthService.refreshToken(
      rawRefreshToken,
      ipAddress,
      userAgent
    );

    // Set New HTTP-Only Cookie
    setRefreshTokenCookie(res, newRefreshToken);

    return ApiResponse.success(
      res,
      'Token refreshed successfully',
      {
        accessToken,
        user,
      },
      HTTP_STATUS.OK
    );
  });

  /**
   * POST /api/v1/auth/logout
   */
  static logout = asyncHandler(async (req: Request, res: Response) => {
    const rawRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    await AuthService.logout(rawRefreshToken);
    clearRefreshTokenCookie(res);

    return ApiResponse.success(res, 'Logged out successfully', null, HTTP_STATUS.OK);
  });

  /**
   * POST /api/v1/auth/logout-all
   */
  static logoutAll = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    await AuthService.logoutAll(req.user!.userId);
    clearRefreshTokenCookie(res);

    return ApiResponse.success(
      res,
      'Logged out from all devices successfully',
      null,
      HTTP_STATUS.OK
    );
  });

  /**
   * POST /api/v1/auth/forgot-password
   */
  static forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthService.forgotPassword(req.body.email);
    return ApiResponse.success(res, result.message, null, HTTP_STATUS.OK);
  });

  /**
   * POST /api/v1/auth/reset-password
   */
  static resetPassword = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.resetPassword(req.body.token, req.body.password);
    return ApiResponse.success(
      res,
      'Password reset successful. Please log in with your new password.',
      null,
      HTTP_STATUS.OK
    );
  });

  /**
   * POST /api/v1/auth/change-password
   */
  static changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    await AuthService.changePassword(
      req.user!.userId,
      req.body.currentPassword,
      req.body.newPassword
    );
    clearRefreshTokenCookie(res);

    return ApiResponse.success(
      res,
      'Password changed successfully. Please log in again.',
      null,
      HTTP_STATUS.OK
    );
  });

  /**
   * GET /api/v1/auth/me
   */
  static getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await AuthService.getProfile(req.user!.userId);
    return ApiResponse.success(res, 'Profile retrieved successfully', { user }, HTTP_STATUS.OK);
  });

  /**
   * PATCH /api/v1/auth/me
   */
  static updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await AuthService.updateProfile(req.user!.userId, req.body);
    return ApiResponse.success(res, 'Profile updated successfully', { user }, HTTP_STATUS.OK);
  });
}
