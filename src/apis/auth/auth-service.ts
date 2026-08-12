import { db } from '@/configs/db.js';
import { CustomError } from '@/utils/error.js';
import { User } from '../user/user-types.js';
import { HashUtils } from '@/utils/hash-utils.js';
import { Token } from '@/utils/token.js';
import { LoginParams } from './auth-types.js';

export class AuthService {
  static async login(params: LoginParams) {
    const { email, password } = params;
    const q1 = `
      SELECT id, email, password 
      FROM users 
      WHERE email = $1;
    `;
    const user = (
      await db.query<Pick<User, 'id' | 'email' | 'password'>>(q1, [email])
    ).rows[0];
    if (!user) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid email or password');
    }
    const isPasswordValid = await HashUtils.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid email or password');
    }
    const accessToken = Token.createAccessToken({
      userId: user.id,
    });
    const refreshToken = Token.createRefreshToken({
      userId: user.id,
    });
    const q2 = `
      UPDATE users
      SET refresh_token = $1
      WHERE id = $2;
    `;
    await db.query(q2, [refreshToken, user.id]);
    return { accessToken, refreshToken };
  }

  static async refreshToken(refreshToken: string) {
    const { userId } = Token.verifyRefreshToken(refreshToken);
    const q = `
      SELECT id
      FROM users
      WHERE id = $1 AND refresh_token = $2;
    `;
    const user = (await db.query<Pick<User, 'id'>>(q, [userId, refreshToken]))
      .rows[0];
    if (!user) {
      throw new CustomError('SIGNED_OUT', 'Unauthorized');
    }

    return Token.createAccessToken({ userId: user.id });
  }

  static async logout(userID: string) {
    const q = `
      UPDATE users
      SET refresh_token = NULL
      WHERE id = $1;
    `;
    await db.query(q, [userID]);
  }
}
