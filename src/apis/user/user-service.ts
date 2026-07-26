import { db } from '@/configs/db.js';
import { validateId } from '@/utils/common.js';
import { CustomError } from '@/utils/error.js';
import { CreateUserSchema } from './user-validation.js';

export class UserService {
  static async getUser(id: unknown) {
    const validatedId = validateId(id);
    const q = `SELECT id, fullname, email FROM users WHERE id = ${validatedId}`;
    const result = (await db.query(q)).rows[0];
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
    return result;
  }

  static async createUser(params: unknown) {
    const { fullname, email, password } = CreateUserSchema.parse(params);
    const q = `INSERT INTO users (fullname, email, password) VALUES ('${fullname}', '${email}', '${password}')`;
    const result = await db.query(q);
    if (!result)
      throw new CustomError('INTERNAL_SERVER_ERROR', 'User not created');
  }

  static async deleteUser(id: unknown) {
    const validatedId = validateId(id);
    const q = `DELETE FROM users WHERE id = ${validatedId}`;
    const result = await db.query(q);
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  }
}
