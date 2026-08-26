import { compare, hash } from 'bcrypt';
const SALT_ROUNDS = 10;

export class PasswordHasher {
  static async hash(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS);
  }

  static async verify(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
