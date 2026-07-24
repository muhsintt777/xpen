import { asyncHandler } from '@/utils/async-handler.js';
import { Router } from 'express';
import { AuthController } from './auth-controller.js';

const router: Router = Router();

// todo: enable rate limit middleware for auth routes
// router.use(RateLimitMiddleware.auth);

router.post('/login', asyncHandler(AuthController.login));
router.post('/refresh', asyncHandler(AuthController.refreshToken));
router.post('/logout', asyncHandler(AuthController.logout));

export { router as authRouter };
