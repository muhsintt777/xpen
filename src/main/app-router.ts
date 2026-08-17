import { Router } from 'express';
import { expenseRouter } from '#/apis/expense/expense-router.js';
import { userRouter } from '#/apis/user/user-router.js';
import { authRouter } from '#/apis/auth/auth-router.js';
import { categoryRouter } from '#/apis/category/category-router.js';

const router: Router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/expense', expenseRouter);
router.use('/category', categoryRouter);

export { router as appRouter };

// todo: merge api utils
