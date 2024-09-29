
import { getServerAuthSession } from "note/server/auth";
import Navbar from "../_components/navbar";
import BudgetingCategorySelector, { Category } from "../_components/budgeting/BudgetingCategorySelector";
import { api } from "note/trpc/server";

export default async function Budgeting(){
	const session = await getServerAuthSession();

	if(!session){
		return (<p>Internal Error</p>)
	}
	const categories = await api.user.getCategoriesOfUser(session?.user.id);
	
	return (
		<div>
			<Navbar />
			<div className="h-min mt-8 pt-20 ml-8 mr-8">
				<BudgetingCategorySelector userId={session?.user.id} userCategories={categories}></BudgetingCategorySelector>
			</div>
		</div>
	)
}