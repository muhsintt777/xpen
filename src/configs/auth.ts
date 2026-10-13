export const AUTH_CONFIG = {
  accessTokenExpiresIn: '10m',
  refreshTokenExpiresIn: '2d',
  refreshTokenCookieMaxAge: 2 * 24 * 60 * 60 * 1000,
} as const;
