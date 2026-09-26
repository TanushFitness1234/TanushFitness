import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z
    .union([z.string(), z.number()])
    .default(5000)
    .transform(val => (typeof val === 'number' ? val : parseInt(val, 10) || 5000)),
  NODE_ENV: z.string().default('production'),
  DATABASE_URL: z
    .string()
    .default(
      'postgresql://postgres:TanushMarketplace@db.lpnfwludlkygysxtohkw.supabase.co:5432/postgres'
    ),
  DIRECT_URL: z.string().optional(),
  SUPABASE_URL: z.string().default('https://lpnfwludlkygysxtohkw.supabase.co'),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // JWT & Auth Settings
  JWT_SECRET: z.string().default('tanush-fitness-b2b-production-jwt-secret-key-32chars'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ACCESS_TOKEN_SECRET: z.string().default('tanush-fitness-access-token-secret-key-32chars'),
  REFRESH_TOKEN_SECRET: z.string().default('tanush-fitness-refresh-token-secret-key-32chars'),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
  BCRYPT_ROUNDS: z
    .union([z.string(), z.number()])
    .default(12)
    .transform(val => (typeof val === 'number' ? val : parseInt(val, 10) || 12)),
  COOKIE_SECRET: z.string().default('tanush-fitness-cookie-secret-key-32chars'),
  FRONTEND_URL: z.string().default('https://tanush-fitness-b2b.vercel.app'),

  CORS_ORIGIN: z.string().default('*'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  SENDER_EMAIL: z.string().optional().default('notifications@tanushfitness.com'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Environment Variables Warning:', _env.error.format());
}

export const env = _env.success
  ? _env.data
  : envSchema.parse({
      PORT: process.env.PORT || 5000,
      NODE_ENV: process.env.NODE_ENV || 'production',
      DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:TanushMarketplace@db.lpnfwludlkygysxtohkw.supabase.co:5432/postgres',
    });
