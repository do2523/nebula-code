'use server'

import { api } from "note/trpc/server";
import { getServerAuthSession } from "./auth";

export default async function submitBudgetPreferences(e: React.SyntheticEvent) {
	const session = await getServerAuthSession();
	if(!session) return;

	const formData = await e;

	const financialData = {
		monthlySalary: formData.get('monthlySalary'),
		debt: formData.get('debt'),
	} 

	const user = await api.user.getById(session?.user.id);
	if(!user?.financialData) {
		api.financialData.createForUser({ userId: session.user.id });
	}
	
	api.user.updateSalary({ userId: session.user.id, salary: financialData.monthlySalary });
	api.user.updateDebt({ userId: session.user.id, debt: financialData.debt });
}