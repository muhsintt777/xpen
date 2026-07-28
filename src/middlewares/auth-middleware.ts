import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@/utils/error.js';
import { AccessTokenData, Token } from '@/utils/token.js';

declare global {
  namespace Express {
    interface Request {
      token?: AccessTokenData;
    }
  }
}

export class AuthMiddleware {
  static verifyToken(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split?.(' ')?.[1];
    if (!token) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Token required');
    }

    const decoded = Token.verifyAccessToken(token);
    req.token = decoded;
    next();
  }
}
