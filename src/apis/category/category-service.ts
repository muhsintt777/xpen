import { db } from '#/configs/db.js';
import { CustomError } from '#/errors/app-error.js';
import { Category } from './category-types.js';

export class CategoryService {
  static async getAllCategories() {
    const q = 'SELECT id, name FROM categories';
    const result = (await db.query<Category>(q)).rows;
    return result;
  }

  static async getCategory(id: string) {
    const q = 'SELECT id, name FROM categories WHERE id = $1';
    const result = (await db.query<Category>(q, [id])).rows[0];
    if (!result)
      throw new CustomError('RESOURCE_NOT_FOUND', 'Category not found');
    return result;
  }

  static async createCategory(name: string) {
    const q = 'INSERT INTO categories (name) VALUES ($1)';
    await db.query(q, [name]);
  }

  static async updateCategory(id: string, name: string) {
    const q = 'UPDATE categories SET name = $1 WHERE id = $2';
    const res = (await db.query(q, [name, id])).rowCount;
    if (!res) throw new CustomError('RESOURCE_NOT_FOUND', 'Category not found');
  }
}
