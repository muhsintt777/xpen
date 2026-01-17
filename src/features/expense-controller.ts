import type { Context } from 'hono';
import { ExpenseService } from './expense-service';

export class ExpenseController {
  static getAll(c: Context) {
    const expenses = ExpenseService.getAllExpense();
    return c.json(expenses);
  }

  static async create(c: Context) {
    const { category, amount } = await c.req.json();
    ExpenseService.createExpense(category, amount);
    return c.json({ message: 'Expense created' }, 201);
  }
}