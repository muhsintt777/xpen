import express, { Router } from 'express';
import { AuthMiddleware } from '#/middlewares/auth-middleware.js';
import { asyncHandler } from '#/http/async-handler.js';
import { DashboardController } from './dashboard-controller.js';

const router: Router = express.Router();
router.use(AuthMiddleware.verifyToken);

router.get(
  '/currentuser',
  asyncHandler(DashboardController.getCurrentMonthSummary),
);

export { router as dashboardRouter };
