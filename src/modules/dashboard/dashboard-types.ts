import type { ExpenseType } from '../expense/index.js';

export interface DashboardSummary {
  totalExpense: number;
  totalByType: Record<ExpenseType, number>;
  totalByCategory: {
    categoryId: string;
    categoryName: string;
    total: number;
  }[];
}
