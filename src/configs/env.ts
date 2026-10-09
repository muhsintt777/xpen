import * as dotenv from 'dotenv';
dotenv.config();

import { logger } from '#/infra/logger.js';
import z from 'zod';

const parseBooleanEnv = (value: string | undefined): boolean =>
  value?.trim().toLowerCase() === 'true' ? true : false;

// Environment variables configuration
export const ENV = {
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
  PORT: Number(process.env.PORT),
  DB_URL: process.env.DB_URL as string,
  DB_SSL: parseBooleanEnv(process.env.DB_SSL),
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
} as const;

// Environment variables validation function
export const validateEnv = (): void => {
  logger.info('Validating ENV...');

  const err = z
    .object({
      NODE_ENV: z.enum(['development', 'production']),
      PORT: z.number().int().positive(),
      DB_URL: z.string().trim().nonempty(),
      ACCESS_TOKEN_KEY: z.string().trim().nonempty(),
      REFRESH_TOKEN_KEY: z.string().trim().nonempty(),
    })
    .safeParse(ENV).error;
  if (err) {
    throw new Error(
      `Invalid environment variables \n ${JSON.stringify(z.treeifyError(err))}`,
    );
  }

  logger.info('ENV validated successfully.');
};
