import z, { ZodError } from 'zod';

export const getZodErrMessage = (payload: ZodError): string => {
  // todo: format zod errors
  return (
    payload.issues.map((err) => err.message).join(', ') || 'Validation failed'
  );
};

export const validateId = (id: unknown): string => {
  const idSchema = z
    .string()
    .trim()
    .regex(/^[1-9]\d*$/, 'Id is not valid');
  return idSchema.parse(id);
};

export const IdSchema = z
  .string()
  .trim()
  .regex(/^[1-9]\d*$/, 'Id is not valid');

export const idReqParamSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
});

export const UnixDateSchema = z
  .number()
  .int('Date must be a whole Unix timestamp in seconds')
  .min(0, 'Date must be a valid Unix timestamp')
  .max(253402300799, 'Date must be a valid Unix timestamp');

export const PaginationSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),

    cursor: z.string().optional(),
  }),
});
