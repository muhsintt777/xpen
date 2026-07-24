import { Request, Response } from 'express';
import { AuthService } from './auth-service.js';

// todo: auth controller

export class AuthController {
  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
  }

  static async refreshToken(req: Request, res: Response) {}

  static async logout(req: Request, res: Response) {}
}
