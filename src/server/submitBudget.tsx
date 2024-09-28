'use server'

import { api } from "note/trpc/server";
import { getServerAuthSession } from "./auth";
import { Category } from "note/app/_components/BudgetingCategorySelector";

export default async function submitBudgetPreferences(e: React.SyntheticEvent,categories: Category[]) : Promise<void | undefined {
	const session = await getServerAuthSession();
	if(!session) return;

	const formData = await e;

	const financialData = {
		monthlySalary: parseInt(formData.get('monthlySalary')),
		debt: parseInt(formData.get('debt')),
	} 

	const user = await api.user.getById(session?.user.id);
	if(!user?.financialData) {
		api.financialData.createForUser({ userId: session.user.id });
	}
	
	api.user.updateSalary({ userId: session.user.id, salary: financialData.monthlySalary });
	api.user.updateDebt({ userId: session.user.id, debt: financialData.debt });
}