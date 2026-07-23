// import { z } from 'zod';

// todo: user validation schema

// export const CreateUserReqSchema = z.object({
//   email: z
//     .string({
//       required_error: 'Email is required',
//       invalid_type_error: 'Email must be string',
//     })
//     .trim()
//     .regex(REGEX.email, 'Email is not valid'),
//   password: z
//     .string({
//       required_error: 'Password is required',
//       invalid_type_error: 'Password must be string',
//     })
//     .trim()
//     .regex(REGEX.password, 'Password is not valid'),
//   fullname: z
//     .string({
//       required_error: 'Full name is required',
//       invalid_type_error: 'Full name must be string',
//     })
//     .trim()
//     .regex(REGEX.fullName, 'Full name is not valid')
//     .max(100, 'Full name must be less than 100 characters'),
// });

// export type CreateUserReqType = z.infer<typeof CreateUserReqSchema>;
