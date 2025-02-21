'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Calendar } from 'lucide-react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobStatistics = () => {
  const [date, setDate] = useState('18/12/2024');

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [
      {
        label: 'Job Stats',
        data: [900, 500, 100, 700, 300, 700, 400, 900, 500, 700, 800, 600],
        backgroundColor: '#a65386',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-6 shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#1f394d]">Job Statistics</h2>
          <div className="flex items-center text-[#a65386] gap-2 bg-gray-100 px-3 py-2 rounded">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
        </div>
        <div className="h-64 w-full text-[#a65386]">
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-[#1f394d]">Latest Job Update</h3>
            <ul className="text-sm">
              {['450', '449', '443', '441', '420', '412', '411', '390', '387', '376', '361', '355'].map((item, index) => (
                <li key={index} className="flex justify-between py-1 border-b last:border-none text-[#1f394d]">
                  <span>Sector Name</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobStatistics;
