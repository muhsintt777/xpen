import { z } from 'zod';

const CategoryBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Category name is required')
    .max(50, 'Category name must be less than 50 characters'),
});

const CategoryParamsSchema = z.object({
  id: z
    .string()
    .trim()
    .regex(/^[1-9]\d*$/, 'Id is not valid'),
});

export const CreateCategorySchema = z.object({
  body: CategoryBodySchema,
});

export const UpdateCategorySchema = CreateCategorySchema;

export const CategoryIdSchema = z.object({
  params: CategoryParamsSchema,
});

export const UpdateCategoryReqSchema = z.object({
  body: CategoryBodySchema,
  params: CategoryParamsSchema,
});

export type CreateCategoryParams = z.infer<typeof CategoryBodySchema>;
export type UpdateCategoryParams = z.infer<typeof CategoryBodySchema>;
