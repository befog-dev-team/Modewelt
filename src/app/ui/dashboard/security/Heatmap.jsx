import React from 'react';

const days = ['Sun', 'Wed', 'Sat']; // All days of the week
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weeks = 52;
const data = Array.from({ length: weeks * 7 }, () => Math.floor(Math.random() * 5)); // Random activity count (0-4)

const Heatmap = () => {
  const getColor = (count) => {
    if (count === 0) return 'bg-gray-100'; // No activity
    if (count === 1) return 'bg-gray-100'; // Low activity
    if (count === 2) return 'bg-gray-100'; // Medium activity
    if (count === 3) return 'bg-green-500'; // High activity
    return 'bg-green-700'; // Very high activity
  };

  return (
    <div className="bg-white overflow-auto p-4 flex flex-col">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        {/* Days Column */}
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          {days.map((day, index) => (
            <span key={index} className="h-6 flex items-center justify-end pr-2">
              {day}
            </span>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="flex flex-col">
          <div className="grid grid-rows-7 grid-flow-col gap-2 sm:gap-2">
            {data.map((count, index) => {
              const dayIndex = index % 7;
              const weekIndex = Math.floor(index / 7);
              const date = new Date();
              date.setDate(date.getDate() - (weeks * 7 - index));

              return (
                <div
                  key={index}
                  className={`w-1 h-1 sm:w-1 sm:h-1 md:w-1 md:h-1 lg:w-2 lg:h-2 rounded-sm ${getColor(
                    count
                  )} hover:opacity-75 transition-opacity relative group`}
                  title={`${count} activities on ${date.toLocaleDateString()}`}
                >
                  {/* Tooltip */}
                  <div className="absolute hidden group-hover:block bg-black text-white text-xs p-1 rounded-md bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    {count} activities on {date.toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Months Row */}
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            {months.map((month, index) => (
              <span key={index} className="flex-1 text-center">
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
