import type { Response } from 'express';
import type { ApiResponse } from './api-response.js';

export function sendApiResponse<T>(
  res: Response,
  response: ApiResponse<T>,
): Response {
  return res.status(response.statusCode).json(response);
}
