import { Hono } from "hono";
import { expenseRouter } from "../features/expense-router";

const appRouter = new Hono();

appRouter.route('/expense', expenseRouter);
// other routes can be added here

export { appRouter };