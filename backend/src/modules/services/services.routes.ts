import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, authorize } from '../auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { ServicesController } from './services.controller';
import { createServiceEnquirySchema } from './services.schema';

const servicesRouter = Router();

// Public Routes
servicesRouter.get('/', ServicesController.getServices);
servicesRouter.get('/:id', ServicesController.getServiceById);

// Protected Route: Submit Service Consultation Request (GYM_OWNER Only)
servicesRouter.post(
  '/enquiries',
  authenticate,
  authorize(UserRole.GYM_OWNER),
  validateRequest(createServiceEnquirySchema),
  ServicesController.createServiceEnquiry
);

export default servicesRouter;
