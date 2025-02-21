"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RevenueChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2020",
        data: [10, 15, 25, 30, 35, 38, 32, 29, 26, 28, 30, 31],
        borderColor: "#8251a5",
        backgroundColor: "rgba(130, 81, 165, 0.2)",
        pointBackgroundColor: "#8251a5",
      },
      {
        label: "2021",
        data: [20, 30, 15, 35, 28, 25, 38, 34, 27, 32, 33, 40],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4CAF50",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `$ ${context.raw},00`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}k`,
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Total Revenue</h2>
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
