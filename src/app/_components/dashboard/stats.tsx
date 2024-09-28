import { getServerAuthSession } from 'note/server/auth';
import { api } from 'note/trpc/server';
import React from 'react';

export default async function Stats() {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  if(!userId) {
    return;
  }

  const user = await api.user.getById(userId);

  return (
  <div className="grid grid-cols-2 gap-8 lg:grid-cols-2">
      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Balance</h2>
        <p className="text-4xl h-min mt-10">{user?.financialData?.balance}</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Budget</h2>
        <p className="text-4xl h-min mt-10">{user?.financialData?.budget}</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Rank</h2>
        <p className="text-4xl h-min mt-10">1/5</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-xl font-bold">Salary</h2>
        <p className="text-4xl h-min mt-10">{user?.financialData?.salary}</p>
      </div>
    </div>
  );
}