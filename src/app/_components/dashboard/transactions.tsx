import React from 'react';

export default function Transactions() {
  const transactions = [
    { name: 'John Doe', email: 'john@example.com', amount: '$3,340.00' },
    { name: 'Jane Smith', email: 'jane@example.com', amount: '$15,000.00' },
    { name: 'Chris Johnson', email: 'chris@example.com', amount: '$250.00' },
    { name: 'John Doe', email: 'john@example.com', amount: '$34.00' },
    { name: 'Jane Smith', email: 'jane@example.com', amount: '$151.50' },
    { name: 'Chris Johnson', email: 'chris@example.com', amount: '$2,755.40' }
  ];

  return (
    <div className="p-6 bg-[#171D18] rounded-2xl text-white">
      <h1 className="text-xl font-bold mb-4">Transaction History</h1>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex flex-col sm:flex-row justify-between p-1">
            <div>
              <span className="font-bold pr-20">{transaction.name}</span>
              <span className="hidden sm:inline text-gray-500">{transaction.email}</span>
            </div>
            <span className="font-bold">{transaction.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}