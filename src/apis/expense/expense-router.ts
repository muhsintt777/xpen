import express, { Router } from 'express';
import { ExpenseController } from '@/apis/expense/expense-controller.js';
import { AuthMiddleware } from '@/middlewares/auth-middleware.js';
import { asyncHandler } from '@/utils/async-handler.js';

const router: Router = express.Router();

router.get(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(ExpenseController.getAll),
);
router.post(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(ExpenseController.create),
);

export { router as expenseRouter };
