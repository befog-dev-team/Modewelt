'use client';

import { useState } from 'react';

const jobs = [
  { company: 'Spotify Subscription', jobId: '#12548796', jobName: 'Shopping', num: '1234 ****', date: '28 Jan, 12.30 AM', applicants: 200 },
  { company: 'Freepik Sales', jobId: '#12548796', jobName: 'Transfer', num: '1234 ****', date: '25 Jan, 10.40 PM', applicants: 200 },
  { company: 'Mobile Service', jobId: '#12548796', jobName: 'Service', num: '1234 ****', date: '20 Jan, 10.40 PM', applicants: 200 },
  { company: 'Wilson', jobId: '#12548796', jobName: 'Transfer', num: '1234 ****', date: '15 Jan, 03.29 PM', applicants: 200 },
  { company: 'Emilly', jobId: '#12548796', jobName: 'Transfer', num: '1234 ****', date: '14 Jan, 10.40 PM', applicants: 200 },
];

const reports = Array(8).fill({ jobId: '#12548796', reports: '09' });

export default function JobActivity() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Job Activity</h1>
      <div className="w-full max-w-6xl bg-white p-4 rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Company Name</th>
                <th className="p-3">Job ID</th>
                <th className="p-3">Job Name</th>
                <th className="p-3">Number of Job</th>
                <th className="p-3">Date</th>
                <th className="p-3">Applicants</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 flex items-center">
                    <span className={`h-3 w-3 rounded-full ${index % 2 === 0 ? 'bg-red-500' : 'bg-green-500'} mr-2`}></span>
                    {job.company}
                  </td>
                  <td className="p-3">{job.jobId}</td>
                  <td className="p-3">{job.jobName}</td>
                  <td className="p-3">{job.num}</td>
                  <td className="p-3">{job.date}</td>
                  <td className="p-3 text-blue-500 font-bold">{job.applicants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-6">Job Reports</h2>
      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-md mt-2">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Job ID</th>
              <th className="p-3">No. of Reports</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{report.jobId}</td>
                <td className="p-3">{report.reports}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
