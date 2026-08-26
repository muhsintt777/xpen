import { Request, Response } from 'express';
import { ApiResponse } from './api-response.js';

export const healthHandler = (_req: Request, res: Response) => {
  res.json(ApiResponse.success({ message: 'Health check success' }));
};
