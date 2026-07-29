export interface User {
  id: string;
  email: string;
  password: string;
  refreshToken: string | null;
  createdAt: number;
  updatedAt: number;
}
