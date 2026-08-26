import { Request, Response } from 'express';
import { ApiResponse } from './api-response.js';

export const healthHandler = (_req: Request, res: Response) => {
  res
    .status(200)
    .json(ApiResponse.success({ data: null, message: 'Health check success' }));
};
