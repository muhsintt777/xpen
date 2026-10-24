import { logger } from '#/infra/logger.js';

async function startServer(): Promise<void> {
  try {
    const { ENV } = await import('#/configs/env.js');
    const [{ app }, { connectDb }] = await Promise.all([
      import('#/main/app.js'),
      import('#/infra/db.js'),
    ]);

    logger.info('Starting server...');
    await connectDb();
    const port = ENV.PORT;
    app.listen(port, '0.0.0.0', () => {
      logger.info({ port }, 'Server is running on port ' + port);
    });
  } catch (error) {
    logger.error({ error }, 'Failed to start the server');
    process.exit(1);
  }
}

void startServer();
