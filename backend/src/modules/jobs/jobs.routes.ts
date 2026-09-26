import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, authorize, optionalAuthenticate } from '../auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { JobsController } from './jobs.controller';
import { jobQuerySchema, createJobSchema, applyJobSchema } from './jobs.schema';

const jobsRouter = Router();

// Public Sanitized Routes
jobsRouter.get('/', validateRequest(jobQuerySchema), JobsController.getJobs);
jobsRouter.get('/:id', optionalAuthenticate, JobsController.getJobById);

// Protected Business Action: Post a Job (GYM_OWNER Only)
jobsRouter.post(
  '/',
  authenticate,
  authorize(UserRole.GYM_OWNER),
  validateRequest(createJobSchema),
  JobsController.createJob
);

// Protected Business Action: Apply for a Job (JOB_SEEKER Only)
jobsRouter.post(
  '/:id/apply',
  authenticate,
  authorize(UserRole.JOB_SEEKER),
  validateRequest(applyJobSchema),
  JobsController.applyForJob
);

// Protected Scoped Access: View Applications & Resumes for Posted Job (GYM_OWNER Creator / ADMIN Only)
jobsRouter.get(
  '/:id/applications',
  authenticate,
  authorize(UserRole.GYM_OWNER, UserRole.ADMIN),
  JobsController.getJobApplications
);

export default jobsRouter;
