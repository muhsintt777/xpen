import { Pool } from 'pg';
import { ENV } from '@/configs/env.js';
import { ConsoleUtils } from '@/utils/console-utils.js';

const pool = new Pool({
  connectionString: ENV.DB_URL,
  ssl: ENV.DB_URL ? { rejectUnauthorized: false } : false,
});

export async function connectDb(): Promise<void> {
  ConsoleUtils.logInfo('Connecting to the database...');
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
  } finally {
    client.release();
  }
  ConsoleUtils.logSuccess('Database connection established successfully');
}

export async function disconnectDb(): Promise<void> {
  ConsoleUtils.logInfo('Disconnecting from the database...');
  await pool.end();
  ConsoleUtils.logSuccess('Database connection closed successfully');
}
