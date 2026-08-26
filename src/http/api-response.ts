import type { ErrorType } from '../errors/app-error.js';

export class ApiResponse<T = unknown> {
  message: string;
  errorType: ErrorType | null;
  data: T;

  constructor(
    data: T,
    message: string = 'Success',
    errorType: ErrorType | null = null,
  ) {
    this.message = message;
    this.data = data;
    this.errorType = errorType;
  }
}
