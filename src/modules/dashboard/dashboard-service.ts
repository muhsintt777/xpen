import { DashboardSummary } from './dashboard-types.js';
import type { ExpenseType } from '#modules/expense';
import { DashboardRepository } from './dashboard-repository.js';

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

    const [totalsByType, totalsByCategory] = await Promise.all([
      DashboardRepository.getTotalsByType(userId, start, end),
      DashboardRepository.getTotalsByCategory(userId, start, end),
    ]);

    const totalByType: Record<ExpenseType, number> = {
      NEED: 0,
      WANT: 0,
      SAVE: 0,
    };
    for (const row of totalsByType) totalByType[row.type] = row.total;

    const totalExpense = Object.values(totalByType).reduce((a, b) => a + b, 0);

    return { totalExpense, totalByType, totalByCategory: totalsByCategory };
  }
}
