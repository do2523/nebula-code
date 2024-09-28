'use server'
export default async function submitBudgetPreferences(e: React.SyntheticEvent) {
	const formData = await e;

	const financialData = {
		monthlySalary: formData.get('monthlySalary'),
		debt: formData.get('debt'),
	} 
	
}