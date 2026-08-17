import express, { Router } from 'express';
import { ExpenseController } from '#/apis/expense/expense-controller.js';
import { AuthMiddleware } from '#/middlewares/auth-middleware.js';
import { asyncHandler } from '#/utils/async-handler.js';
import { validateReq } from '#/middlewares/validation-middleware.js';
import {
  CreateExpenseReqSchema,
  UpdateExpenseReqSchema,
} from './expense-validation.js';
import { idReqParamSchema, PaginationSchema } from '#/utils/common.js';

const router: Router = express.Router();
router.use(AuthMiddleware.verifyToken);

router.get(
  '/currentuser',
  validateReq(PaginationSchema),
  asyncHandler(ExpenseController.getAllUserExpenses),
);

router.post(
  '/',
  validateReq(CreateExpenseReqSchema),
  asyncHandler(ExpenseController.createExpense),
);

router.put(
  '/:id',
  validateReq(UpdateExpenseReqSchema),
  asyncHandler(ExpenseController.updateExpense),
);

router.delete(
  '/:id',
  validateReq(idReqParamSchema),
  asyncHandler(ExpenseController.deleteExpense),
);

export { router as expenseRouter };
