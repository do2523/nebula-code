'use server'

import { api } from "note/trpc/server";
import { getServerAuthSession } from "./auth";
import { Category } from "note/app/_components/budgeting/BudgetingCategorySelector";
import { convertToZodCategories } from "./api/routers/user";

export default async function submitBudgetPreferences(e: FormData,categories: Category[])  {

	
	api.user.updateCategories(convertToZodCategories(categories));
	const session = await getServerAuthSession();
	if(!session) return;

	const formData = {
		monthlySalary: e.get('monthlySalary')?.toString(),
		debt: e.get('debt')?.toString(),
	};
	if(formData.monthlySalary == undefined || formData.debt == undefined){
		console.log('here');
		return;
	}
	const financialData = {
		monthlySalary: parseInt(formData.monthlySalary),
		debt: parseInt(formData.debt),
	}; 

	const user = await api.user.getById(session?.user.id);
	if(!user?.financialData) {
		await api.financialData.createForUser({ userId: session.user.id });
	}
	api.user.updateCategories(categories);
	
	await api.user.updateSalary({ userId: session.user.id, salary: financialData.monthlySalary });
	await api.user.updateDebt({ userId: session.user.id, debt: financialData.debt });
}