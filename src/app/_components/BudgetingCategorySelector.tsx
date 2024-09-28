"use client"
import { Input } from "src/n/components/ui/input";
import CategoryInput from "./CategoryInput"
import { Button } from "src/n/components/ui/button";

import { useState } from "react";

import CreateCategory from "./createCategory";
import submitBudgetPreferences from "note/server/submitBudget";



export enum ExpenseType {
	fixed,
	obligatoryRange,
	savings,
	leisure,
}
export type Category = {
	id: string,
	name: string,
	type: ExpenseType
	value: number,
}

const DefaultCategories: Category[] = [
	{
		id:"1",
		name: "Rent",
		type: ExpenseType.fixed,
		value: 0,
	},
	{
		id: "2",
		name: "Groceries",
		type: ExpenseType.obligatoryRange,
		value: 0,
	},
	{
		id: "3",
		name: "Savings Account",
		type: ExpenseType.savings,
		value: 0,
	},
	{
		id: "4",
		name: "Dinning out",
		type: ExpenseType.leisure,
		value: 0,
	},
	{
		id:"5",
		name:"Debt Repayment",
		type: ExpenseType.obligatoryRange,
		value: 0,
	},

]
interface BudgetCategorySelectorProps {
	userId: string | undefined,
}
export default function BudgetCategorySelector({userId}: BudgetCategorySelectorProps){
	const newCategories: Category[] = [];
	const [categories,setCategories] = useState<Category[]>(DefaultCategories);
	
	const handleSubmit = (e: FormData) => {
		 submitBudgetPreferences(e,categories);
	}
	const addCategory = (categoryName: string,categoryType:ExpenseType) => {
		
		const newCategory: Category = {
				id:"10",
				name:categoryName,
				type: categoryType,
				value: 0,
			};
			newCategories.push(newCategory);
		setCategories([
			...categories,
			newCategory,
			
		]);
	}
	const handleValueChange = (key: string,newValue: number | undefined) => {
		if(undefined == newValue)
			return;
		console.log(newValue);
		const newCategories = categories.map(category => {
			if(category.id == key){
				console.log(category.id);				
				category.value = newValue;
				return category;
			}
			else{
				return category;
			}
		})
		console.log(categories);
		setCategories(newCategories);
	}
	
	return (
		<form method="post" action={handleSubmit} className="flex flex-1 justify-center items-start w-2/4 h-3/4 space-y-6 flex-col bg-white  scroll-smooth overflow-y-auto m-auto mt-1/6">
			<li key={1}>
				<Input placeholder="Monthly Salary" name="monthlySalary"></Input>
			</li>
			<li key={2}>
				<Input name="debt" placeholder="Debt"></Input>
			</li>
			{categories.map(category => {
				return <CategoryInput category={category} key={category.id} handleValueChange={handleValueChange}></CategoryInput>
			})}
			<CreateCategory  onClickParent={addCategory}></CreateCategory>
			<Button className="bg-blue-600"  type="submit">Submit</Button>
		</form>
	)
}