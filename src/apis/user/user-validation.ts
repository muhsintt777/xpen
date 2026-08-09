import { z } from 'zod';
import { REGEX } from '@/utils/constants.js';

export const CreateUserSchema = z.object({
  body: z.object({
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
    fullname: z
      .string()
      .trim()
      .regex(REGEX.fullName, 'Full name is not valid')
      .max(100, 'Full name must be less than 100 characters'),
  }),
});

// export type CreateUserReqType = z.infer<typeof CreateUserReqSchema>;
