import { ENV, validateEnv } from '#/configs/env.js';
import { app } from '#/main/app.js';
import { connectDb } from '#/configs/db.js';
import { logger } from '#/configs/logger.js';

async function startServer(): Promise<void> {
  try {
    logger.info('Starting server...');
    validateEnv();
    await connectDb();
    const port = ENV.PORT;
    app.listen(port, () => {
      logger.info({ port }, 'Server is running');
    });
  } catch (error: any) {
    logger.error({ error }, 'Failed to start the server');
    process.exit(1);
  }
}

void startServer();
