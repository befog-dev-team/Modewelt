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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function Home({ chartdata }) {
  console.log("chartdata", chartdata);

  const data = {
    labels: chartdata.labels, // Use the labels from your data
    datasets: [
      {
        label: "Users",
        data: chartdata.userCounts, // Use the userCounts from your data
        fill: true,
        backgroundColor: "rgba(156, 39, 176, 0.2)", // Light purple background
        borderColor: "rgba(156, 39, 176, 1)", // Purple border
        tension: 0.4,
        pointBackgroundColor: "rgba(156, 39, 176, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.toLocaleString()} user`;
          },
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
      event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
    },
  };

  return (
    <div className="min-h-fit bg-[#f3f2f7] p-4 sm:p-6">
      {/* Chart Container */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-lg font-semibold text-gray-700">Users</h2>
          {/* Dropdown */}
          {/* <select className="mt-3 sm:mt-0 text-gray-600 bg-gray-100 p-2 rounded border">
            <option>October</option>
            <option>September</option>
            <option>August</option>
          </select> */}
        </div>

        {/* Chart */}
        <div className="mt-4 h-80 min-h-[400px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}