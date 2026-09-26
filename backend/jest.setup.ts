// Jest setup file for backend tests
process.env.NODE_ENV = 'test';
process.env.JWT_ACCESS_SECRET = 'test-access-secret-key-32-chars-long';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-32-chars-long';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/tanush_db?schema=public';

