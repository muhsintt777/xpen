import * as dotenv from 'dotenv';
dotenv.config();

import { ConsoleUtils } from '../utils/console-utils.js';

export const ENV = {
  PORT: Number(process.env.PORT),
  DB_URL: process.env.DB_URL as string,
};

export const validateEnv = (): void => {
  ConsoleUtils.logInfo('Validating environment variables...');
  const invalidEnvs = [];
  if (!ENV.PORT || isNaN(ENV.PORT)) {
    invalidEnvs.push('PORT');
  }
  if (!ENV.DB_URL || typeof ENV.DB_URL !== 'string') {
    invalidEnvs.push('DB_URL');
  }

  if (invalidEnvs.length > 0) {
    ConsoleUtils.logError(`Invalid ENV variables: ${invalidEnvs.join(', ')}`);
    throw new Error(`Invalid ENV variables`);
  }
  ConsoleUtils.logSuccess('Environment variables validated successfully.');
};
