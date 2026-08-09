import { Request, Response } from 'express';
import { ApiResponse } from '@/utils/api-response.js';
import { CategoryService } from './category-service.js';

export class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    const result = await CategoryService.getAllCategories();
    res.status(200).json(new ApiResponse(result));
  }

  static async getCategory(req: Request, res: Response) {
    const result = await CategoryService.getCategory(req.params.id);
    res.status(200).json(new ApiResponse(result));
  }

  static async createCategory(req: Request, res: Response) {
    await CategoryService.createCategory(req.body);
    res.status(201).json(new ApiResponse(null, 'Category created'));
  }

  static async updateCategory(req: Request, res: Response) {
    await CategoryService.updateCategory(req.params.id, req.body);
    res.status(200).json(new ApiResponse(null, 'Category updated'));
  }
}
