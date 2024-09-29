"use client"
import { Input } from "src/n/components/ui/input";
import CategoryInput from "./CategoryInput"
import { Button } from "src/n/components/ui/button";
import { useState } from "react";
import CreateCategory from "./createCategory";
import submitBudgetPreferences from "note/server/submitBudget";
import { api } from "note/trpc/server";
import { CategoryZod } from "src/server/api/routers/user"
import { z } from "zod"


export type Category = z.infer<typeof CategoryZod>


interface BudgetCategorySelectorProps {
	userId: string,
	userCategories: Category[],
}
export default function BudgetCategorySelector({ userId, userCategories }: BudgetCategorySelectorProps) {
	const [categories, setCategories] = useState<Category[]>(userCategories);
	console.log(categories);

	const handleSubmit = (e: FormData) => {
		submitBudgetPreferences(e, categories);
	}
	const addCategory = (categoryName: string, categoryType: string) => {
		if(categories.find(e => e.name == categoryName))
			return;
		const newCategory: Category = {

			id: crypto.randomUUID(),
			userId: userId,
			name: categoryName,
			categoryType: categoryType,
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
			<ul className="list-none mb-6">
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
				<Button className="bg-blue-600" type="submit">Submit</Button>
			</form>
		</>
	)
}


// return (
// 	<form method="post" action={handleSubmit} className="flex flex-1 justify-center items-start w-2/4 h-3/4 space-y-6 flex-col bg-black  scroll-smooth overflow-y-auto m-auto mt-1/6">
// 		<li key={1}>
// 			<Input placeholder="Enter your Monthly Salary" name="monthlySalary"></Input>
// 		</li>
// 		<li key={2}>
// 			<Input name="debt" placeholder="Enter your Debt"></Input>
// 		</li>
// 		{categories.map(category => {
// 			return <CategoryInput category={category} key={category.id} handleValueChange={handleValueChange}></CategoryInput>
// 		})}
// 		<CreateCategory onClickParent={addCategory}></CreateCategory>
// 		<Button className="bg-blue-600" type="submit">Submit</Button>
// 	</form>
// )