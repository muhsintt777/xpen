import { db } from '#/infra/db.js';
import type { ExpenseType } from '#modules/expense';
import type { DashboardSummary } from './dashboard-types.js';

export class DashboardRepository {
  static async getTotalsByType(
    userId: string,
    start: number,
    end: number,
  ): Promise<{ type: ExpenseType; total: number }[]> {
    const query = `
      SELECT type, SUM(amount)::float8 AS total
      FROM expenses
      WHERE user_id = $1 AND date >= $2 AND date < $3
      GROUP BY type
    `;
    return (
      await db.query<{ type: ExpenseType; total: number }>(query, [
        userId,
        start,
        end,
      ])
    ).rows;
  }

  static async getTotalsByCategory(
    userId: string,
    start: number,
    end: number,
  ): Promise<DashboardSummary['totalByCategory']> {
    const query = `
      SELECT
        e.category_id AS "categoryId",
        c.name AS "categoryName",
        SUM(e.amount)::float8 AS total
      FROM expenses e
      JOIN categories c ON c.id = e.category_id
      WHERE e.user_id = $1 AND e.date >= $2 AND e.date < $3
      GROUP BY e.category_id, c.name
      ORDER BY total DESC
    `;
    return (
      await db.query<DashboardSummary['totalByCategory'][number]>(query, [
        userId,
        start,
        end,
      ])
    ).rows;
  }
}
