import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, authorize } from '../auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { EquipmentController } from './equipment.controller';
import { productQuerySchema, createEquipmentEnquirySchema } from './equipment.schema';

const equipmentRouter = Router();

// Public Routes
equipmentRouter.get('/categories', EquipmentController.getCategories);
equipmentRouter.get('/products', validateRequest(productQuerySchema), EquipmentController.getProducts);
equipmentRouter.get('/products/:id', EquipmentController.getProductById);

// Protected Business Action: Submit RFQ Enquiry (GYM_OWNER Only)
equipmentRouter.post(
  '/enquiries',
  authenticate,
  authorize(UserRole.GYM_OWNER),
  validateRequest(createEquipmentEnquirySchema),
  EquipmentController.createEnquiry
);

// User Project RFQ Basket / Cart Sync Routes
equipmentRouter.get('/cart', EquipmentController.getUserCart);
equipmentRouter.post('/cart', EquipmentController.syncUserCart);
equipmentRouter.delete('/cart', EquipmentController.clearUserCart);

export default equipmentRouter;
