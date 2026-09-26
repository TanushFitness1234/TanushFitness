import express, { Application, Request, Response, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { env } from './config/env';
import { logger } from './config/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import { SYSTEM_MESSAGES } from './config/constants';
import { ApiResponse } from './utils/apiResponse';
import { notFoundHandler } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

import authRouter from './modules/auth/auth.routes';
import equipmentRouter from './modules/equipment/equipment.routes';
import servicesRouter from './modules/services/services.routes';
import jobsRouter from './modules/jobs/jobs.routes';
import adminRouter from './modules/admin/admin.routes';

const app: Application = express();

// 1. Security Middlewares
app.use(helmet());

const allowedOrigins = env.CORS_ORIGIN.split(',').map(o => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

// 2. Rate Limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// 3. Body & Cookie Parsing & Static Uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Endpoint - Service Status & API Directory
app.get('/', (_req: Request, res: Response) => {
  return ApiResponse.success(res, '🚀 Tanush Fitness B2B Enterprise API is Live', {
    service: 'Tanush Fitness Backend API',
    status: 'ONLINE',
    version: 'v1',
    environment: env.NODE_ENV,
    endpoints: {
      health: '/api/v1/health',
      auth: '/api/v1/auth',
      equipment: '/api/v1/equipment',
      services: '/api/v1/services',
      jobs: '/api/v1/jobs',
      admin: '/api/v1/admin',
    },
    documentation: 'https://github.com/D03SOLANKI/tanush-fitness-b2b',
  });
});

// 4. API Versioning Router (/api/v1)
const v1Router = Router();

v1Router.get('/health', (_req: Request, res: Response) => {
  return ApiResponse.success(res, SYSTEM_MESSAGES.SERVER_HEALTHY, {
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Feature Modules Routing
v1Router.use('/auth', authRouter);
v1Router.use('/equipment', equipmentRouter);
v1Router.use('/services', servicesRouter);
v1Router.use('/jobs', jobsRouter);
v1Router.use('/admin', adminRouter);

// Mount /api/v1
app.use('/api/v1', v1Router);

// 5. 404 & Centralized Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

// 6. Server Initialization Lifecycle
const startServer = (): void => {
  const host = '0.0.0.0';
  const server = app.listen(env.PORT, host, () => {
    logger.info(
      `🚀 Tanush Fitness B2B Backend Server running in [${env.NODE_ENV}] mode on http://${host}:${env.PORT}`
    );
    logger.info(`🔗 Health Check Endpoint: http://${host}:${env.PORT}/api/v1/health`);
    logger.info(`🔑 Auth API: http://${host}:${env.PORT}/api/v1/auth`);
    logger.info(`🏋️ Equipment API: http://${host}:${env.PORT}/api/v1/equipment`);
    logger.info(`🛠️ Business Services API: http://${host}:${env.PORT}/api/v1/services`);
    logger.info(`💼 Fitness Careers API: http://${host}:${env.PORT}/api/v1/jobs`);
    logger.info(`🛡️ Admin API: http://${host}:${env.PORT}/api/v1/admin`);

    // Connect to database in the background
    connectDatabase();
  });

  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down backend gracefully...`);
    server.close(async () => {
      await disconnectDatabase();
      logger.info('👋 Express HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
