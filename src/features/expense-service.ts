interface Expense {
  id: number;
  category: string;
  amount: number;
}

const LAST_ID = 0;
const EXP:Expense[] = [];

export class ExpenseService {
  static createExpense(category: string, amount: number,) {
    EXP.push({ id: LAST_ID + 1, category, amount });
  }

  static getAllExpense() {
    return EXP;
  }
}