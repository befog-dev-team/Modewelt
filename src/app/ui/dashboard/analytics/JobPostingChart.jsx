"use client";

import { useQuery } from "@tanstack/react-query";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobPostingChart = ({ jobStats }) => {
  const jobData = {
    labels: jobStats?.map((item) => item.day) || ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      { label: "Post", data: jobStats?.map((item) => item.posted) || [], backgroundColor: "#1E40AF" },
      { label: "Expired", data: jobStats?.map((item) => item.expired) || [], backgroundColor: "#FBBF24" },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-lg h-[424px]">
      <p className="text-sm text-gray-500 mb-3">Weekly Job Stats</p>

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
        <Bar data={jobData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default JobPostingChart;
