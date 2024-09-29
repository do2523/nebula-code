"use client"

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
}
export type chartBar = {
	name: string,
	type: string,
	value: number,
}
export default function Chart({categories}: ChartProps) {
	const chartData = categories.map(category => {
		const element: chartBar = {
			name: category.name,
			type: category.categoryType,
			value: category.value
		};
		return element;
	})
	console.log(chartData);
	const bars = chartData.map(bar => {
		let color:string= "#000000";
		switch(bar.type){
			case 'fixed':
				color = "#ffffff";
				break
			case 'obligatory':
				color =  "#27ff00";
				break
			case 'savings':
				color = "#ffff00";
				break
			case 'leisure':
				color = "#ff0000"
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
          <BarChart accessibilityLayer data={chartData}>
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
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
