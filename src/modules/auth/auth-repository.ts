import { db } from '#/infra/db.js';

export class AuthRepository {
  static async replaceSession(
    userId: string,
    refreshTokenHash: string,
  ): Promise<void> {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM sessions WHERE user_id = $1;', [userId]);
      await client.query(
        'INSERT INTO sessions (user_id, refresh_token_hash) VALUES ($1, $2);',
        [userId, refreshTokenHash],
      );
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK').catch(() => {});
      throw error;
    } finally {
      client.release();
    }
  }

  static async rotateRefreshToken(
    userId: string,
    currentTokenHash: string,
    newTokenHash: string,
  ): Promise<boolean> {
    const query = `
      UPDATE sessions
      SET refresh_token_hash = $1
      WHERE user_id = $2 AND refresh_token_hash = $3
      RETURNING id;
    `;
    const result = await db.query(query, [
      newTokenHash,
      userId,
      currentTokenHash,
    ]);
    return Boolean(result.rowCount);
  }

  static async deleteSession(userId: string): Promise<void> {
    await db.query('DELETE FROM sessions WHERE user_id = $1;', [userId]);
  }
}
