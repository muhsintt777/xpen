import { db } from '@/configs/db.js';
import { LoginSchema } from './auth-validation.js';

export class AuthService {
  static async login(params: unknown) {
    const { email, password } = LoginSchema.parse(params);
    const q = `SELECT * FROM users WHERE email = ?`;
    const result = await db.query(q, [email]);
    // todo: create token
  }

  static async refreshToken(userID: string, refreshToken: string) {
    const q = `SELECT * FROM users WHERE id = ? AND refresh_token = ?`;
    const result = await db.query(q, [userID, refreshToken]);
    // todo: refresh token logic
  }

  static async logout(userID: string) {
    const q = `UPDATE users SET refresh_token = NULL WHERE id = ?`;
    await db.query(q, [userID]);
  }
}
