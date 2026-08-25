import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { getZodErrMessage } from '#/utils/common.js';
import { CustomError } from '#/utils/error.js';
import { ApiResponse } from '#/utils/api-response.js';
import { logger } from '#/configs/logger.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json(new ApiResponse(null, err.message, err.errorType));
  } else if (err instanceof ZodError) {
    const message = getZodErrMessage(err);
    res.status(422).json(new ApiResponse(null, message, 'VALIDATION_ERROR'));
  } else if (err && (err as any).code === 'EBADCSRFTOKEN') {
    res
      .status(403)
      .json(new ApiResponse(null, 'Invalid CSRF token', 'CSRF_ERROR'));
  } else {
    logger.error({ error: err }, 'Unhandled error');
    res
      .status(500)
      .json(new ApiResponse(null, 'Something went wrong', 'UNKNOWN_ERROR'));
  }
  return;
};
