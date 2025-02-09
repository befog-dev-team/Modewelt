"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import React from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ResponsiveChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Views',
        data: [20000, 40000, 15000, 30000, 45000, 25000, 40000, 20000],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barThickness: 20, // Set a fixed width for the bars
        maxBarThickness: 20, // Maximum bar width
      },
      {
        label: 'Followers',
        data: [15000, 30000, 10000, 20000, 35000, 20000, 30000, 15000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 20, // Set a fixed width for the bars
        maxBarThickness: 20, // Maximum bar width
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value / 1000}K`,
        },
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ResponsiveChart;
