import { Router } from 'express';
import { expenseRouter } from '../../dist/modules/expense/expense-router.js';
import { userRouter } from '../../dist/modules/user/user-router.js';
import { authRouter } from '../../dist/modules/auth/auth-router.js';
import { categoryRouter } from '../../dist/modules/category/category-router.js';
import { dashboardRouter } from '../../dist/modules/dashboard/dashboard-router.js';

const router: Router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/expense', expenseRouter);
router.use('/category', categoryRouter);
router.use('/dashboard', dashboardRouter);

export { router as appRouter };
