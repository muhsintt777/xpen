import { asyncHandler } from '@/utils/async-handler.js';
import { Router } from 'express';
import { UserController } from './user-controller.js';
import { AuthMiddleware } from '@/middlewares/auth-middleware.js';
import { validateReq } from '@/middlewares/validation-middleware.js';
import { CreateUserSchema } from './user-validation.js';
import { idReqParamSchema, PaginationSchema } from '@/utils/common.js';

const router: Router = Router();

router.post(
  '/',
  validateReq(CreateUserSchema),
  asyncHandler(UserController.createUser),
);

router.get(
  '/list',
  AuthMiddleware.verifyToken,
  validateReq(PaginationSchema),
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
  validateReq(idReqParamSchema),
  asyncHandler(UserController.getUser),
);

router.delete(
  '/:id',
  AuthMiddleware.verifyToken,
  validateReq(idReqParamSchema),
  asyncHandler(UserController.deleteUser),
);

export { router as userRouter };
