import { createRequire } from 'node:module';
import { Request, Response } from 'express';
import { ApiResponse } from './api-response.js';

const { version }: { version: string } = createRequire(import.meta.url)(
  '../../package.json',
);

export const healthHandler = (_req: Request, res: Response) => {
  res.json(
    ApiResponse.success({
      data: { version },
      message: 'Health check success',
    }),
  );
};
