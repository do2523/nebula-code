import { console } from "inspector";
import { chartBar } from "./chart";
export default function calculateBudget(bars: chartBar[],strategy: string,salary: number)
{
	let weights: number[];
	if(strategy === 'default'){
		weights = [70,20,10,];
	}
	const fixedAmount = bars.filter(bar => bar.type != 'fixed')
						.reduce((partialSum: number,add: chartBar) => partialSum + add.value,0);
	console.log(fixedAmount);
	const moneyLeft = salary - fixedAmount;

}