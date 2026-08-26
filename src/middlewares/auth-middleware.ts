import { NextFunction, Request, Response } from 'express';
import { CustomError } from '#/utils/error.js';
import { AuthTokenService } from '#/security/auth-token-service.js';

export class AuthMiddleware {
  static verifyToken(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split?.(' ')?.[1];
    if (!token) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Token required');
    }

    const decoded = AuthTokenService.verifyAccessToken(token);
    req.token = decoded;
    next();
  }
}
