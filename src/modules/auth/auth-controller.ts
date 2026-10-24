import { Request, Response } from 'express';
import { AuthService } from './auth-service.js';
import { ApiResponse } from '#/http/api-response.js';
import { sendApiResponse } from '#/http/send-api-response.js';

export class AuthController {
  static async login(req: Request, res: Response) {
    const payload = {
      email: req.body.email as string,
      password: req.body.password as string,
    };
    const result = await AuthService.login(payload);
    sendApiResponse(
      res,
      ApiResponse.success({ data: result, message: 'Login Success' }),
    );
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken as string;
    const result = await AuthService.refreshToken(refreshToken);
    sendApiResponse(res, ApiResponse.success({ data: result }));
  }

  static async logout(req: Request, res: Response) {
    await AuthService.logout(req.token?.userId as string);
    sendApiResponse(res, ApiResponse.success({ message: 'Logout Success' }));
  }
}
