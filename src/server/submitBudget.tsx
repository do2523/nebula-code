'use server'

import { Category } from "note/app/_components/BudgetingCategorySelector";

export default async function submitBudgetPreferences(e: React.SyntheticEvent,categories: Category[]) {
	const formData = await e;

	const financialData = {
		monthlySalary: formData.get('monthlySalary'),
		debt: formData.get('debt'),
	} 
	
}