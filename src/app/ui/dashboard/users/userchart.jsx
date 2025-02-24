import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function Home({ chartdata }) {
  const data = useMemo(() => ({
    labels: chartdata?.labels || [],
    datasets: [
      {
        label: "Users",
        data: chartdata?.userCounts || [],
        fill: true,
        backgroundColor: "rgba(156, 39, 176, 0.2)", // Light purple background
        borderColor: "rgba(156, 39, 176, 1)", // Purple border
        tension: 0.4,
        pointBackgroundColor: "rgba(156, 39, 176, 1)",
      },
    ],
  }), [chartdata]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toLocaleString()} user`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement.length ? "pointer" : "default";
    },
  }), []);

  return (
    <div className="min-h-fit bg-[#f3f2f7] p-4 sm:p-6">
      {/* Chart Container */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-lg font-semibold text-gray-700">Users</h2>
        </div>

        {/* Chart */}
        <div className="mt-4 h-80 min-h-[400px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
