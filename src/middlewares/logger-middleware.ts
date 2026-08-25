import { pinoHttp } from 'pino-http';
import { logger } from '#/configs/logger.js';

export const loggerMiddleWare = pinoHttp({
  logger,

  customLogLevel: (_req, res) => {
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'silent';
  },

  autoLogging: {
    ignore: (req) => req.url === '/health',
  },
});
