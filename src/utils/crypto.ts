import { compare, hash } from 'bcrypt';
const SALT_ROUNDS = 5;

export class HashUtils {
  static async hashString(payload: string): Promise<string> {
    return hash(payload, SALT_ROUNDS);
  }

  static async compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}
