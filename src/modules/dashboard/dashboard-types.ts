import type { ExpenseType } from '#modules/expense';

export interface DashboardSummary {
  totalExpense: number;
  totalByType: Record<ExpenseType, number>;
  totalByCategory: {
    categoryId: string;
    categoryName: string;
    total: number;
  }[];
}
