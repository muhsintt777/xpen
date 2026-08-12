import { Request, Response } from 'express';
import { UserService } from './user-service.js';
import { ApiResponse } from '@/utils/api-response.js';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const result = await UserService.getAllUsers();
    res.status(200).json(new ApiResponse(result));
  }

  static async getCurrentUser(req: Request, res: Response) {
    const userID = req.token?.userId!;
    const result = await UserService.getUser(userID);
    res.status(200).json(new ApiResponse(result));
  }

  static async getUser(req: Request, res: Response) {
    const result = await UserService.getUser(req.params.id as string);
    res.status(200).json(new ApiResponse(result));
  }

  static async createUser(req: Request, res: Response) {
    const payload = {
      fullname: req.body.fullname as string,
      email: req.body.email as string,
      password: req.body.password as string,
    };
    await UserService.createUser(payload);
    res.status(201).json(new ApiResponse(null, 'User created'));
  }

  static async deleteUser(req: Request, res: Response) {
    await UserService.deleteUser(req.params.id as string);
    res.status(200).json(new ApiResponse(null, 'User deleted'));
  }
}
