export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ROLES = {
  ADMIN: 'ADMIN',
  GYM_OWNER: 'GYM_OWNER',
  JOB_SEEKER: 'JOB_SEEKER',
} as const;

export type RoleType = keyof typeof ROLES;

export const SYSTEM_MESSAGES = {
  SERVER_HEALTHY: 'Tanush Fitness B2B API Server is healthy and running.',
  RESOURCE_NOT_FOUND: 'The requested resource could not be found.',
  INTERNAL_ERROR: 'An unexpected internal server error occurred.',
  VALIDATION_ERROR: 'Invalid request payload or query parameters.',
  UNAUTHORIZED: 'Authentication token is required or invalid.',
  FORBIDDEN: 'You do not have permission to perform this operation.',
} as const;
