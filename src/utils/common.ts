import z, { ZodError } from 'zod';

export const getZodErrMessage = (payload: ZodError): string => {
  return (
    payload.issues.map((err) => err.message).join(', ') || 'Validation failed'
  );
};

export const validateId = (id: unknown): number => {
  const idSchema = z.number().positive();
  return idSchema.parse(id);
};
