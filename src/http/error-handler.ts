import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { getZodErrMessage } from '#/validation/zod-errors.js';
import { CustomError } from '#/errors/app-error.js';
import { logger } from '#/infra/logger.js';
import { ApiResponse } from './api-response.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json(
        ApiResponse.error({ errorType: err.errorType, message: err.message }),
      );
  } else if (err instanceof ZodError) {
    const message = getZodErrMessage(err);
    res
      .status(422)
      .json(ApiResponse.error({ errorType: 'VALIDATION_ERROR', message }));
  } else if (err && (err as any).code === 'EBADCSRFTOKEN') {
    res.status(403).json(
      ApiResponse.error({
        errorType: 'CSRF_ERROR',
        message: 'Invalid CSRF token',
      }),
    );
  } else {
    logger.error({ error: err }, 'Unhandled error');
    res.status(500).json(
      ApiResponse.error({
        errorType: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      }),
    );
  }
  return;
};
