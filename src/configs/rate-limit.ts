export const RATE_LIMIT_CONFIG = {
  windowMs: 15 * 60 * 1000,
  defaultMax: 500,
  authMax: 20,
} as const;
