import { db } from '#/infra/db.js';
import {
  User,
  UserPagination,
  UserWithoutSensitiveInfo,
} from './user-types.js';

export class UserRepository {
  static async findCredentialsByEmail(
    email: string,
  ): Promise<Pick<User, 'id' | 'email' | 'password'> | undefined> {
    const query = 'SELECT id, email, password FROM users WHERE email = $1';
    return (
      await db.query<Pick<User, 'id' | 'email' | 'password'>>(query, [email])
    ).rows[0];
  }

  static async findAll(
    pagination: UserPagination,
  ): Promise<UserWithoutSensitiveInfo[]> {
    const query = `
      SELECT id, fullname, email
      FROM users
      WHERE ($1::bigint IS NULL OR id > $1::bigint)
      ORDER BY id ASC
      LIMIT $2
    `;
    return (
      await db.query<UserWithoutSensitiveInfo>(query, [
        pagination.cursor ?? null,
        pagination.limit + 1,
      ])
    ).rows;
  }

  static async findById(
    id: string,
  ): Promise<UserWithoutSensitiveInfo | undefined> {
    const query = 'SELECT id, fullname, email FROM users WHERE id = $1';
    return (await db.query<UserWithoutSensitiveInfo>(query, [id])).rows[0];
  }

  static async create(params: {
    fullname: string;
    email: string;
    passwordHash: string;
  }): Promise<void> {
    const query =
      'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3)';
    await db.query(query, [params.fullname, params.email, params.passwordHash]);
  }

  static async delete(id: string): Promise<boolean> {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return Boolean(result.rowCount);
  }
}
