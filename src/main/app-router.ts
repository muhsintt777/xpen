import { Router } from 'express';
import { expenseRouter } from '@/apis/expense/expense-router.js';
import { userRouter } from '@/apis/user/user-routes.js';

const router: Router = Router();
router.use('/user', userRouter);
router.use('/expense', expenseRouter);

export { router as appRouter };
