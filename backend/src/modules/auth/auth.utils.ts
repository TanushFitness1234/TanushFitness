import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Response } from 'express';
import { env } from '../../config/env';
import { TokenPayload } from './auth.types';

/**
 * Hash password with bcrypt using configured salt rounds (default 12)
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
};

/**
 * Compare plain password against stored hash
 */
export const comparePassword = async (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};

/**
 * SHA-256 hash a raw token string before saving to database
 */
export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Generate Access Token (short-lived, 15 minutes)
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as any,
  });
};

/**
 * Generate Refresh Token (long-lived, 30 days)
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as any,
  });
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenPayload;
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as TokenPayload;
};

/**
 * Helper to calculate Refresh Token Expiration Date (30 days from now)
 */
export const getRefreshTokenExpiryDate = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
};

/**
 * Set HTTP-Only Refresh Token Cookie
 */
export const setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
  const isProduction = env.NODE_ENV === 'production';
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    path: '/api/v1/auth',
  });
};

/**
 * Clear HTTP-Only Refresh Token Cookie
 */
export const clearRefreshTokenCookie = (res: Response): void => {
  const isProduction = env.NODE_ENV === 'production';
  res.cookie('refreshToken', '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    expires: new Date(0),
    path: '/api/v1/auth',
  });
};
