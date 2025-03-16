"use client";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const totalDays = 365;

const Heatmap = ({ activities }) => {
  const processActivities = (activities) => {
    const activityMap = activities.reduce((acc, activity) => {
      if (!activity.date) return acc;
      const date = new Date(activity.date).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return activityMap;
  };

  const generateDataPoints = (activityMap) => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1); // Jan 1st of the current year

    const dataPoints = [];
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];

      dataPoints.push({
        date,
        count: activityMap[formattedDate] || 0,
      });
    }

    return dataPoints;
  };

  const getColor = (count) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-green-200";
    if (count === 2) return "bg-green-400";
    if (count === 3) return "bg-green-600";
    return "bg-green-800";
  };

  const activityMap = processActivities(activities);
  const dataPoints = generateDataPoints(activityMap);

  const firstDayIndex = dataPoints[0].date.getDay();
  const emptyCells = Array.from({ length: firstDayIndex }).map((_, index) => ({
    date: null,
    count: null,
  }));

  const gridData = [...emptyCells, ...dataPoints];

  // Calculate the number of weeks
  const numberOfWeeks = Math.ceil(gridData.length / 7);

  // Generate month labels
  const monthLabels = [];
  for (let i = 0; i < numberOfWeeks; i++) {
    const weekStartDate = gridData[i * 7].date;
    if (weekStartDate) {
      const month = months[weekStartDate.getMonth()];
      if (!monthLabels.includes(month)) {
        monthLabels.push(month);
      } else {
        monthLabels.push("");
      }
    } else {
      monthLabels.push("");
    }
  }

  return (
    <div className="bg-white p-4 flex flex-col items-center w-full">
      <div className="grid grid-cols-[auto_1fr] gap-2 w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          {days.map((day, index) => (
            <span key={index} className="h-4 flex items-center justify-end pr-2">
              {day}
            </span>
          ))}
        </div>

        <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {gridData.map(({ date, count }, index) => (
              <div key={index} className="relative group">
                <div
                  className={`w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 rounded-sm ${date ? getColor(count) : "bg-transparent"
                    } hover:opacity-75 transition-opacity`}
                />
                {date && (
                  <div className="absolute w-[88px] overflow-x-auto no-scrollbar top-full mt-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {count} activities on {date.toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-500">
            {monthLabels.map((month, index) => (
              <span key={index} className="flex-1 text-center">
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2 text-sm text-gray-500 w-full max-w-4xl mx-auto">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((count) => (
          <div key={count} className={`w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 rounded-sm ${getColor(count)}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;