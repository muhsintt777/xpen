import { REGEX } from '#/validation/regex.js';
import { z } from 'zod';

const LoginBodySchema = z.object({
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

const RefreshTokenBodySchema = z.object({
  refreshToken: z.string().trim(),
});

export const LoginSchema = z.object({
  body: LoginBodySchema,
});

export const RefreshTokenSchema = z.object({
  body: RefreshTokenBodySchema,
});
