import { ZodError } from 'zod';

export const getZodErrMessage = (payload: ZodError): string => {
  return payload.issues.map((err) => err.message).join(', ') || 'Validation failed';
};
