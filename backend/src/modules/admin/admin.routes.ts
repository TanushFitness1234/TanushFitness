import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, authorize } from '../auth/auth.middleware';
import { AdminController } from './admin.controller';

const adminRouter = Router();

// Protect ALL Admin Routes (ADMIN Only)
adminRouter.use(authenticate, authorize(UserRole.ADMIN));

// Overview & Dashboard
adminRouter.get('/stats', AdminController.getDashboardStats);

// Module 1: User Management
adminRouter.get('/users', AdminController.getUsers);
adminRouter.patch('/users/:id/status', AdminController.updateUserStatus);
adminRouter.patch('/users/:id/verify', AdminController.verifyUser);

// Module 2: Catalog Manager
adminRouter.post('/products', AdminController.createProduct);
adminRouter.put('/products/:id', AdminController.updateProduct);
adminRouter.delete('/products/:id', AdminController.deleteProduct);

// Module 3: PDF Quotation Generator & Dispatch
adminRouter.post('/enquiries/:id/quote', AdminController.generateQuotation);

// Module 4: Job Moderation
adminRouter.get('/jobs/pending', AdminController.getPendingJobs);
adminRouter.patch('/jobs/:id/moderate', AdminController.moderateJob);

// Module 5: Analytics & Export
adminRouter.get('/reports/demand-trends', AdminController.getDemandTrends);
adminRouter.get('/reports/export/:entity', AdminController.exportReport);

// Module 6: System Settings
adminRouter.get('/settings', AdminController.getSettings);
adminRouter.put('/settings', AdminController.updateSettings);

export default adminRouter;
