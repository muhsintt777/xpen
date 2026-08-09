import { db } from '@/configs/db.js';
import { validateId } from '@/utils/common.js';
import { CustomError } from '@/utils/error.js';
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from './category-validation.js';

export class CategoryService {
  static async getAllCategories() {
    const q = 'SELECT id, name FROM categories';
    const result = (await db.query(q)).rows;
    return result;
  }

  static async getCategory(id: unknown) {
    const validatedId = validateId(id);
    const q = `SELECT id, name FROM categories WHERE id = ${validatedId}`;
    const result = (await db.query(q)).rows[0];
    if (!result)
      throw new CustomError('RESOURCE_NOT_FOUND', 'Category not found');
    return result;
  }

  static async createCategory(params: unknown) {
    const { name } = CreateCategorySchema.parse(params);
    const q = 'INSERT INTO categories (name) VALUES ($1)';
    await db.query(q, [name]);
  }

  static async updateCategory(id: unknown, params: unknown) {
    const validatedId = validateId(id);
    const { name } = UpdateCategorySchema.parse(params);
    const q = 'UPDATE categories SET name = $1 WHERE id = $2';
    const res = (await db.query(q, [name, validatedId])).rowCount;
    if (!res) throw new CustomError('RESOURCE_NOT_FOUND', 'Category not found');
  }
}
