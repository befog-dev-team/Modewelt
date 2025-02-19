import React from "react";

const DonutChart = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Donut Chart */}
      <svg width="150" height="150" viewBox="0 0 42 42" className="rotate-[-90deg]">
        <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#4F46E5" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="0" />
        <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#2DD4BF" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="-25" />
        <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#FBBF24" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="-50" />
        <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#F472B6" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="-75" />
      </svg>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
          <span className="text-gray-600">Sector Name</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-teal-400 rounded-full mr-2"></span>
          <span className="text-gray-600">Sector Name</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
          <span className="text-gray-600">Sector Name</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          <span className="text-gray-600">Sector Name</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;