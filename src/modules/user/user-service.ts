import { db } from '#/infra/db.js';
import { CustomError } from '#/errors/app-error.js';
import { PasswordHasher } from '#/security/password-hasher.js';
import { CreateUserParams, UserWithoutSensitiveInfo } from './user-types.js';
import { Pagination } from '#/types/common-types.js';

export class UserService {
  static async getAllUsers(paginationParams: Pagination) {
    let cursorClause = '';
    if (paginationParams.cursor) {
      cursorClause = `WHERE id > ${paginationParams.cursor}`;
    }
    const q = `
      SELECT id, fullname, email 
      FROM users
      ${cursorClause}
      LIMIT $1
    `;
    const result = (
      await db.query<UserWithoutSensitiveInfo>(q, [paginationParams.limit + 1])
    ).rows;
    const hasNextPage = result.length === paginationParams.limit + 1;
    if (hasNextPage) result.pop();
    const nextCursor = hasNextPage
      ? result[paginationParams.limit - 1]?.id
      : '';

    return {
      items: result,
      pagination: { limit: paginationParams.limit, nextCursor, hasNextPage },
    };
  }

  static async getUser(id: string) {
    const q = 'SELECT id, fullname, email FROM users WHERE id = $1';
    const result = (await db.query<UserWithoutSensitiveInfo>(q, [id])).rows[0];
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
    return result;
  }

  static async createUser(params: CreateUserParams) {
    const { fullname, email, password } = params;
    const passwordHash = await PasswordHasher.hash(password);
    const q = `INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3)`;
    await db.query(q, [fullname, email, passwordHash]);
  }

  static async deleteUser(id: string) {
    const q = 'DELETE FROM users WHERE id = $1';
    const res = (await db.query(q, [id])).rowCount;
    if (!res) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  }
}
