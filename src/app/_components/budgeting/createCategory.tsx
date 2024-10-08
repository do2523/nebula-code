import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
  } from "src/n/components/ui/dropdown-menu";
  import {Input} from "src/n/components/ui/input";
  import { useState } from "react";
  import { Button } from "src/n/components/ui/button";

interface onClickCreateCategory { onClickParent: (categoryName: string,categoryType: string) => void};

export default function CreateCategory({onClickParent}: onClickCreateCategory){
	const [position, setPosition] = useState("Select");
	const [categoryName,setCategoryName] = useState("");

	const categoryNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCategoryName(event.target.value);
	}
	const onClick = () => {
		if(categoryName === ""){
			return;
		}
		onClickParent(categoryName,position);
	}
	return (
		<div className="flex">
			<Input placeholder="New Category" id="createCategoryName" onChange={categoryNameOnChange}></Input>
			<DropdownMenu>
      			<DropdownMenuTrigger asChild>
        		<Button variant="outline">{position}</Button>
     			</DropdownMenuTrigger>
      			<DropdownMenuContent className="w-56">
        		<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
       				<DropdownMenuSeparator />
        			<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          				<DropdownMenuRadioItem value="Fixed">Fixed</DropdownMenuRadioItem>
          				<DropdownMenuRadioItem value="Obligatory">Obligatory</DropdownMenuRadioItem>
          				<DropdownMenuRadioItem value="Leisure">Leisure</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="Savings">Savings</DropdownMenuRadioItem>
        		</DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
			<Button onClick={onClick}>Create Category</Button>
			</div>
	)
}