import { asyncHandler } from '#/utils/async-handler.js';
import { Router } from 'express';
import { AuthController } from './auth-controller.js';
import { AuthMiddleware } from '#/middlewares/auth-middleware.js';
import { validateReq } from '#/middlewares/validation-middleware.js';
import { LoginSchema, RefreshTokenSchema } from './auth-validation.js';

const router: Router = Router();

// todo: enable rate limit middleware for auth routes
// router.use(RateLimitMiddleware.auth);

router.post(
  '/login',
  validateReq(LoginSchema),
  asyncHandler(AuthController.login),
);
router.post(
  '/refresh',
  validateReq(RefreshTokenSchema),
  asyncHandler(AuthController.refreshToken),
);
router.post(
  '/logout',
  AuthMiddleware.verifyToken,
  asyncHandler(AuthController.logout),
);

export { router as authRouter };
