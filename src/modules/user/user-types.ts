export interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  // createdAt: number;
  // updatedAt: number;
}

export type UserWithoutSensitiveInfo = Omit<User, 'password'>;

export interface CreateUserParams {
  email: string;
  password: string;
  fullname: string;
}
