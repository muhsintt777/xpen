import { ExpenseType } from '../expense/expense-types.js';

export interface DashboardSummary {
  totalExpense: number;
  totalByType: Record<ExpenseType, number>;
  totalByCategory: {
    categoryId: string;
    categoryName: string;
    total: number;
  }[];
}
