import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, hashToken } from './auth.utils';
import { UserRole, UserStatus } from '@prisma/client';

describe('Auth Utilities Test Suite', () => {
  it('correctly hashes and verifies passwords with bcrypt', async () => {
    const raw = 'SecureB2BPass2026!';
    const hashed = await hashPassword(raw);
    expect(hashed).not.toBe(raw);
    const isMatch = await comparePassword(raw, hashed);
    expect(isMatch).toBe(true);

    const isWrongMatch = await comparePassword('WrongPassword123', hashed);
    expect(isWrongMatch).toBe(false);
  });

  it('generates and verifies valid JWT access and refresh tokens', () => {
    const payload = {
      userId: 'usr-test-101',
      email: 'vikram@fitplusgym.com',
      role: UserRole.GYM_OWNER,
      status: UserStatus.ACTIVE,
    };

    const accessToken = generateAccessToken(payload);
    expect(typeof accessToken).toBe('string');
    const decodedAccess = verifyAccessToken(accessToken);
    expect(decodedAccess.userId).toBe(payload.userId);
    expect(decodedAccess.email).toBe(payload.email);
    expect(decodedAccess.role).toBe(payload.role);
    expect(decodedAccess.status).toBe(payload.status);

    const refreshToken = generateRefreshToken(payload);
    expect(typeof refreshToken).toBe('string');
    const decodedRefresh = verifyRefreshToken(refreshToken);
    expect(decodedRefresh.userId).toBe(payload.userId);
  });

  it('computes sha256 hash tokens deterministically', () => {
    const rawToken = 'raw-session-token-xyz-123';
    const hash1 = hashToken(rawToken);
    const hash2 = hashToken(rawToken);
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64);
  });
});

