import React from 'react';
import Navbar from '../_components/navbar';
import Spending from '../_components/dashboard/spending';
import Transactions from '../_components/dashboard/transactions';
import Stats from '../_components/dashboard/stats';
import { getServerAuthSession } from 'note/server/auth';
import { redirect } from 'next/navigation';
import { DefaultCategories } from '../_components/dashboard/defaultCategories';
import { Category } from '../_components/budgeting/BudgetingCategorySelector';
import { api } from 'note/trpc/server';
import { financialData } from 'note/server/db/schema';



export default async function Dashboard() {
	const session = await getServerAuthSession();
	
	if(!session){
		return null;
	}
	const categories = await api.user.getCategoriesOfUser(session?.user.id);
	const financialData:number[] = await api.user.getFinancialData(session.user.id);
	if(categories.length == 0){
		const defaultCategories: Category[] = DefaultCategories.map(defCategory => {
			const newDefCat:Category = {
				id:crypto.randomUUID(),
				userId: session.user.id,
				name: defCategory.name,
				categoryType: defCategory.categoryType,
				value: 0,
			}
			return newDefCat; 
		});
		await api.user.updateCategories(defaultCategories); 
	}
	if(financialData == undefined){
		return null;
	}
	
  return (
    <div>
      <Navbar />
      <div className="h-min mt-4 pt-1 ml-8 mr-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14">
          {/* Overall Spending */}
          <div className="col-span-1 md:col-span-2">
            <Spending userCategories={categories} financeData={financialData} />
          </div>

          {/* Stats (4 mini cards) */}
          <div className="col-span-1">
            <Stats userId={session.user.id}/>
          </div>

          {/* Transaction History */}
          <div className="col-span-1 md:col-span-3">
            <Transactions />
          </div>
        </div>
      </div>
    </div>
  );
}