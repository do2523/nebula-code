"use client"
import { financialData } from "note/server/db/schema"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"
import { Category } from "../budgeting/BudgetingCategorySelector"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "note/n/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "note/n/components/chart"
import calculateBudget from "./calculateBudget"
export const description = "A multiple bar chart"



const chartConfig = {
  'fixed': {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  'obligatory': {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface ChartProps {
	categories: Category[],
	financialData: number[],
}
export type chartBar = {
	name: string,
	type: string,
	value: number,
}
export default function Chart({categories,financialData}: ChartProps) {
	const chartData = categories.map(category => {
		const element: chartBar = {
			name: category.name,
			type: category.categoryType,
			value: category.value
		};
		return element;
	})
	if(financialData[0] == undefined)
		return null;
	const adjustedChartData = calculateBudget(chartData,'default',financialData[0]);
	const bars = chartData.map(bar => {
		let color:string= "#f5ee27";
		switch(bar.type){
			case 'fixed':
				color = "#4600d4";
				break
			case 'obligatory':
				color =  "#24e6ed";
				break
			case 'savings':
				color = "#22f229";
				break
			case 'leisure':
				color = "#7cf222";
				break;
		}
		return <Cell fill={color}>
		</Cell>
	});
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending By Category</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={adjustedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
			<Bar dataKey="value">
				{
					bars
				}
			</Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total spending by category
        </div>
      </CardFooter>
    </Card>
  )
}
