import express, { Router } from 'express';
import { ExpenseController } from '@/apis/expense/expense-controller.js';
import { AuthMiddleware } from '@/middlewares/auth-middleware.js';
import { asyncHandler } from '@/utils/async-handler.js';
import { validateReq } from '@/middlewares/validation-middleware.js';
import {
  CreateExpenseReqSchema,
  UpdateExpenseReqSchema,
} from './expense-validation.js';
import { idReqParamSchema } from '@/utils/common.js';

const router: Router = express.Router();

router.post(
  '/',
  AuthMiddleware.verifyToken,
  validateReq(CreateExpenseReqSchema),
  asyncHandler(ExpenseController.createExpense),
);

router.put(
  '/:id',
  AuthMiddleware.verifyToken,
  validateReq(UpdateExpenseReqSchema),
  asyncHandler(ExpenseController.updateExpense),
);

router.delete(
  '/:id',
  validateReq(idReqParamSchema),
  AuthMiddleware.verifyToken,
  asyncHandler(ExpenseController.deleteExpense),
);

export { router as expenseRouter };
