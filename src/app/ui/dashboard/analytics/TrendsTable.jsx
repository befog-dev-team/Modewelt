'use client';

import Link from "next/link";

export default function TrendsTable({ jobTrends }) {

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full mt-4 text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="p-2">SL No</th>
              <th className="p-2">Job Name</th>
              <th className="p-2">Job Description</th>
              <th className="p-2">View</th>
            </tr>
          </thead>
          <tbody>
            {jobTrends.map((trend, index) => (
              <tr key={trend.id} className="border-b text-gray-700 text-sm">
                <td className="p-2">{String(index + 1).padStart(2, '0')}.</td>
                <td className="p-2 font-medium">{trend.jobTitle}</td>
                <td className="p-2">{trend.description.length > 30 ? `${trend.description.substring(0, 30)}...` : trend.description}</td>
                <td className={`p-2 font-medium ${trend.color}`}>
                  <Link href={`/admin/jobs/${trend.id}`}>
                    <button className="flex items-center justify-center w-full py-1 px-4 bg-[#f26744] hover:bg-white hover:outline text-white hover:text-black text-sm font-bold rounded">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
