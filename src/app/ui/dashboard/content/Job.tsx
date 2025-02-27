"use client";

import Card from "./card";
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function Dashboard({ reportStats }) {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Stats Section */}
      <Card reportStats={reportStats} />

      {/* Jobs Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-xl text-gray-800">Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead>
              <tr>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">User Name</th>
                <th className="p-4 font-medium">Job Date</th>
                <th className="p-4 font-medium">Reason</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <span className="font-medium text-gray-800">User Name</span>
                  </td>
                  <td className="p-4">@user</td>
                  <td className="p-4">12.09.2019 - 12:53 PM</td>
                  <td className="p-4">abc@gmail.com</td>
                  <td className="p-4">
                    <div className="flex justify-center space-x-2">
                      <button title="Approved Action" className="bg-green-200 text-green-800 border-2 border-green-800 p-2 rounded-lg transition-all hover:bg-green-800 hover:text-white">
                        <FaCheck />
                      </button>
                      <button title="Delete Action" className="bg-red-100 text-red-800 border-2 border-red-800 p-2 rounded-lg transition-all hover:bg-red-800 hover:text-white">
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}