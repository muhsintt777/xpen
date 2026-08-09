import z, { ZodError } from 'zod';

export const getZodErrMessage = (payload: ZodError): string => {
  // todo: format zod errors
  return (
    payload.issues.map((err) => err.message).join(', ') || 'Validation failed'
  );
};

export const validateId = (id: unknown): string => {
  const idSchema = z.string().trim().regex(/^[1-9]\d*$/, 'Id is not valid');
  return idSchema.parse(id);
};
