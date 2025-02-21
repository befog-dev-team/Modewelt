import { Clipboard } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [1000, 1500, 1200, 1700, 1900, 2300],
      backgroundColor: "rgba(156, 39, 176, 0.2)",
      borderColor: "rgba(156, 39, 176, 1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

export default function DashboardCards() {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl">
        <Line data={chartData} options={{ maintainAspectRatio: false }} height={150} />
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-gray-600">Net spend this month</p>
            <p className="text-2xl font-bold">$2950</p>
          </div>
          <div>
            <p className="text-gray-600">Net income this month</p>
            <p className="text-2xl font-bold">$12950</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl">
        <h3 className="text-purple-600 font-semibold mb-2">Monthly Progress</h3>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-green-400 h-4 rounded-full"
            style={{ width: "33%" }}
          ></div>
        </div>
        <p className="mt-2 text-lg font-semibold">33%</p>
      </div>
    </div>
  );
}
