import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

type ValidationSchema = z.ZodObject<{
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}>;

export const validateReq =
  (schema: ValidationSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const validatedReq = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (validatedReq.body) {
      req.body = validatedReq.body;
    }
    if (validatedReq.params) {
      req.params = validatedReq.params as Request['params'];
    }
    if (validatedReq.query) {
      req.query = validatedReq.query as Request['query'];
    }

    next();
  };
