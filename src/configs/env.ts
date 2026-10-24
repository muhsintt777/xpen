import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().int().positive(),
  DB_URL: z.string().trim().nonempty(),
  DB_SSL: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  ACCESS_TOKEN_KEY: z.string().trim().nonempty(),
  REFRESH_TOKEN_KEY: z.string().trim().nonempty(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  throw new Error(
    `Invalid environment variables\n${JSON.stringify(z.treeifyError(parsedEnv.error))}`,
  );
}

export const ENV = parsedEnv.data;
