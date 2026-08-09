import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Category name is required')
    .max(50, 'Category name must be less than 50 characters'),
});

export const UpdateCategorySchema = CreateCategorySchema;
