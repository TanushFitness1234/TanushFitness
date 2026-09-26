import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { logger } from '../config/logger';
import { env } from '../config/env';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  logger.error(`[Error Handler]: ${err.message}`, { stack: err.stack });

  // 1. Custom Operational ApiError
  if (err instanceof ApiError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors);
  }

  // 2. Prisma Database Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[]) || [];
      return ApiResponse.error(
        res,
        `Duplicate field value entered: ${target.join(', ')}`,
        409
      );
    }
    // Record not found
    if (err.code === 'P2025') {
      return ApiResponse.error(res, 'Record not found or already deleted', 404);
    }
  }

  // 3. Syntax / JSON Parse Error
  if (err instanceof SyntaxError && 'body' in err) {
    return ApiResponse.error(res, 'Malformed JSON payload', 400);
  }

  // 4. Default Unknown Internal Server Error
  const message =
    env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  const errors = env.NODE_ENV === 'development' ? [{ stack: err.stack }] : [];

  return ApiResponse.error(res, message, 500, errors);
};
