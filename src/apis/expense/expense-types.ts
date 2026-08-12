export type ExpenseType = 'NEED' | 'WANT' | 'SAVE';

export interface Expense {
  id: string;
  amount: number;
  note: string | null;
  categoryId: string;
  type: ExpenseType;
  date: number;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateExpenseParams extends Omit<
  Expense,
  'id' | 'createdAt' | 'updatedAt'
> {}

export interface UpdateExpenseParams extends Partial<
  Omit<Expense, 'userId' | 'id' | 'createdAt' | 'updatedAt'>
> {}
