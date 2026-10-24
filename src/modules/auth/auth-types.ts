export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Session {
  id: string;
  userId: string;
  refreshTokenHash: string;
  createdAt: number;
  updatedAt: number;
}
