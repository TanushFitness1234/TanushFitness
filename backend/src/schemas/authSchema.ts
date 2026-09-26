import { z } from 'zod';
import { ROLES } from '../config/constants';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: z.enum([ROLES.GYM_OWNER, ROLES.JOB_SEEKER]).default(ROLES.GYM_OWNER),
    fullName: z.string().min(2, 'Full name is required'),
    companyName: z.string().optional(),
    phone: z.string().min(10, 'Valid phone number is required'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address format'),
    password: z.string().min(1, 'Password is required'),
  }),
});
