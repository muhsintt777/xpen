import { db } from '@/configs/db.js';
import { validateId } from '@/utils/common.js';
import { CustomError } from '@/utils/error.js';

export class UserService {
  static async getUser(id: unknown) {
    const validatedId = validateId(id);
    const q = `SELECT id, fullname, email FROM users WHERE id = ${validatedId}`;
    const result = await db.query(q);
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
    return result;
  }

  // static async createUser(
  //   email: string,
  //   username: string,
  //   password: string,
  //   fullName: string,
  //   profileImage: string | null,
  // ): Promise<string> {
  //   const [isEmailExists, isUsernameExists] = await Promise.all([
  //     UserModel.exists({ email }),
  //     UserModel.exists({ username }),
  //   ]);
  //   if (isEmailExists || isUsernameExists) {
  //     const errorMessage =
  //       isEmailExists && isUsernameExists
  //         ? 'Email and username already exists'
  //         : isEmailExists
  //           ? 'Email already exists'
  //           : 'Username already exists';
  //     throw new CustomError('RESOURCE_CONFLICT', errorMessage);
  //   }

  //   const result = await UserModel.create({
  //     email,
  //     username,
  //     password,
  //     fullName,
  //     profileImage,
  //   });

  //   return result._id.toString();
  // }

  // static async editUser(
  //   id: string,
  //   editDetails: { fullName?: string; bio?: string },
  // ) {
  //   const result = await UserModel.findByIdAndUpdate(id, editDetails);
  //   if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  // }

  // static async deleteUser(id: string): Promise<string> {
  //   const result = await UserModel.findByIdAndDelete(id);
  //   if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'User not found');
  //   return result._id.toString();
  // }
}
