import z, { ZodError } from 'zod';

export const getZodErrMessage = (payload: ZodError): string => {
  // todo: format zod errors
  return (
    payload.issues.map((err) => err.message).join(', ') || 'Validation failed'
  );
};

export const validateId = (id: unknown): number => {
  const idSchema = z.coerce.number().positive();
  return idSchema.parse(id);
};
