import { Router } from 'express';
import { CategoryController } from './category-controller.js';
import { AuthMiddleware } from '@/middlewares/auth-middleware.js';
import { asyncHandler } from '@/utils/async-handler.js';
import { validateReq } from '@/middlewares/validation-middleware.js';
import {
  CategoryIdSchema,
  CreateCategorySchema,
  UpdateCategoryReqSchema,
} from './category-validation.js';

const router: Router = Router();

router.post(
  '/',
  AuthMiddleware.verifyToken,
  validateReq(CreateCategorySchema),
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
  validateReq(CategoryIdSchema),
  asyncHandler(CategoryController.getCategory),
);

router.put(
  '/:id',
  AuthMiddleware.verifyToken,
  validateReq(UpdateCategoryReqSchema),
  asyncHandler(CategoryController.updateCategory),
);

export { router as categoryRouter };
