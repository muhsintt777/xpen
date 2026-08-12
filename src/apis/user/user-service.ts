import { db } from '@/configs/db.js';
import { CustomError } from '@/utils/error.js';
import { HashUtils } from '@/utils/hash-utils.js';
import { CreateUserParams } from './user-types.js';

export class UserService {
  static async getAllUsers() {
    const q = 'SELECT id, fullname, email FROM users';
    const result = (await db.query(q)).rows;
    return result;
  }

  static async getUser(id: string) {
    const q = 'SELECT id, fullname, email FROM users WHERE id = $1';
    const result = (await db.query(q, [id])).rows[0];
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
    const q = 'DELETE FROM users WHERE id = $1';
    const res = (await db.query(q, [id])).rowCount;
    if (!res) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  }
}
