import { AccessTokenData } from '@/utils/token.ts';

declare module 'express' {
  interface Request {
    token?: AccessTokenData;
  }
}
