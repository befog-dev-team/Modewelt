'use client';

import { useRouter } from 'next/navigation';

export default function JobActivity({ data }) {
  const router = useRouter();

  return (
    <div className="py-6 bg-gray-100 min-h-screen flex flex-col items-center">
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
              {data.map((job, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => router.push(`/admin/jobs/${job.jobId}`)}
                >
                  <td className="p-3 flex items-center">
                    <span
                      className={`h-3 w-3 rounded-full ${index % 2 === 0 ? 'bg-red-500' : 'bg-green-500'} mr-2`}
                    ></span>
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
    </div>
  );
}