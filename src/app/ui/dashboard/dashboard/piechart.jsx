"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartSection = () => {
  const [showValue, setShowValue] = useState(true);

  const data = [
    {
      label: "Total User",
      value: 81,
      color: "#F87171", // Red
    },
    {
      label: "Active",
      value: 22,
      color: "#34D399", // Green
    },
    {
      label: "Inactive",
      value: 62,
      color: "#C084FC", // Purple
    },
  ];

  const generateChartData = (value, color) => ({
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#F3F4F6"],
        hoverBackgroundColor: [color, "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  });

  const chartOptions = (value) => ({
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    animation: {
      animateScale: true, // Adds smooth animation
      animateRotate: true,
    },
    cutout: "65%", // Makes the chart segments thicker
    responsive: true,
    maintainAspectRatio: true,
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Pie Chart</h2>
        <label className="flex items-center text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={showValue}
            onChange={() => setShowValue(!showValue)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="ml-2">Show Value</span>
        </label>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center rounded-full"
          >
            {/* Doughnut Chart */}
            <div className="relative w-40 h-40">
              <Doughnut
                data={generateChartData(item.value, item.color)}
                options={chartOptions(item.value)}
              />
              {/* Center Value */}
              {showValue && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xl font-bold text-gray-800">{item.value}%</p>
                </div>
              )}
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-600">{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartSection;
