import { Request, Response } from "express";
import { ExpenseService } from "./expense-service.js";

export class ExpenseController {
  static getAll(req: Request, res: Response) {
    const expenses = ExpenseService.getAllExpense();
    return res.json(expenses);
  }

  static async create(req: Request, res: Response) {
    const { category, amount } = req.body;
    ExpenseService.createExpense(category, amount);
    return res.status(201).json({ message: "Expense created" });
  }
}
