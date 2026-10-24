import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { getZodErrMessage } from '#/validation/zod-errors.js';
import { CustomError } from '#/errors/app-error.js';
import { ApiResponse } from './api-response.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    const response = ApiResponse.error({
      errorType: err.errorType,
      message: err.message,
    });
    res.status(response.statusCode).json(response);
  } else if (err instanceof ZodError) {
    const message = getZodErrMessage(err);
    const response = ApiResponse.error({
      errorType: 'VALIDATION_ERROR',
      message,
    });
    res.status(response.statusCode).json(response);
  } else if (err && (err as any).code === 'EBADCSRFTOKEN') {
    const response = ApiResponse.error({
      errorType: 'CSRF_ERROR',
      message: 'Invalid CSRF token',
    });
    res.status(response.statusCode).json(response);
  } else {
    res.err = err;
    const response = ApiResponse.error({
      errorType: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
    });
    res.status(response.statusCode).json(response);
  }
  return;
};
