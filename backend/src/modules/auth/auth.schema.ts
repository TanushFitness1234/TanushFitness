import { z } from 'zod';
import { UserRole } from '@prisma/client';

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const registerSchema = z
  .object({
    body: z
      .object({
        name: z.string({ required_error: 'Full name is required' }).min(2, 'Name must be at least 2 characters'),
        email: z.string({ required_error: 'Email address is required' }).email('Invalid email address format'),
        mobile: z
          .string({ required_error: 'Mobile number is required' })
          .min(10, 'Mobile number must be at least 10 digits')
          .max(15, 'Mobile number must not exceed 15 digits'),
        password: z
          .string({ required_error: 'Password is required' })
          .min(8, 'Password must be at least 8 characters')
          .regex(
            strongPasswordRegex,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        confirmPassword: z.string({ required_error: 'Password confirmation is required' }),
        role: z.nativeEnum(UserRole, { required_error: 'User role is required' }),
        gymName: z.string().optional(),
        city: z.string().optional(),
        preferredCity: z.string().optional(),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
      .refine(
        data => {
          if (data.role === UserRole.GYM_OWNER) {
            return !!data.gymName && data.gymName.trim().length > 0;
          }
          return true;
        },
        {
          message: 'Gym Name is required for Gym Owners',
          path: ['gymName'],
        }
      )
      .refine(
        data => {
          if (data.role === UserRole.GYM_OWNER) {
            return !!data.city && data.city.trim().length > 0;
          }
          return true;
        },
        {
          message: 'City is required for Gym Owners',
          path: ['city'],
        }
      )
      .refine(
        data => {
          if (data.role === UserRole.JOB_SEEKER) {
            return !!data.preferredCity && data.preferredCity.trim().length > 0;
          }
          return true;
        },
        {
          message: 'Preferred City is required for Job Seekers',
          path: ['preferredCity'],
        }
      ),
  });

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string({ required_error: 'Email or Mobile number is required' }).min(1, 'Identifier is required'),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email address is required' }).email('Invalid email address format'),
  }),
});

export const resetPasswordSchema = z
  .object({
    body: z
      .object({
        token: z.string({ required_error: 'Password reset token is required' }),
        password: z
          .string({ required_error: 'New password is required' })
          .min(8, 'Password must be at least 8 characters')
          .regex(
            strongPasswordRegex,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        confirmPassword: z.string({ required_error: 'Confirm password is required' }),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      }),
  });

export const changePasswordSchema = z
  .object({
    body: z
      .object({
        currentPassword: z.string({ required_error: 'Current password is required' }),
        newPassword: z
          .string({ required_error: 'New password is required' })
          .min(8, 'Password must be at least 8 characters')
          .regex(
            strongPasswordRegex,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        confirmPassword: z.string({ required_error: 'Confirm password is required' }),
      })
      .refine(data => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      }),
  });

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    mobile: z.string().min(10, 'Mobile number must be at least 10 digits').optional(),
    city: z.string().optional(),
    gymName: z.string().optional(),
    preferredCity: z.string().optional(),
  }),
});
