"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const JobPostingChart = () => {
  const [filter, setFilter] = useState(false);

  // Sample Data
  const jobData = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Post",
        data: [5, 6, 7, 10, 8, 5, 8],
        backgroundColor: "#1E40AF",
      },
      {
        label: "Expired",
        data: [8, 9, 6, 4, 7, 3, 9],
        backgroundColor: "#FBBF24",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-lg h-[424px]">

      {/* Description */}
      <p className="text-sm text-gray-500 mb-3">7,560 jobs posted this week</p>

      {/* Legend */}
      <div className="flex gap-4 mb-3 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-700"></div>
          <span>Post</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-400"></div>
          <span>Expired</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <Bar
          data={jobData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default JobPostingChart;
