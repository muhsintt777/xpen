import { Hono } from 'hono';
import { ExpenseController } from './expense-controller';

const expenseRouter = new Hono();

expenseRouter.get('/', ExpenseController.getAll);
expenseRouter.post('/', ExpenseController.create);

export { expenseRouter };