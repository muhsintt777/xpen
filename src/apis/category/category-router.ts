import { Router } from 'express';
import { CategoryController } from './category-controller.js';
import { AuthMiddleware } from '@/middlewares/auth-middleware.js';
import { asyncHandler } from '@/utils/async-handler.js';

const router: Router = Router();

router.post(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(CategoryController.createCategory),
);

router.get(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(CategoryController.getAllCategories),
);

router.get(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(CategoryController.getCategory),
);

router.put(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(CategoryController.updateCategory),
);

export { router as categoryRouter };
