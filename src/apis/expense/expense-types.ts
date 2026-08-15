export type ExpenseType = 'NEED' | 'WANT' | 'SAVE';

export interface Expense {
  id: string;
  amount: number;
  note: string | null;
  categoryId: string;
  categoryName: string;
  type: ExpenseType;
  date: number;
  userId: string;
  // createdAt: number;
  // updatedAt: number;
}

export interface CreateExpenseParams extends Omit<
  Expense,
  'id' | 'categoryName'
> {}

export interface UpdateExpenseParams extends Partial<
  Omit<Expense, 'userId' | 'id' | 'categoryName'>
> {}
