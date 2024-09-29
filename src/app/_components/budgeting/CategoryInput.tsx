
import { Category,ExpenseType } from "./BudgetingCategorySelector"
import { Label } from "note/n/components/ui/label"
import { Slider } from "note/n/components/ui/slider"
import { Input } from "note/n/components/ui/input"
import { useState } from "react"

interface CategoryInputProps {
	category: Category,
	handleValueChange: (key: string,newValue: number | undefined) => void,
}
export default function CategoryInput({category,handleValueChange} : CategoryInputProps){


	const renderInputType= (category: Category) => {
		const inputSlider = (<Slider className="w-24 accent-blue-500" max={100} min={0} onValueChange={handleChangeCategoryValue}></Slider>)
		switch(category.categoryType){
			case 'fixed':
				return <Input className="w-24"></Input>;
			case 'leisure':
					return inputSlider;
			case 'obligatory':
				return inputSlider;
			case 'savings':
				return inputSlider;
			
		}
	}
	const handleChangeCategoryValue = (number: number[]) => {
		if(number == undefined){
			return;
		}
		handleValueChange(category.id,number[0]);
		
	}
	return (
		<li key={category.id + 2} className="flex flex-grow space-x-6">
				<Label className="text-white-600">{category.name}</Label>
					{renderInputType(category)}
				</li>
	)
}