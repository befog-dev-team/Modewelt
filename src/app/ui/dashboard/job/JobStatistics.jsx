"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";
import Link from "next/link";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobStatistics = ({ jobs }) => {
  

  // Compute job count per month using useMemo for optimization
  const jobCountPerMonth = useMemo(() => {
    const counts = Array(12).fill(0);
    jobs.forEach((job) => {
      const monthIndex = dayjs(job.createdAt).month();
      counts[monthIndex] += 1;
    });
    return counts;
  }, [jobs]);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Jobs Created Per Month",
        data: jobCountPerMonth,
        backgroundColor: "#a65386",
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
        ticks: {
          stepSize: 1, // Corrected placement inside ticks
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Job Statistics Chart */}
      <div className="flex flex-col justify-center lg:col-span-2 bg-white p-6 shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#1f394d]">Job Statistics</h2>
        </div>
        <div className="h-72 w-full text-[#a65386]">
          <Bar data={data} options={options} />
        </div>
      </div>

      {/* Latest Job Updates */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#1f394d]">Latest Job Updates</h3>
        <div className="max-h-[300px] overflow-y-auto no-scrollbar">
          <ul className="text-sm divide-y">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Link href={`/admin/jobs/${job.id}`} key={job.id}>
                  <li className="flex justify-between py-2 text-[#1f394d] hover:bg-gray-100 hover:rouned-lg">
                    <span>{job.jobTitle}</span>
                    <span className="font-medium">{dayjs(job.createdAt).format("MMM DD, YYYY")}</span>
                  </li>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No job updates available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobStatistics;
