import { Request, Response } from 'express';
import { UserService } from './user-service.js';
import { ApiResponse } from '#/http/api-response.js';
import { sendApiResponse } from '#/http/send-api-response.js';
import { UserPagination } from './user-types.js';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const pagination: UserPagination = {
      limit: req.query.limit as unknown as number,
      ...(req.query.cursor !== undefined
        ? { cursor: req.query.cursor as string }
        : {}),
    };
    const result = await UserService.getAllUsers(pagination);
    sendApiResponse(res, ApiResponse.success({ data: result }));
  }

  static async getCurrentUser(req: Request, res: Response) {
    const userID = req.token?.userId!;
    const result = await UserService.getUser(userID);
    sendApiResponse(res, ApiResponse.success({ data: result }));
  }

  static async getUser(req: Request, res: Response) {
    const result = await UserService.getUser(req.params.id as string);
    sendApiResponse(res, ApiResponse.success({ data: result }));
  }

  static async createUser(req: Request, res: Response) {
    const payload = {
      fullname: req.body.fullname as string,
      email: req.body.email as string,
      password: req.body.password as string,
    };
    await UserService.createUser(payload);
    sendApiResponse(
      res,
      ApiResponse.success({
        successType: 'CREATED',
        message: 'User created',
      }),
    );
  }

  static async deleteUser(req: Request, res: Response) {
    await UserService.deleteUser(req.params.id as string);
    sendApiResponse(res, ApiResponse.success({ message: 'User deleted' }));
  }
}
