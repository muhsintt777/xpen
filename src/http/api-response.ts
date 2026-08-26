import type { ErrorType } from '../errors/app-error.js';
import { ERROR_STATUS_CODE } from '../errors/app-error.js';
import { DateUtils } from '../utils/date-utils.js';
import type { SuccessType } from './response-types.js';
import { SUCCESS_STATUS_CODE } from './response-types.js';

/**
 * Standard API response wrapper for all HTTP responses
 * Includes status code, timestamp, success flag, and error handling
 * @template T - The data type being returned in the response
 */
export class ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly statusCode: number;
  readonly message: string;
  readonly data: T | null;
  readonly errorType: ErrorType | null;
  readonly timestamp: number;

  private constructor(
    data: T | null,
    message: string,
    statusCode: number,
    errorType: ErrorType | null,
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.success = errorType === null;
    this.timestamp = DateUtils.getCurrentUnixTimestamp();
  }

  /**
   * Create a successful response
   * @param options - Response options (optional)
   * @param options.data - The response payload to return to client (optional, defaults to null)
   * @param options.message - Optional custom message (defaults to 'Success')
   * @param options.successType - Success type: OK, CREATED, ACCEPTED, NO_CONTENT (defaults to OK)
   * @returns ApiResponse instance with success=true and appropriate HTTP status code
   * @example
   * ApiResponse.success()
   * ApiResponse.success({ data: { id: 1, name: 'John' } })
   * ApiResponse.success({ data: user, successType: 'CREATED', message: 'User created' })
   */
  static success<T>(options?: {
    data?: T;
    successType?: SuccessType;
    message?: string;
  }): ApiResponse<T | null> {
    const successType = options?.successType ?? 'OK';
    const statusCode = SUCCESS_STATUS_CODE[successType];
    return new ApiResponse(
      options?.data ?? null,
      options?.message ?? 'Success',
      statusCode,
      null,
    );
  }

  /**
   * Create an error response
   * @param options - Error response options
   * @param options.errorType - The error type (from ERROR_TYPE enum)
   * @param options.message - Error message to send to client (optional, defaults to 'Error')
   * @returns ApiResponse instance with success=false and appropriate HTTP status code
   * @example
   * ApiResponse.error({ errorType: 'RESOURCE_NOT_FOUND', message: 'User not found' })
   * ApiResponse.error({ errorType: 'UNAUTHORIZED', message: 'Invalid credentials' })
   */
  static error(options: {
    errorType: ErrorType;
    message?: string;
  }): ApiResponse<null> {
    const statusCode = ERROR_STATUS_CODE[options.errorType];
    return new ApiResponse(
      null,
      options.message ?? 'Error',
      statusCode,
      options.errorType,
    );
  }
}
