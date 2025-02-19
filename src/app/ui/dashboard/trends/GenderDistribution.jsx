import React from "react";

const GenderDistribution = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-pink-50 rounded-lg shadow-md w-full max-w-4xl">
      
      {/* Donut Chart */}
      <div className="relative w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 42 42" className="rotate-[-90deg]">
          <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#1D4ED8" strokeWidth="3" strokeDasharray="40 60" strokeDashoffset="0" />
          <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#B91C1C" strokeWidth="3" strokeDasharray="60 40" strokeDashoffset="-40" />
        </svg>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between w-full mt-4">
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border">
          <span className="font-bold">Female</span>
          <span className="text-green-600 bg-green-100 px-2 py-1 rounded mt-1">+2.3%</span>
          <span className="text-gray-500 text-sm mt-1">VS Previous Month</span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border">
          <span className="font-bold">Male</span>
          <span className="text-green-600 bg-green-100 px-2 py-1 rounded mt-1">+2.3%</span>
          <span className="text-gray-500 text-sm mt-1">VS Previous Month</span>
        </div>
      </div>
    </div>
  );
};

export default GenderDistribution;
