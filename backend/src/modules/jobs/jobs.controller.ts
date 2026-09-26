import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiResponse';
import { HTTP_STATUS } from '../../config/constants';
import { JobsService } from './jobs.service';
import { AuthenticatedRequest } from '../../types';

export class JobsController {
  /**
   * GET /api/v1/jobs (Public Sanitized)
   */
  static getJobs = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      search: req.query.search as string,
      location: req.query.location as string,
      jobType: req.query.jobType as any,
      page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
    };

    const result = await JobsService.getJobs(filters);
    return ApiResponse.success(res, 'Jobs retrieved successfully', result);
  });

  /**
   * GET /api/v1/jobs/:id (Public Sanitized / Employer Unmasked)
   */
  static getJobById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    const job = await JobsService.getJobById(req.params.id, userId, userRole);
    return ApiResponse.success(res, 'Job details retrieved successfully', { job });
  });

  /**
   * POST /api/v1/jobs (GYM_OWNER Only)
   */
  static createJob = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const job = await JobsService.createJob(req.user!.userId, req.body);
    return ApiResponse.success(res, 'Job posted successfully', { job }, HTTP_STATUS.CREATED);
  });

  /**
   * POST /api/v1/jobs/:id/apply (JOB_SEEKER Only)
   */
  static applyForJob = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const application = await JobsService.applyForJob(
      req.user!.userId,
      req.params.id,
      req.body
    );
    return ApiResponse.success(
      res,
      'Job application submitted successfully',
      { application },
      HTTP_STATUS.CREATED
    );
  });

  /**
   * GET /api/v1/jobs/:id/applications (GYM_OWNER Creator / ADMIN Only)
   */
  static getJobApplications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await JobsService.getJobApplications(
      req.user!.userId,
      req.user!.role,
      req.params.id
    );
    return ApiResponse.success(res, 'Applications retrieved successfully', result);
  });
}
