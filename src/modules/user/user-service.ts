import { CustomError } from '#/errors/app-error.js';
import { PasswordHasher } from '#/infra/security/password-hasher.js';
import { CreateUserParams, User, UserPagination } from './user-types.js';
import { UserRepository } from './user-repository.js';

export const getCredentialsByEmail = async (
  email: string,
): Promise<Pick<User, 'id' | 'email' | 'password'> | undefined> => {
  return UserRepository.findCredentialsByEmail(email);
};

export class UserService {
  static async getAllUsers(paginationParams: UserPagination) {
    const result = await UserRepository.findAll(paginationParams);
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
    const result = await UserRepository.findById(id);
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
    return result;
  }

  static async createUser(params: CreateUserParams) {
    const { fullname, email, password } = params;
    const passwordHash = await PasswordHasher.hash(password);
    await UserRepository.create({ fullname, email, passwordHash });
  }

  static async deleteUser(id: string) {
    const deleted = await UserRepository.delete(id);
    if (!deleted) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  }
}
