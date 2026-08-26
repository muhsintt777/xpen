import { AccessTokenData } from '#/security/auth-token-service.js';

declare module 'express' {
  interface Request {
    token?: AccessTokenData;
  }
}
