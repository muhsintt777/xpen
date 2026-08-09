import { db } from '@/configs/db.js';
import { validateId } from '@/utils/common.js';
import { CustomError } from '@/utils/error.js';
import { HashUtils } from '@/utils/crypto.js';
import { CreateUserParams } from './user-types.js';

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

  static async createUser(params: CreateUserParams) {
    const { fullname, email, password } = params;
    const passwordHash = await HashUtils.hashString(password);
    const q = `INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3)`;
    await db.query(q, [fullname, email, passwordHash]);
  }

  static async deleteUser(id: string) {
    const q = `DELETE FROM users WHERE id = ${id}`;
    const res = (await db.query(q)).rowCount;
    if (!res) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  }
}
