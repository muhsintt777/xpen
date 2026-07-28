import rateLimit, { Options, ipKeyGenerator } from 'express-rate-limit';
import { CustomError } from '@/utils/error.js';

export class RateLimitMiddleware {
  private static readonly WINDOW_MS_15_MINUTES = 15 * 60 * 1000;
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
    windowMs: this.WINDOW_MS_15_MINUTES,
    max: 200,
  });

  static auth = rateLimit({
    ...this.config,
    windowMs: this.WINDOW_MS_15_MINUTES,
    max: 20,
  });
}

// todo: add rate limiter
