import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateRequest } from '../../middlewares/validateRequest';
import { authenticate } from './auth.middleware';
import { AuthController } from './auth.controller';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
} from './auth.schema';

const authRouter = Router();

// Strict Rate Limiting for Auth Endpoints (5 requests per 15 minutes window)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 1. Register
authRouter.post('/register', validateRequest(registerSchema), AuthController.register);

// 2. Login
authRouter.post('/login', authLimiter, validateRequest(loginSchema), AuthController.login);

// 3. Refresh Token
authRouter.post('/refresh', authLimiter, AuthController.refreshToken);

// 4. Logout
authRouter.post('/logout', AuthController.logout);
authRouter.post('/logout-all', authenticate, AuthController.logoutAll);

// 5. Forgot & Reset Password
authRouter.post(
  '/forgot-password',
  authLimiter,
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword
);
authRouter.post(
  '/reset-password',
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword
);

// 6. Change Password
authRouter.post(
  '/change-password',
  authenticate,
  validateRequest(changePasswordSchema),
  AuthController.changePassword
);

// 7. Profile Management (/me)
authRouter.get('/me', authenticate, AuthController.getProfile);
authRouter.patch(
  '/me',
  authenticate,
  validateRequest(updateProfileSchema),
  AuthController.updateProfile
);

export default authRouter;
