export type ExpenseType = 'NEED' | 'WANT' | 'SAVE';

export interface Expense {
  id: number;
  amount: number;
  note: string;
  categoryId: string;
  type: ExpenseType;
  date: number;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateExpenseParams {
  amount: number;
  note: string;
  categoryId: string;
  type: ExpenseType;
  date: number;
  userId: string;
}
