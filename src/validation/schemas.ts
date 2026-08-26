import z from 'zod';

export const IdSchema = z
  .string()
  .trim()
  .regex(/^[1-9]\d*$/, 'Id is not valid');

export const ReqParamIdSchema = z.object({
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
