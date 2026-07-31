import { REGEX } from '@/utils/constants.js';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .max(255, 'Email must be less than 255 characters')
    .regex(REGEX.email, 'Email is not valid'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must be less than 50 characters'),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().trim(),
});
