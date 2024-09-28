import { name } from "drizzle-orm";
import { Input } from "note/src/n/components/ui/input";
import { Label } from "note/src/n/components/ui/label";
import { Slider } from "note/src/n/components/ui/slider";

import { Button } from "src/n/components/ui/button";

import { useState } from "react";
import submitBudgetPreferences from "src/server/submitBudget";
import CreateCategory from "./createCategory";

export enum ExpenseType {
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

const DefaultCategories: Category[] = [
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
export default function BudgetCategorySelector(){
	const newCategories: Category[] = []
	const [categories,setCategories] = useState<Category[]>(DefaultCategories);
	
	
	const addCategory = (categoryName: string,categoryType:ExpenseType) => {
		
		const newCategory: Category = {
				id:10,
				name:categoryName,
				type: categoryType,
			};
			newCategories.push(newCategory);
		setCategories([
			...categories,
			newCategory,
			
		]);
	}
	const renderInputType= (category: Category) => {
		const inputSlider = (<Slider className="w-24 accent-blue-500"></Slider>)
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
		<form action={submitBudgetPreferences} className="flex flex-1 justify-center items-start w-2/4 h-3/4 space-y-6 flex-col bg-white  scroll-smooth overflow-y-auto m-auto mt-1/6">
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
			<CreateCategory  onClickParent={addCategory}></CreateCategory>
			<Button className="bg-blue-600"  type="submit">Submit</Button>
		</form>
	)
}