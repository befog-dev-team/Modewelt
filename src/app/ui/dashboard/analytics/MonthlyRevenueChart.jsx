"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyRevenueChart = () => {
  const data = {
    labels: ["2016", "2017", "2018", "2019", "2020", "2021"],
    datasets: [
      {
        label: "Revenue",
        data: [10000, 18000, 25000, 22000, 19000, 35000],
        borderColor: "#14B8A6",
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        pointBorderColor: "#EC4899",
        pointBackgroundColor: "#FFFFFF",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { callback: (value) => `$${value.toLocaleString()}` },
      },
    },
  };

  return (
    <div className="bg-white mt-12 p-4 rounded-2xl shadow-lg w-full max-w-2xl mx-auto h-[424px]">

      {/* Legend */}
      <div className="flex items-center gap-2 text-sm mb-3">
        <div className="w-4 h-1 bg-pink-500"></div>
        <span>Revenue</span>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
