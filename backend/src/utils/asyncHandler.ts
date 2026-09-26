import { Request, Response, NextFunction } from 'express';

export type AsyncControllerFunction = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = (fn: AsyncControllerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
