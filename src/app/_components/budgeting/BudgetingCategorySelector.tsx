"use client"
import { Input } from "src/n/components/ui/input";
import CategoryInput from "./CategoryInput"
import { Button } from "src/n/components/ui/button";
import { useState } from "react";
import CreateCategory from "./createCategory";
import submitBudgetPreferences from "note/server/submitBudget";
import type { CategoryZod } from "src/server/api/routers/user";
import type { z } from "zod";


export type Category = z.infer<typeof CategoryZod>


interface BudgetCategorySelectorProps {
	userId: string,
	userCategories: Category[],
}
export default function BudgetCategorySelector({ userId, userCategories }: BudgetCategorySelectorProps) {
	const [categories, setCategories] = useState<Category[]>(userCategories);
	console.log(categories);

	const handleSubmit = (e: FormData) => {
		void submitBudgetPreferences(e, categories);
	}
	const addCategory = (categoryName: string, categoryType: string) => {
		if(categories.find(e => e.name == categoryName))
			return;
		const newCategory: Category = {

			id: crypto.randomUUID(),
			userId: userId,
			name: categoryName,
			type: categoryType,
			value: 0,
		};
		setCategories([
			...categories,
			newCategory,

		]);
	}
	const handleValueChange = (key: string, newValue: number | undefined) => {
		if (undefined == newValue)
			return;
		console.log(newValue);
		const newCategories = categories.map(category => {
			if (category.id == key) {
				console.log(category.id);
				category.value = newValue;
				return category;
			}
			else {
				return category;
			}
		})
		setCategories(newCategories);
	}

	return (
		<>
			<h1 className="text-3xl text-white font-bold text-center mb-8">Budget Planner</h1>
			<form 
				method="post" 
				action={handleSubmit} 
				className="
				flex flex-col items-center justify-center w-full bg-black rounded-lg shadow-lg mb-10
				">
			<ul className="list-none mb-10">
				<li key={1}>
					<Input placeholder="Enter your Monthly Salary" name="monthlySalary" className="mb-10 h-12 text-lg md:text-xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-300 p-8"></Input>
				</li>
				<li key={2}>
					<Input name="debt" placeholder="Enter your Debt" className="mb-10 h-12 text-lg md:text-xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-300 p-8"></Input>
				</li>
				{categories.map(category => {
					return <CategoryInput category={category} key={category.id} handleValueChange={handleValueChange}></CategoryInput>
				})}
			</ul>
				<CreateCategory onClickParent={addCategory}></CreateCategory>
				<Button className="bg-green-700 hover:bg-green-800 text-white text-lg  font-bold px-4 py-2 rounded transition duration-300 mt-10" type="submit">Submit</Button>
			</form>
		</>
	)
}
