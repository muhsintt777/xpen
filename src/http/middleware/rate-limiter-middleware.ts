import rateLimit, { Options, ipKeyGenerator } from 'express-rate-limit';
import { CustomError } from '#/errors/app-error.js';
import { RATE_LIMIT_CONFIG } from '#/configs/rate-limit.js';

export class RateLimitMiddleware {
  private static readonly config: Partial<Options> = {
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => (req.ip ? ipKeyGenerator(req.ip) : 'unknown'),
    handler: () => {
      throw new CustomError(
        'TOO_MANY_REQUESTS',
        'Too many requests, please try again later.',
      );
    },
  };

  static default = rateLimit({
    ...this.config,
    windowMs: RATE_LIMIT_CONFIG.windowMs,
    max: RATE_LIMIT_CONFIG.defaultMax,
  });

  static auth = rateLimit({
    ...this.config,
    windowMs: RATE_LIMIT_CONFIG.windowMs,
    max: RATE_LIMIT_CONFIG.authMax,
  });
}
