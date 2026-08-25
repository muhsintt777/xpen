import pino, { LoggerOptions } from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

const options: LoggerOptions = {
  level: isProduction ? 'info' : 'debug',

  base: {
    service: 'xpen-api',
  },

  timestamp: pino.stdTimeFunctions.isoTime,
};

if (!isProduction) {
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  };
}

export const logger = pino(options);
