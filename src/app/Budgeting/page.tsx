
import { getServerAuthSession } from "note/server/auth";
import Navbar from "../_components/navbar";
import BudgetingCategorySelector, { Category } from "./../_components/BudgetingCategorySelector";

export default async function Budgeting(){
	const session = await getServerAuthSession();
	return (
		<div>
			<Navbar />
			<div className="h-min mt-8 pt-20 ml-8 mr-8">
				<BudgetingCategorySelector userId={session?.user.id}></BudgetingCategorySelector>
			</div>
		</div>
	)
}