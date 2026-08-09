export interface User {
  id: string;
  email: string;
  password: string;
  refreshToken: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface CreateUserParams {
  email: string;
  password: string;
  fullname: string;
}
