import { NextFunction, Request, Response } from 'express';
import { CustomError } from '#/errors/app-error.js';

export const notFoundRouteHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(new CustomError('RESOURCE_NOT_FOUND', 'Route not found'));
};
