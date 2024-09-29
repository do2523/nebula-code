import { chartBar } from "./chart";
export default function calculateBudget(bars: chartBar[],strategy: string,salary: number)
{

	let weights: number[] = [1,1,1];
	if(strategy === 'default'){
		weights = [70,20,10,];
	}
	const fixedAmount = bars.filter(bar => bar.type != 'fixed')
						.reduce((partialSum: number,add: chartBar) => partialSum + add.value,0);


	
	const moneyLeft = salary - fixedAmount;
	console.log(moneyLeft);
	const savingMoney = moneyLeft * ( (weights[2] as number) / 100);
	const LeisureMoney = moneyLeft * (weights[1] as number) / 100; 
	const ObligatoryMoney = moneyLeft * (weights[0] as number) / 100;
	
	console.log(savingMoney + LeisureMoney + ObligatoryMoney);

	const totalSavings = bars.filter(bar => bar.type == 'savings')
	.reduce((partialSum: number,add: chartBar) => partialSum + add.value,0);

	const totalLeisure = bars.filter(bar => bar.type == 'leisure')
	.reduce((partialSum: number,add: chartBar) => partialSum + add.value,0);

	const totalObligatory = bars.filter(bar => bar.type == 'obligatory')
	.reduce((partialSum: number,add: chartBar) => partialSum + add.value,0);

	
	const adjustedBars =  bars.filter(bar => bar.value != 0).map(bar => {
		console.log(bar.type,savingMoney * (bar.value / totalObligatory),bar.value,ObligatoryMoney);
		switch(bar.type){
			case 'fixed':
				break;
			case 'savings':
				bar.value = Number((savingMoney * (bar.value / totalSavings )).toFixed(0));
				break;
			case 'leisure':
				bar.value = Number(((LeisureMoney * ( bar.value / totalLeisure))).toFixed(0));
				break;
			case 'obligatory':
				bar.value = Number((ObligatoryMoney * (bar.value / totalObligatory)).toFixed(0));
				break;
		}
	
		return bar;
	});
	const getTypeValue = (type: string): number => {
		switch(type){
			case 'fixed':
				return 0;
			case 'savings':
				return 3;
			case 'leisure':
				return 2;
			case 'obligatory':
				return 1;
		}
		return -1;
	}
	
	const sortedBars = (adjustedBars.sort((bar1: chartBar,bar2: chartBar)=> getTypeValue(bar1.type) - getTypeValue(bar2.type)));
	return sortedBars;
}