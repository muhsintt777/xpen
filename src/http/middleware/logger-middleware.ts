import { pinoHttp } from 'pino-http';
import { logger } from '#/infra/logger.js';

export const loggerMiddleWare = pinoHttp({
  logger,

  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
    err: (err) => ({
      name: err.name,
      message: err.message,
    }),
  },

  customLogLevel: (_req, res) => {
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'silent';
  },
});
