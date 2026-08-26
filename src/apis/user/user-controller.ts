import { Request, Response } from 'express';
import { UserService } from './user-service.js';
import { ApiResponse } from '#/http/api-response.js';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const pagination = {
      limit: req.query.limit as unknown as number,
      cursor: req.query.cursor as string,
    };
    const result = await UserService.getAllUsers(pagination);
    res.status(200).json(ApiResponse.success({ data: result }));
  }

  static async getCurrentUser(req: Request, res: Response) {
    const userID = req.token?.userId!;
    const result = await UserService.getUser(userID);
    res.status(200).json(ApiResponse.success({ data: result }));
  }

  static async getUser(req: Request, res: Response) {
    const result = await UserService.getUser(req.params.id as string);
    res.status(200).json(ApiResponse.success({ data: result }));
  }

  static async createUser(req: Request, res: Response) {
    const payload = {
      fullname: req.body.fullname as string,
      email: req.body.email as string,
      password: req.body.password as string,
    };
    await UserService.createUser(payload);
    res
      .status(201)
      .json(ApiResponse.success({ data: null, message: 'User created' }));
  }

  static async deleteUser(req: Request, res: Response) {
    await UserService.deleteUser(req.params.id as string);
    res
      .status(200)
      .json(ApiResponse.success({ data: null, message: 'User deleted' }));
  }
}
