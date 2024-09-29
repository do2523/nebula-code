"use client"
import { Input } from "src/n/components/ui/input";
import CategoryInput from "./CategoryInput"
import { Button } from "src/n/components/ui/button";
import { useState } from "react";
import CreateCategory from "./createCategory";
import submitBudgetPreferences from "note/server/submitBudget";
import {api}  from "note/trpc/server";
import {convertToZodCategories,CategoryZod} from "src/server/api/routers/user"
import {z} from "zod"

export enum ExpenseType {
	fixed = 'fixed',
	obligatory = 'obligatory',
	savings = 'savings',
	leisure = 'leisure',
}
export type Category = z.infer<typeof CategoryZod>


interface BudgetCategorySelectorProps {
	userId: string,
	userCategories: Category[],
}
export default function BudgetCategorySelector({userId,userCategories}: BudgetCategorySelectorProps){
	const [categories,setCategories] = useState<Category[]>(userCategories);
	console.log(categories);
	
	const handleSubmit = (e: FormData) => {
		 submitBudgetPreferences(e,categories);
	}
	const addCategory = (categoryName: string,categoryType: string) => {
		
		const newCategory: Category = {

				id: crypto.randomUUID(),
				userId: userId,
				name:categoryName,
				categoryType: categoryType,
				value: 0,
			};
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