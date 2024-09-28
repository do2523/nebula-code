import React from 'react';
import Navbar from '../_components/navbar';
import Spending from '../_components/dashboard/spending';
import Transactions from '../_components/dashboard/transactions';
import Stats from '../_components/dashboard/stats';
import { getServerAuthSession } from 'note/server/auth';
import { api } from 'note/trpc/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="h-min mt-4 pt-20 ml-8 mr-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Overall Spending */}
          <div className="col-span-1 md:col-span-2">
            <Spending />
          </div>

          {/* Stats (4 mini cards) */}
          <div className="col-span-1">
            <Stats />
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