import { IdSchema } from '@/utils/common.js';
import { z } from 'zod';

export const CreateCategoryReqSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Category name is required')
      .max(50, 'Category name must be less than 50 characters'),
  }),
});

export const UpdateCategoryReqSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Category name is required')
      .max(50, 'Category name must be less than 50 characters'),
  }),
});
