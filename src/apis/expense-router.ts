import express, { Router } from 'express';
import { ExpenseController } from '@/apis/expense-controller.js';

const router: Router = express.Router();

router.get('/', ExpenseController.getAll);
router.post('/', ExpenseController.create);

export { router as expenseRouter };
