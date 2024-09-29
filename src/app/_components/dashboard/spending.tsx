import React from 'react';
import Chart from './chart';
import { Category } from '../budgeting/BudgetingCategorySelector';

interface SpendingProps {
	userCategories: Category[],
}
export default function Spending({userCategories}: SpendingProps) {
  return (
  <div className="p-6 col-span-1 md:col-span-2 flex flex-col h-full bg-[#171D18] rounded-2xl">
    <Chart categories={userCategories}/>
  </div>
  );
}