import express, { Router } from 'express';
import { expenseRouter } from '@/apis/expense-router.js';

const router: Router = express.Router();
router.use('/expense', expenseRouter);

export { router as appRouter };
