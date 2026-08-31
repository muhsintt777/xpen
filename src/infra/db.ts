import { Pool } from 'pg';
import { ENV } from '#/configs/env.js';
import { logger } from '#/infra/logger.js';

export const db = new Pool({
  connectionString: ENV.DB_URL,
  ssl: ENV.DB_SSL === true ? { rejectUnauthorized: false } : false,
  max: 10,
});

export async function connectDb(): Promise<void> {
  logger.info('Connecting to the database...');
  const client = await db.connect();
  try {
    await client.query('SELECT NOW()');
  } finally {
    client.release();
  }
  logger.info('Database connected successfully');
}

export async function disconnectDb(): Promise<void> {
  logger.info('Disconnecting from the database...');
  await db.end();
  logger.info('Database disconnected successfully');
}
