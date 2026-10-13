import { Request, Response } from 'express';
import { AuthService } from './auth-service.js';
import { ApiResponse } from '#/http/api-response.js';
import { AUTH_CONFIG } from '#/configs/auth.js';
import { ENV } from '#/configs/env.js';
import { CustomError } from '#/errors/app-error.js';

const REFRESH_COOKIE_NAME = 'refreshToken';

function getRefreshTokenFromReq(req: Request): string | undefined {
  const reqWithCookies = req as unknown as { cookies?: Record<string, string> };
  if (reqWithCookies.cookies?.[REFRESH_COOKIE_NAME]) {
    return reqWithCookies.cookies[REFRESH_COOKIE_NAME];
  }
  if (
    req.body &&
    typeof req.body.refreshToken === 'string' &&
    req.body.refreshToken.trim()
  ) {
    return req.body.refreshToken.trim();
  }
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [rawName, ...rawVal] = cookie.trim().split('=');
      if (rawName === REFRESH_COOKIE_NAME) {
        return decodeURIComponent(rawVal.join('='));
      }
    }
  }
  return undefined;
}

export class AuthController {
  static async login(req: Request, res: Response) {
    const payload = {
      email: req.body.email as string,
      password: req.body.password as string,
    };
    const result = await AuthService.login(payload);
    res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: AUTH_CONFIG.refreshTokenCookieMaxAge,
      path: '/',
    });
    res.json(ApiResponse.success({ data: result, message: 'Login Success' }));
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken = getRefreshTokenFromReq(req);
    if (!refreshToken) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Refresh token required');
    }
    const result = await AuthService.refreshToken(refreshToken);
    res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: AUTH_CONFIG.refreshTokenCookieMaxAge,
      path: '/',
    });
    res.json(ApiResponse.success({ data: result }));
  }

  static async logout(req: Request, res: Response) {
    await AuthService.logout(req.token?.userId as string);
    res.clearCookie(REFRESH_COOKIE_NAME, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    res.json(ApiResponse.success({ message: 'Logout Success' }));
  }
}
