import { Request, Response } from 'express';
import { ApiResponse } from '#/http/api-response.js';
import { ExpenseService } from './expense-service.js';
import { CreateExpenseParams, UpdateExpenseParams } from './expense-types.js';
import { Pagination } from '#/types/common-types.js';

export class ExpenseController {
  static async getAllUserExpenses(req: Request, res: Response) {
    const expenses = await ExpenseService.getAllUserExpenses(
      req.token?.userId as string,
      req.query as unknown as Pagination,
    );
    res
      .status(200)
      .json(
        ApiResponse.success({ data: expenses, message: 'Expenses fetched' }),
      );
  }

  static async createExpense(req: Request, res: Response) {
    const payload: CreateExpenseParams = {
      amount: req.body.amount as number,
      note: req.body.note || (null as string | null),
      categoryId: req.body.categoryId as string,
      type: req.body.type,
      date: req.body.date as number,
      userId: req.token?.userId as string,
    };
    await ExpenseService.createExpense(payload);
    res
      .status(201)
      .json(ApiResponse.success({ data: null, message: 'Expense created' }));
  }

  static async updateExpense(req: Request, res: Response) {
    await ExpenseService.updateExpense(
      req.token?.userId as string,
      req.params.id as string,
      req.body,
    );
    res
      .status(200)
      .json(ApiResponse.success({ data: null, message: 'Expense updated' }));
  }

  static async deleteExpense(req: Request, res: Response) {
    await ExpenseService.deleteExpense(
      req.token?.userId as string,
      req.params.id as string,
    );
    res
      .status(200)
      .json(ApiResponse.success({ data: null, message: 'Expense deleted' }));
  }
}
