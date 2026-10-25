import type { AuthenticatedUser } from '#/types/authenticated-user.js';

declare module 'express' {
  interface Request {
    token?: AuthenticatedUser;
  }
}
