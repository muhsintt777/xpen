import type { AccessTokenData } from '#/modules/auth/index.js';

declare module 'express' {
  interface Request {
    token?: AccessTokenData;
  }
}
