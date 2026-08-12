import { ENV, validateEnv } from '@/configs/env.js';
import { app } from '@/main/app.js';
import { connectDb } from '@/configs/db.js';
import { ConsoleUtils } from '@/utils/console-utils.js';

async function startServer(): Promise<void> {
  try {
    ConsoleUtils.logInfo('Starting server...');
    validateEnv();
    await connectDb();
    const port = ENV.PORT;
    app.listen(port, () => {
      ConsoleUtils.logSuccess(`Server is running on port ${port}`);
    });
  } catch (error: any) {
    ConsoleUtils.logError(`Failed to start the server \n ${error.message}`);
    process.exit(1);
  }
}

void startServer();
