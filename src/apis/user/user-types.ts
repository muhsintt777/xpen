export interface User {
  id: number;
  email: string;
  password: string;
  refreshToken: string | null;
  createdAt: number;
  updatedAt: number;
}
