import { z } from 'zod';
import { IdSchema, UnixDateSchema } from '@/utils/common.js';

const ExpenseTypeSchema = z.enum(['NEED', 'WANT', 'SAVE']);

const ExpenseBodySchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0')
    .max(9999999999.99, 'Amount must be less than 9999999999.99'),
  note: z
    .string()
    .trim()
    .max(50, 'Note must be less than 50 characters')
    .optional(),
  categoryId: IdSchema,
  type: ExpenseTypeSchema,
  date: UnixDateSchema,
});

export const CreateExpenseReqSchema = z.object({
  body: ExpenseBodySchema,
});

export const UpdateExpenseReqSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
  body: ExpenseBodySchema.partial().refine(
    (body) => Object.keys(body).length > 0,
    {
      message: 'At least one field is required',
    },
  ),
});
