import { db } from '@/configs/db.js';
import { CustomError } from '@/utils/error.js';
import {
  CreateExpenseParams,
  Expense,
  UpdateExpenseParams,
} from './expense-types.js';

export class ExpenseService {
  static async getAllUserExpenses(userId: string) {
    const q = `
      SELECT 
        e.id, 
        e.amount,
        e.note, 
        e.category_id AS categoryId,
        e.type,
        e.date,
        e.user_id AS userId,
        c.name AS categoryName
      FROM expenses e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE user_id = $1
      ORDER BY date DESC;
    `;
    const result = await db.query<Expense>(q, [userId]);
    return result.rows;
  }

  static async createExpense(params: CreateExpenseParams) {
    const { amount, note, categoryId, type, date, userId } = params;
    const q = `
      INSERT INTO expenses (amount, note, category_id, type, date, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await db.query(q, [amount, note, categoryId, type, date, userId]);
  }

  static async updateExpense(
    userId: string,
    expenseId: string,
    params: UpdateExpenseParams,
  ) {
    const fields = [
      ['amount', params.amount],
      ['note', params.note],
      ['category_id', params.categoryId],
      ['type', params.type],
      ['date', params.date],
    ] as const;

    const providedFields = fields.filter(
      ([, value]) => value !== undefined && value !== null,
    );

    const setClause = providedFields
      .map(([column], index) => `${column} = $${index + 1}`)
      .join(', ');

    const values = providedFields.map(([, value]) => value);

    const q = `
    UPDATE expenses
    SET ${setClause}
    WHERE id = $${values.length + 1}
      AND user_id = $${values.length + 2}
  `;

    const result = await db.query(q, [...values, expenseId, userId]);

    if (!result.rowCount) {
      throw new CustomError('RESOURCE_NOT_FOUND', 'Expense not found');
    }
  }

  static async deleteExpense(userId: string, expenseId: string) {
    const q = `
      DELETE FROM expenses
      WHERE id = $1 AND user_id = $2
    `;
    await db.query(q, [expenseId, userId]);
  }
}
