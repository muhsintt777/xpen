import { Request, Response } from 'express';
import { ExpenseService } from '@/apis/expense/expense-service.js';

export class ExpenseController {
  static async getAll(req: Request, res: Response) {
    const expenses = ExpenseService.getAllExpense();
    res.json(expenses);
  }

  static async create(req: Request, res: Response) {
    const { category, amount } = req.body;
    ExpenseService.createExpense(category, amount);
    res.status(201).json({ message: 'Expense created' });
  }
}
