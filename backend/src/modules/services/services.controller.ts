import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiResponse';
import { HTTP_STATUS } from '../../config/constants';
import { BusinessServicesService } from './services.service';
import { AuthenticatedRequest } from '../../types';

export class ServicesController {
  /**
   * GET /api/v1/services
   */
  static getServices = asyncHandler(async (_req: Request, res: Response) => {
    const services = await BusinessServicesService.getServices();
    return ApiResponse.success(res, 'Business services retrieved successfully', { services });
  });

  /**
   * GET /api/v1/services/:id
   */
  static getServiceById = asyncHandler(async (req: Request, res: Response) => {
    const service = await BusinessServicesService.getServiceById(req.params.id);
    return ApiResponse.success(res, 'Service details retrieved successfully', { service });
  });

  /**
   * POST /api/v1/services/enquiries (GYM_OWNER Only)
   */
  static createServiceEnquiry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const enquiry = await BusinessServicesService.createServiceEnquiry(req.user!.userId, req.body);
    return ApiResponse.success(
      res,
      'Service enquiry submitted successfully',
      { enquiry },
      HTTP_STATUS.CREATED
    );
  });
}
