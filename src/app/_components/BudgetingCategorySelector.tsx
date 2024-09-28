import { name } from "drizzle-orm";
import { Input } from "note/n/components/ui/input";
import { Label } from "note/n/components/ui/label";
import { Slider } from "note/n/components/ui/slider";



enum ExpenseType {
	fixed,
	obligatoryRange,
	savings,
	leisure,
}
type Category = {
	id: number,
	name: string,
	type: ExpenseType
}

export default function BudgetCategorySelector(){
	const categories: Category[] = [
		{
			id:1,
			name: "Rent",
			type: ExpenseType.fixed,
		},
		{
			id: 2,
			name: "Groceries",
			type: ExpenseType.obligatoryRange,
		},
		{
			id: 3,
			name: "Savings Account",
			type: ExpenseType.savings,
		},
		{
			id: 4,
			name: "Dinning out",
			type: ExpenseType.leisure
		},
		{
			id:5,
			name:"Debt Repayment",
			type: ExpenseType.obligatoryRange,
		},

	]
	
	const renderInputType= (category: Category) => {
		const inputSlider = (<Slider className="w-24"></Slider>)
		switch(category.type){
			case ExpenseType.fixed:
				return <Input className="w-24"></Input>;
			case ExpenseType.leisure:
					return inputSlider;
			case ExpenseType.obligatoryRange:
				return inputSlider;
			case ExpenseType.savings:
				return inputSlider;
		}
	}
	return (
		<div className="flex flex-1 justify-center items-start w-2/4 h-3/4 space-y-6 flex-col bg-white  scroll-smooth overflow-y-auto m-auto mt-1/6">
			<li key={1}>
				<Input placeholder="Monthly Salary"></Input>
			</li>
			<li key={2}>
				<Input placeholder="Debt"></Input>
			</li>
			{categories.map(category => {
				return (<li key={category.id + 2} className="flex flex-grow space-x-6">
					<Label className="text-white-600">{category.name}</Label>
					{renderInputType(category)}
				</li>)
			})}
		</div>
	)
}