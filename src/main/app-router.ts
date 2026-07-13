import express, { Router } from "express";
import { expenseRouter } from "../features/expense-router.js";

const router: Router = express.Router();
router.use("/expense", expenseRouter);

export { router as appRouter };
