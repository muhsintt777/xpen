import { db } from '@/configs/db.js';
import { validateId } from '@/utils/common.js';
import { CustomError } from '@/utils/error.js';
import { CreateUserSchema } from './user-validation.js';

export class UserService {
  static async getAllUsers() {
    const q = 'SELECT id, fullname, email FROM users';
    const result = (await db.query(q)).rows;
    return result;
  }

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
    await db.query(q);
  }

  static async deleteUser(id: unknown) {
    const validatedId = validateId(id);
    const q = `DELETE FROM users WHERE id = ${validatedId}`;
    const res = (await db.query(q)).rowCount;
    if (!res) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  }
}
