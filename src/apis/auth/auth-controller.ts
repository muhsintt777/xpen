import { Request, Response } from 'express';
import { AuthService } from './auth-service.js';
import { ApiResponse } from '@/utils/api-response.js';

export class AuthController {
  static async login(req: Request, res: Response) {
    const payload = {
      email: req.body.email as string,
      password: req.body.password as string,
    };
    const result = await AuthService.login(payload);
    res.status(200).json(new ApiResponse(result, 'Login Success'));
  }

  static async refreshToken(req: Request, res: Response) {
    const result = await AuthService.refreshToken(
      req.body.refreshToken as string,
    );
    res.status(200).json(new ApiResponse(result));
  }

  static async logout(req: Request, res: Response) {
    await AuthService.logout(req.token?.userId as string);
    res.status(200).json(new ApiResponse(null, 'Logout Success'));
  }
}
