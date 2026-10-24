import { db } from '#/infra/db.js';
import { CustomError } from '#/errors/app-error.js';
import { UserService } from '../user/user-service.js';
import { PasswordHasher } from '#/security/password-hasher.js';
import { AuthTokenService } from '#/security/auth-token-service.js';
import { AuthTokens, LoginParams } from './auth-types.js';

export class AuthService {
  static async login(params: LoginParams): Promise<AuthTokens> {
    const { email, password } = params;
    const user = await UserService.getCredentialsByEmail(email);
    if (!user) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid email or password');
    }
    const isPasswordValid = await PasswordHasher.verify(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid email or password');
    }

    const accessToken = AuthTokenService.createAccessToken({
      userId: user.id,
    });
    const refreshToken = AuthTokenService.createRefreshToken({
      userId: user.id,
    });
    const refreshTokenHash = AuthTokenService.hashToken(refreshToken);

    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM sessions WHERE user_id = $1;', [user.id]);
      await client.query(
        'INSERT INTO sessions (user_id, refresh_token_hash) VALUES ($1, $2);',
        [user.id, refreshTokenHash],
      );
      await client.query('COMMIT');

      return { accessToken, refreshToken };
    } catch (error) {
      await client.query('ROLLBACK').catch(() => {});
      throw error;
    } finally {
      client.release();
    }
  }

  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { userId } = AuthTokenService.verifyRefreshToken(refreshToken);
    const currentTokenHash = AuthTokenService.hashToken(refreshToken);

    const newAccessToken = AuthTokenService.createAccessToken({ userId });
    const newRefreshToken = AuthTokenService.createRefreshToken({ userId });
    const newRefreshTokenHash = AuthTokenService.hashToken(newRefreshToken);

    // Single atomic compare-and-swap: only one request can consume a given token.
    const updateQuery = `
      UPDATE sessions
      SET refresh_token_hash = $1
      WHERE user_id = $2 AND refresh_token_hash = $3
      RETURNING id;
    `;
    const result = await db.query(updateQuery, [
      newRefreshTokenHash,
      userId,
      currentTokenHash,
    ]);

    if (!result.rowCount) {
      throw new CustomError('SIGNED_OUT', 'Unauthorized');
    }

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  static async logout(userId: string): Promise<void> {
    const q = `
      DELETE FROM sessions
      WHERE user_id = $1;
    `;
    await db.query(q, [userId]);
  }
}
