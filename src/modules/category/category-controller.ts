import { Request, Response } from 'express';
import { ApiResponse } from '#/http/api-response.js';
import { CategoryService } from './category-service.js';

export class CategoryController {
  static async getAllCategories(_req: Request, res: Response) {
    const result = await CategoryService.getAllCategories();
    res.json(ApiResponse.success({ data: result }));
  }

  static async getCategory(req: Request, res: Response) {
    const result = await CategoryService.getCategory(req.params.id as string);
    res.json(ApiResponse.success({ data: result }));
  }

  static async createCategory(req: Request, res: Response) {
    await CategoryService.createCategory(req.body.name as string);
    res.json(
      ApiResponse.success({
        successType: 'CREATED',
        message: 'Category created',
      }),
    );
  }

  static async updateCategory(req: Request, res: Response) {
    await CategoryService.updateCategory(
      req.params.id as string,
      req.body.name as string,
    );
    res.json(ApiResponse.success({ message: 'Category updated' }));
  }
}
