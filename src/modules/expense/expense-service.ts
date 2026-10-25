import { CustomError } from '#/errors/app-error.js';
import {
  CreateExpenseParams,
  ExpensePagination,
  UpdateExpenseParams,
} from './expense-types.js';
import { ExpenseRepository } from './expense-repository.js';

export class ExpenseService {
  static async getAllUserExpenses(
    userId: string,
    pagination: ExpensePagination,
  ) {
    const result = await ExpenseRepository.findAllForUser(userId, pagination);

    const hasNextPage = result.length === pagination.limit + 1;
    if (hasNextPage) result.pop();
    const nextCursor = hasNextPage ? result[pagination.limit - 1]?.date : '';
    const paginationDetails = {
      limit: pagination.limit,
      nextCursor,
      hasNextPage,
    };

    return { items: result, pagination: paginationDetails };
  }

  static async createExpense(params: CreateExpenseParams) {
    await ExpenseRepository.create(params);
  }

  static async updateExpense(
    userId: string,
    expenseId: string,
    params: UpdateExpenseParams,
  ) {
    const updated = await ExpenseRepository.updateForUser(
      userId,
      expenseId,
      params,
    );

    if (!updated) {
      throw new CustomError('RESOURCE_NOT_FOUND', 'Expense not found');
    }
  }

  static async deleteExpense(userId: string, expenseId: string) {
    await ExpenseRepository.deleteForUser(userId, expenseId);
  }
}
