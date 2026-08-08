import * as dotenv from 'dotenv';
dotenv.config();

import { ConsoleUtils } from '@/utils/console-utils.js';

export const ENV = {
  PORT: Number(process.env.PORT),
  DB_URL: process.env.DB_URL as string,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
};

// todo: add zod validation
export const validateEnv = (): void => {
  ConsoleUtils.logInfo('Validating environment variables...');
  const invalidEnvs = [];
  if (!ENV.PORT || isNaN(ENV.PORT)) {
    invalidEnvs.push('PORT');
  }
  if (!ENV.DB_URL || typeof ENV.DB_URL !== 'string') {
    invalidEnvs.push('DB_URL');
  }
  if (!ENV.ACCESS_TOKEN_KEY || typeof ENV.ACCESS_TOKEN_KEY !== 'string') {
    invalidEnvs.push('ACCESS_TOKEN_KEY');
  }
  if (!ENV.REFRESH_TOKEN_KEY || typeof ENV.REFRESH_TOKEN_KEY !== 'string') {
    invalidEnvs.push('REFRESH_TOKEN_KEY');
  }

  if (invalidEnvs.length > 0) {
    ConsoleUtils.logError(`Invalid ENV variables: ${invalidEnvs.join(', ')}`);
    throw new Error(`Invalid ENV variables`);
  }
  ConsoleUtils.logSuccess('Environment variables validated successfully.');
};
