import type { ErrorType } from '../errors/app-error.js';

export const SUCCESS_TYPE = {
  OK: 'OK',
  CREATED: 'CREATED',
  ACCEPTED: 'ACCEPTED',
  NO_CONTENT: 'NO_CONTENT',
} as const;

export type SuccessType = (typeof SUCCESS_TYPE)[keyof typeof SUCCESS_TYPE];

export const SUCCESS_STATUS_CODE: Record<SuccessType, number> = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
} as const;

export const ERROR_STATUS_CODE: Record<ErrorType, number> = {
  BAD_REQUEST: 400,
  AUTH_TOKEN_EXPIRED: 401,
  AUTH_UNAUTHORIZED: 401,
  SIGNED_OUT: 401,
  FORBIDDEN: 403,
  CSRF_ERROR: 403,
  RESOURCE_NOT_FOUND: 404,
  RESOURCE_CONFLICT: 409,
  FILE_SIZE_EXCEEDED: 413,
  VALIDATION_ERROR: 422,
  TOO_MANY_REQUESTS: 429,
  UNSUPPORTED_MEDIA_TYPE: 415,

  INTERNAL_SERVER_ERROR: 500,
  EXTERNAL_SERVICE_ERROR: 502,
} as const;
