import jwt from 'jsonwebtoken';
import { ENV } from '@/configs/env.js';
import { CustomError } from './error.js';

export interface AccessTokenData {
  userId: number;
}

interface RefreshTokenData {
  userId: number;
}

export class Token {
  static createAccessToken(payload: AccessTokenData) {
    const options: jwt.SignOptions = {
      expiresIn: '5m',
    };
    return jwt.sign(payload, ENV.ACCESS_TOKEN_KEY, options);
  }

  static verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_KEY);
      return decoded as AccessTokenData;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new CustomError('AUTH_TOKEN_EXPIRED', 'Token expired');
    }
  }

  static createRefreshToken(payload: RefreshTokenData) {
    return jwt.sign(payload, ENV.REFRESH_TOKEN_KEY, {
      expiresIn: '30m',
    });
  }

  static verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, ENV.REFRESH_TOKEN_KEY);
      return decoded as RefreshTokenData;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new CustomError('SIGNED_OUT', 'Invalid token');
    }
  }
}
