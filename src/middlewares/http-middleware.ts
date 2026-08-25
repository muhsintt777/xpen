import { pinoHttp } from 'pino-http';
import { logger } from '#/configs/logger.js';

export const httpLoggerMiddleWare = pinoHttp({
  logger,

  autoLogging: {
    ignore: (req) => req.url === '/health',
  },
});
