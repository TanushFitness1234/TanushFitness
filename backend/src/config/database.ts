import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const connectDatabase = async (): Promise<boolean> => {
  try {
    await prisma.$connect();
    logger.info('🐘 PostgreSQL database connected successfully via Prisma ORM.');
    return true;
  } catch (error) {
    logger.warn('⚠️ Database initial connection warning (will retry on incoming requests):', error);
    return false;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('🔌 PostgreSQL database disconnected.');
  } catch (err) {
    // ignore disconnect error
  }
};
