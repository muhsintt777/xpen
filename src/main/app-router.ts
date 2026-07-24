import { Router } from 'express';
import { expenseRouter } from '@/apis/expense/expense-router.js';
import { userRouter } from '@/apis/user/user-routes.js';
import { authRouter } from '@/apis/auth/auth-routes.js';

const router: Router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/expense', expenseRouter);

export { router as appRouter };
