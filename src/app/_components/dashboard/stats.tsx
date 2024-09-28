import React from 'react';

export default function Stats() {
  return (
  // <div>
  //   <h1 className="bg-gray-500">stats</h1>
  // </div>
  <div className="grid grid-cols-2 gap-8 lg:grid-cols-2 lg:grid-cols-4">
      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-2xl font-bold">Balance</h2>
        <p className="text-4xl h-min mt-10">5.2k</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-2xl font-bold">Budget</h2>
        <p className="text-4xl h-min mt-10">1.5k</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-2xl font-bold">Rank</h2>
        <p className="text-4xl h-min mt-10">1/5</p>
      </div>

      <div className="p-6 bg-[#171D18] text-white rounded-2xl h-56 flex flex-col items-center">
        <h2 className="text-2xl font-bold">FICO</h2>
        <p className="text-4xl h-min mt-10">730</p>
      </div>
    </div>
  );
}