import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

type ValidationSchema = z.ZodObject<{
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}>;

const assignReqProperty = <K extends 'body' | 'params' | 'query'>(
  req: Request,
  key: K,
  value: Request[K],
) => {
  Object.defineProperty(req, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
};

export const validateReq =
  (schema: ValidationSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const validatedReq = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (validatedReq.body) {
      assignReqProperty(req, 'body', validatedReq.body);
    }
    if (validatedReq.params) {
      assignReqProperty(
        req,
        'params',
        validatedReq.params as Request['params'],
      );
    }
    if (validatedReq.query) {
      assignReqProperty(req, 'query', validatedReq.query as Request['query']);
    }

    next();
  };

// todo: find better way to override req
