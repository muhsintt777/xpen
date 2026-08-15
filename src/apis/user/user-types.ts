export interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  refreshToken: string | null;
  // createdAt: number;
  // updatedAt: number;
}

export type UserWithoutSensitiveInfo = Omit<User, 'password' | 'refreshToken'>;

export interface CreateUserParams {
  email: string;
  password: string;
  fullname: string;
}
