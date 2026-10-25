import { Router } from 'express';
import { expenseRouter } from '#modules/expense';
import { userRouter } from '#modules/user';
import { authRouter } from '#modules/auth';
import { categoryRouter } from '#modules/category';
import { dashboardRouter } from '#modules/dashboard';

const router: Router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/expense', expenseRouter);
router.use('/category', categoryRouter);
router.use('/dashboard', dashboardRouter);

export { router as appRouter };
