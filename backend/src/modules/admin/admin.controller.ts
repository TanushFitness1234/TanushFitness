import { Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiResponse';
import { HTTP_STATUS } from '../../config/constants';
import { AdminService } from './admin.service';
import { AuthenticatedRequest } from '../../types';

export class AdminController {
  /**
   * GET /api/v1/admin/stats
   */
  static getDashboardStats = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const data = await AdminService.getDashboardStats();
    return ApiResponse.success(res, 'Admin stats retrieved successfully', data);
  });

  // Module 1: User Management
  static getUsers = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const filters = {
      role: req.query.role as any,
      status: req.query.status as any,
      isVerified: req.query.isVerified !== undefined ? req.query.isVerified === 'true' : undefined,
      search: req.query.search as string,
      page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 20,
    };
    const result = await AdminService.getUsers(filters);
    return ApiResponse.success(res, 'Users retrieved successfully', result);
  });

  static updateUserStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await AdminService.updateUserStatus(req.user!.userId, req.params.id, req.body.status);
    return ApiResponse.success(res, `User status updated to ${req.body.status}`, { user });
  });

  static verifyUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await AdminService.verifyUser(req.user!.userId, req.params.id, req.body.isVerified);
    return ApiResponse.success(res, `User verification updated to ${req.body.isVerified}`, { user });
  });

  // Module 2: Catalog Management
  static createProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const product = await AdminService.createProduct(req.user!.userId, req.body);
    return ApiResponse.success(res, 'Product created successfully', { product }, HTTP_STATUS.CREATED);
  });

  static updateProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const product = await AdminService.updateProduct(req.user!.userId, req.params.id, req.body);
    return ApiResponse.success(res, 'Product updated successfully', { product });
  });

  static deleteProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    await AdminService.deleteProduct(req.user!.userId, req.params.id);
    return ApiResponse.success(res, 'Product deleted successfully', null);
  });

  // Module 3: PDF Quote & RFQ
  static generateQuotation = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const quote = await AdminService.generateQuotation(req.user!.userId, req.params.id, req.body);
    return ApiResponse.success(res, 'B2B Quotation generated successfully', { quote });
  });

  // Module 4: Job Moderation
  static getPendingJobs = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const jobs = await AdminService.getPendingJobs();
    return ApiResponse.success(res, 'Jobs retrieved for moderation', { jobs });
  });

  static moderateJob = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const job = await AdminService.moderateJob(req.user!.userId, req.params.id, req.body.action);
    return ApiResponse.success(res, `Job status updated: ${req.body.action}`, { job });
  });

  // Module 5: Analytics & CSV Export
  static getDemandTrends = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const trends = await AdminService.getDemandTrends();
    return ApiResponse.success(res, 'Demand trends retrieved successfully', trends);
  });

  static exportReport = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const data = await AdminService.exportReport(req.params.entity);
    return ApiResponse.success(res, `${req.params.entity} report data generated`, { reportData: data });
  });

  // Module 6: System Settings
  static getSettings = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const settings = await AdminService.getSettings();
    return ApiResponse.success(res, 'System settings retrieved successfully', { settings });
  });

  static updateSettings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const settings = await AdminService.updateSettings(req.user!.userId, req.body);
    return ApiResponse.success(res, 'System settings updated successfully', { settings });
  });
}
