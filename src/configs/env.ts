import * as dotenv from 'dotenv';
dotenv.config();

import { logger } from '#/configs/logger.js';
import z from 'zod';

const parseBooleanEnv = (value: string | undefined): boolean =>
  value?.trim().toLowerCase() === 'true' ? true : false;

export const ENV = {
  PORT: Number(process.env.PORT),
  DB_URL: process.env.DB_URL as string,
  DB_SSL: parseBooleanEnv(process.env.DB_SSL),
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
} as const;

export const validateEnv = (): void => {
  logger.info('Validating environment variables...');

  const err = z
    .object({
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

  logger.info('Environment variables validated successfully.');
};
