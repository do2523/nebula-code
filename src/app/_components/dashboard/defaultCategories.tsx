import Category from "src/app/_components/budgeting/BudgetingCategorySelector";

export const DefaultCategories: Category[] = [
	{
		id:"1",
		name: "Rent",
		type: 'fixed',
		value: 0,
	},
	{
		id: "2",
		name: "Groceries",
		type: ExpenseType.obligatoryRange,
		value: 0,
	},
	{
		id: "3",
		name: "Savings Account",
		type: ExpenseType.savings,
		value: 0,
	},
	{
		id: "4",
		name: "Dinning out",
		type: ExpenseType.leisure,
		value: 0,
	},
	{
		id:"5",
		name:"Debt Repayment",
		type: ExpenseType.obligatoryRange,
		value: 0,
	},

]