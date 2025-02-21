"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  CategoryScale,
} from "chart.js";
// import { FaDownload } from "react-icons/fa";

ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, CategoryScale);

const GrowthChart = ({ data }) => {

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  // Transform the data
  const chartData = {
    labels: data.map((item) => formatDate(item.date)), // Format date labels
    datasets: [
      {
        label: "Users",
        data: data.map((item) => item.count), // Extract counts for data
        borderColor: "#A78BFA",
        backgroundColor: "rgba(167, 139, 250, 0.2)",
        pointBackgroundColor: "#A78BFA",
        pointHoverBackgroundColor: "#A78BFA",
        tension: 0.4, // Smooth curve
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => `Date: ${context[0].label}`,
          label: (context) => `${context.raw} ${context.raw > 1 ? 'Users' : 'User'}`,
        },
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#555",
        borderColor: "#ddd",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280", font: { size: 12 } },
      },
      y: {
        grid: { color: "#F3F4F6" },
        ticks: { color: "#6B7280", font: { size: 12 } },
      },
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">User Growth</h2>
          <p className="text-sm text-gray-500">New users registered over time</p>
        </div>
        {/* <button className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200">
          <FaDownload className="mr-2" />
          Save Report
        </button> */}
      </div>

      {/* Chart */}
      <div className="relative h-64 w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GrowthChart;