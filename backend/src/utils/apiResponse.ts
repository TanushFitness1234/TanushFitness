import { Response } from 'express';
import { HTTP_STATUS } from '../config/constants';

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string = 'Success',
    data: T | null = null,
    statusCode: number = HTTP_STATUS.OK,
    meta?: any
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
      timestamp: new Date().toISOString(),
    });
  }

  static created<T>(
    res: Response,
    message: string = 'Resource created successfully',
    data: T | null = null
  ): Response {
    return ApiResponse.success(res, message, data, HTTP_STATUS.CREATED);
  }

  static noContent(res: Response): Response {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }

  static error(
    res: Response,
    message: string = 'An error occurred',
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors: any[] = []
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
