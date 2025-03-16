"use client";

import { useState } from "react";

export default function TableComponent({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Ensure data is an array before filtering
  const filteredData = Array.isArray(data)
    ? data.filter((row) => {
      const matchesSearch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Convert row.date to ISO format for comparison
      const rowDate = new Date(row.date).toISOString().split("T")[0];
      const matchesDate = selectedDate ? rowDate === selectedDate : true;

      return matchesSearch && matchesDate;
    })
    : [];

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-5xl h-[40vh] overflow-y-auto no-scrollbar">
        {/* Search & Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M15.5 10.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              />
            </svg>
          </div>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[#4c4d4f] border-b">
                <th className="p-3">Date & Time</th>
                <th className="p-3">User</th>
                <th className="p-3">Event</th>
                <th className="p-3">Source</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50 text-[#4c4d4f]"
                  >
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">{row.user}</td>
                    <td className="p-3">{row.event}</td>
                    <td className="p-3">{row.source}</td>
                    <td className="p-3">{row.ip}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}