import { db } from '#/infra/db.js';
import { DashboardSummary } from './dashboard-types.js';
import { ExpenseType } from '../expense/expense-types.js';

export class DashboardService {
  static async getCurrentMonthSummary(
    userId: string,
  ): Promise<DashboardSummary> {
    // Month boundaries in UTC, as unix seconds (expenses.date is BIGINT seconds)
    const now = new Date();
    const start = Math.floor(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) / 1000,
    );
    const end = Math.floor(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1) / 1000,
    );

    const typeQ = `
      SELECT type, SUM(amount)::float8 AS total
      FROM expenses
      WHERE user_id = $1 AND date >= $2 AND date < $3
      GROUP BY type
    `;
    const categoryQ = `
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
    const params = [userId, start, end];
    const [typeRes, categoryRes] = await Promise.all([
      db.query<{ type: ExpenseType; total: number }>(typeQ, params),
      db.query<DashboardSummary['totalByCategory'][number]>(categoryQ, params),
    ]);

    const totalByType: Record<ExpenseType, number> = {
      NEED: 0,
      WANT: 0,
      SAVE: 0,
    };
    for (const row of typeRes.rows) totalByType[row.type] = row.total;

    const totalExpense = Object.values(totalByType).reduce((a, b) => a + b, 0);

    return { totalExpense, totalByType, totalByCategory: categoryRes.rows };
  }
}
