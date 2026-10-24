import { Router } from 'express';
import { CategoryController } from './category-controller.js';
import { AuthMiddleware } from '#/middlewares/auth-middleware.js';
import { asyncHandler } from '#/http/async-handler.js';
import { validateReq } from '#/middlewares/validation-middleware.js';
import {
  // CreateCategoryReqSchema,
  UpdateCategoryReqSchema,
} from './category-validation.js';
import { ReqParamIdSchema } from '#/validation/schemas.js';

const router: Router = Router();

// router.post(
//   '/',
//   AuthMiddleware.verifyToken,
//   validateReq(CreateCategoryReqSchema),
//   asyncHandler(CategoryController.createCategory),
// );

router.get(
  '/list',
  AuthMiddleware.verifyToken,
  asyncHandler(CategoryController.getAllCategories),
);

router.get(
  '/:id',
  AuthMiddleware.verifyToken,
  validateReq(ReqParamIdSchema),
  asyncHandler(CategoryController.getCategory),
);

router.put(
  '/:id',
  AuthMiddleware.verifyToken,
  validateReq(UpdateCategoryReqSchema),
  asyncHandler(CategoryController.updateCategory),
);

export { router as categoryRouter };
