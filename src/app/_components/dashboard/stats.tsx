import { getServerAuthSession } from 'note/server/auth';
import { api } from 'note/trpc/server';
import React from 'react';

interface StatsProp {
	userId: string,
	
}
export default async function Stats({userId}: StatsProp) {

  if(!userId) {
    return;
  }

  const user = await api.user.getById(userId);

  return (
  <div className="grid grid-cols-2 gap-8 lg:grid-cols-2">
      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Date</h2>
        <p className="text-2xl h-min mt-12">9/29/24</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Balance</h2>
        <p className="text-4xl h-min mt-10">{user?.financialData ? user?.financialData?.balance : 0}</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Budget</h2>
        <p className="text-4xl h-min mt-10">{user?.financialData ? user?.financialData?.budget : 0}</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Rank</h2>
        <p className="text-4xl h-min mt-10">1/5</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Salary</h2>
        <p className="text-4xl h-min mt-10">{user?.financialData ? user?.financialData?.salary : 0}</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">FICO</h2>
        <p className="text-4xl h-min mt-10">750</p>
      </div>
    </div>
  );
}