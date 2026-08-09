import { asyncHandler } from '@/utils/async-handler.js';
import { Router } from 'express';
import { UserController } from './user-controller.js';
import { AuthMiddleware } from '@/middlewares/auth-middleware.js';
import { validateReq } from '@/middlewares/validation-middleware.js';
import { CreateUserSchema } from './user-validation.js';

const router: Router = Router();

router.post(
  '/',
  validateReq(CreateUserSchema),
  asyncHandler(UserController.createUser),
);

router.get(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(UserController.getAllUsers),
);

router.get(
  '/currentuser',
  AuthMiddleware.verifyToken,
  asyncHandler(UserController.getCurrentUser),
);

router.get(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(UserController.getUser),
);

router.delete(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(UserController.deleteUser),
);

export { router as userRouter };
