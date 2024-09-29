import React from 'react';
import Chart from './chart';
import { Category } from '../budgeting/BudgetingCategorySelector';
import { financialData } from 'note/server/db/schema';

interface SpendingProps {
	userCategories: Category[],
	financeData: number[],
}
export default function Spending({userCategories,financeData}: SpendingProps) {
  return (
  <div className="p-6 col-span-1 md:col-span-2 flex flex-col h-full bg-[#171D18] rounded-2xl">
    <Chart categories={userCategories} financialData={financeData}/>
  </div>
  );
}