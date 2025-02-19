"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { FaEllipsisV } from "react-icons/fa";

// Register necessary chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const UserMapChart = () => {
  const data = {
    labels: ["Sun", "Sun", "Sun", "Sun", "Sun", "Sun", "Sun"],
    datasets: [
      {
        label: "Dataset 1",
        data: [60, 80, 40, 70, 60, 20, 60],
        backgroundColor: ["#FF4D4D", "#FFD700", "#FF4D4D", "#FFD700", "#FF4D4D", "#FFD700", "#FF4D4D"],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">User Map</h2>
        <FaEllipsisV className="text-gray-500 cursor-pointer" />
      </div>
      <div className="h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserMapChart;
