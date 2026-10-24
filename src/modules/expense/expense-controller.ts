import { Request, Response } from 'express';
import { ApiResponse } from '#/http/api-response.js';
import { sendApiResponse } from '#/http/send-api-response.js';
import { ExpenseService } from './expense-service.js';
import { CreateExpenseParams, ExpensePagination } from './expense-types.js';

export class ExpenseController {
  static async getAllUserExpenses(req: Request, res: Response) {
    const cursor = req.query.cursor as string | undefined;
    const pagination: ExpensePagination = {
      limit: req.query.limit as unknown as number,
      ...(cursor !== undefined ? { cursor: Number(cursor) } : {}),
    };
    const expenses = await ExpenseService.getAllUserExpenses(
      req.token?.userId as string,
      pagination,
    );
    sendApiResponse(
      res,
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
    sendApiResponse(
      res,
      ApiResponse.success({
        successType: 'CREATED',
        message: 'Expense created',
      }),
    );
  }

  static async updateExpense(req: Request, res: Response) {
    await ExpenseService.updateExpense(
      req.token?.userId as string,
      req.params.id as string,
      req.body,
    );
    sendApiResponse(res, ApiResponse.success({ message: 'Expense updated' }));
  }

  static async deleteExpense(req: Request, res: Response) {
    await ExpenseService.deleteExpense(
      req.token?.userId as string,
      req.params.id as string,
    );
    sendApiResponse(res, ApiResponse.success({ message: 'Expense deleted' }));
  }
}
