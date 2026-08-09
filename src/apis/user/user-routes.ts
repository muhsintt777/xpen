import { asyncHandler } from '@/utils/async-handler.js';
import { Router } from 'express';
import { UserController } from './user-controller.js';
import { AuthMiddleware } from '@/middlewares/auth-middleware.js';

// todo: verify token

const router: Router = Router();

router.post('/', asyncHandler(UserController.createUser));

router.get(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(UserController.getAllUsers),
);
// router.get(
//   '/currentuser',
//   // AuthMiddleware.verifyToken,
//   asyncHandler(UserController.getCurrentUser),
// );
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
