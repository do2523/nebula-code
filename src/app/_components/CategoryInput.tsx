
import { Category,ExpenseType } from "./BudgetingCategorySelector"
import { Label } from "note/n/components/ui/label"
import { Slider } from "note/n/components/ui/slider"
import { Input } from "note/n/components/ui/input"
import { useState } from "react"

interface CategoryInputProps {
	category: Category,
	key: string,
}
export default function CategoryInput({category,key} : CategoryInputProps){
	const [categoryValue,setCategoryValue] = useState(0);

	//const handleChangeCategoryValue = () => {

	//}
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
	const handleChangeCategoryValue = () => {

	}
	return (
		<li key={category.id + 2} className="flex flex-grow space-x-6" onChange={handleChangeCategoryValue}>
				<Label className="text-white-600">{category.name}</Label>
					{renderInputType(category)}
				</li>
	)
}