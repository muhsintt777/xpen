import { db } from '#/infra/db.js';
import { Category } from './category-types.js';

export class CategoryRepository {
  static async findAll(): Promise<Category[]> {
    return (await db.query<Category>('SELECT id, name FROM categories')).rows;
  }

  static async findById(id: string): Promise<Category | undefined> {
    const query = 'SELECT id, name FROM categories WHERE id = $1';
    return (await db.query<Category>(query, [id])).rows[0];
  }

  static async create(name: string): Promise<void> {
    await db.query('INSERT INTO categories (name) VALUES ($1)', [name]);
  }

  static async update(id: string, name: string): Promise<boolean> {
    const result = await db.query(
      'UPDATE categories SET name = $1 WHERE id = $2',
      [name, id],
    );
    return Boolean(result.rowCount);
  }
}
