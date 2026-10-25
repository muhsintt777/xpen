import { CustomError } from '#/errors/app-error.js';
import { CategoryRepository } from './category-repository.js';

export class CategoryService {
  static async getAllCategories() {
    return CategoryRepository.findAll();
  }

  static async getCategory(id: string) {
    const result = await CategoryRepository.findById(id);
    if (!result)
      throw new CustomError('RESOURCE_NOT_FOUND', 'Category not found');
    return result;
  }

  static async createCategory(name: string) {
    await CategoryRepository.create(name);
  }

  static async updateCategory(id: string, name: string) {
    const updated = await CategoryRepository.update(id, name);
    if (!updated)
      throw new CustomError('RESOURCE_NOT_FOUND', 'Category not found');
  }
}
