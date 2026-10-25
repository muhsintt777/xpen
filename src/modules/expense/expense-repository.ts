import { db } from '#/infra/db.js';
import {
  CreateExpenseParams,
  Expense,
  ExpensePagination,
  UpdateExpenseParams,
} from './expense-types.js';

export class ExpenseRepository {
  static async findAllForUser(
    userId: string,
    pagination: ExpensePagination,
  ): Promise<Omit<Expense, 'userId'>[]> {
    const query = `
      SELECT
        e.id,
        e.amount,
        e.note,
        e.category_id AS "categoryId",
        e.type,
        e.date,
        c.name AS "categoryName"
      FROM expenses e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.user_id = $1
        AND ($2::bigint IS NULL OR e.date < $2::bigint)
      ORDER BY e.date DESC
      LIMIT $3;
    `;
    return (
      await db.query<Omit<Expense, 'userId'>>(query, [
        userId,
        pagination.cursor ?? null,
        pagination.limit + 1,
      ])
    ).rows;
  }

  static async create(params: CreateExpenseParams): Promise<void> {
    const query = `
      INSERT INTO expenses (amount, note, category_id, type, date, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await db.query(query, [
      params.amount,
      params.note,
      params.categoryId,
      params.type,
      params.date,
      params.userId,
    ]);
  }

  static async updateForUser(
    userId: string,
    expenseId: string,
    params: UpdateExpenseParams,
  ): Promise<boolean> {
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
    const query = `
      UPDATE expenses
      SET ${setClause}
      WHERE id = $${values.length + 1}
        AND user_id = $${values.length + 2}
    `;
    const result = await db.query(query, [...values, expenseId, userId]);
    return Boolean(result.rowCount);
  }

  static async deleteForUser(userId: string, expenseId: string): Promise<void> {
    const query = 'DELETE FROM expenses WHERE id = $1 AND user_id = $2';
    await db.query(query, [expenseId, userId]);
  }
}
