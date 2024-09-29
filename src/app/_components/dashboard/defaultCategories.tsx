import {Category} from "src/app/_components/budgeting/BudgetingCategorySelector";

export const DefaultCategories: Category[] = [
	{
		name: "Rent",
		categoryType: 'fixed',
		value: 0,
		id: "",
		userId: "",
	},
	{
		userId: "",
		id: "2",
		name: "Groceries",
		categoryType: "obligatory",
		value: 0,
	},
	{
		userId: "",
		id: "3",
		name: "Savings Account",
		categoryType: "savings",
		value: 0,
	},
	{
		userId: "",
		id: "4",
		name: "Dinning out",
		categoryType: "leisure",
		value: 0,
	},
	{
		userId: "",
		id:"5",
		name:"Debt Repayment",
		categoryType: "obligatory",
		value: 0,
	},

]