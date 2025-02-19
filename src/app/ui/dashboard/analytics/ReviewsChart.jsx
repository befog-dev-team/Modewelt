'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Last Month',
      data: [30, 45, 28, 20, 35, 40, 42, 38, 36, 37, 39, 45],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'This Month',
      data: [40, 42, 38, 45, 50, 48, 47, 45, 42, 44, 46, 55],
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#333',
      },
    },
  },
};

export default function ReviewsChart() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          <span>Last Month</span>
        </div>
        <span>3,004</span>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span>This Month</span>
        </div>
        <span>4,504</span>
      </div>
    </div>
  );
}
