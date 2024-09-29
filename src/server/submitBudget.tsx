'use server'

import { api } from "note/trpc/server";
import { getServerAuthSession } from "./auth";
import { Category } from "note/app/_components/budgeting/BudgetingCategorySelector";
import { convertToZodCategories } from "./api/routers/user";

export default async function submitBudgetPreferences(e: FormData,categories: Category[])  {

	api.user.updateCategories(convertToZodCategories(categories));
	const session = await getServerAuthSession();
	if(!session) return;

	const formData = e as typeof e &{
		monthlySalary: {value: string},
		debt: {value: string},
	};

	const financialData = {
		monthlySalary: parseInt(formData.monthlySalary.value),
		debt: parseInt(formData.debt.value),
	}; 

	const user = await api.user.getById(session?.user.id);
	if(!user?.financialData) {
		await api.financialData.createForUser({ userId: session.user.id });
	}
	
	await api.user.updateSalary({ userId: session.user.id, salary: financialData.monthlySalary });
	await api.user.updateDebt({ userId: session.user.id, debt: financialData.debt });
}