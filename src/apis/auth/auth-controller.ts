import { Request, Response } from 'express';
import { AuthService } from './auth-service.js';
import { ApiResponse } from '@/utils/api-response.js';

// todo: auth controller

export class AuthController {
  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
    const test = '';
    res.status(200).json(new ApiResponse(result, 'Login Success'));
  }

  static async refreshToken(req: Request, res: Response) {
    const result = await AuthService.refreshToken(
      req.token?.userId!,
      req.body.refreshToken,
    );
    res.status(200).json(new ApiResponse(result));
  }

  static async logout(req: Request, res: Response) {
    await AuthService.logout(req.token?.userId!);
    res.status(200).json(new ApiResponse(null, 'Logout Success'));
  }
}
