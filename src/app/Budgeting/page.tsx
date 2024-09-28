
import Navbar from "../_components/navbar";
import BudgetingCategorySelector from "./../_components/BudgetingCategorySelector";

export default function Budgeting(){
	
	return (
		<div>
			<Navbar />
			<div className="h-min mt-8 pt-20 ml-8 mr-8">
				<BudgetingCategorySelector></BudgetingCategorySelector>
			</div>
		</div>
	)
}