export const ERROR_TYPE = {
  BAD_REQUEST: 'BAD_REQUEST',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
  SIGNED_OUT: 'SIGNED_OUT',
  FORBIDDEN: 'FORBIDDEN',
  CSFR_ERROR: 'CSRF_ERROR',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  FILE_SIZE_EXCEEDED: 'FILE_SIZE_EXCEEDED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  UNSUPPORTED_MEDIA_TYPE: 'UNSUPPORTED_MEDIA_TYPE',

  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
} as const;

export type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

export class CustomError extends Error {
  errorType: ErrorType;

  constructor(errorType: ErrorType, message: string) {
    super(message);
    this.errorType = errorType;
    this.name = 'CUSTOM_ERROR';

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
