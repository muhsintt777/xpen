interface Expense {
  id: number;
  category: string;
  amount: number;
}

let LAST_ID = 1;
const EXP:Expense[] = [{id: 1, category: 'Food', amount: 50}];

export class ExpenseService {
  static createExpense(category: string, amount: number,) {
    EXP.push({ id: LAST_ID + 1, category, amount });
    LAST_ID = LAST_ID + 1;
  }

  static getAllExpense() {
    return EXP;
  }
}