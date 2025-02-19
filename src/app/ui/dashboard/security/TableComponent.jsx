'use client';

import React from 'react';
import { IoFilter } from "react-icons/io5";

const data = [
  {
    date: '15/01/2002, 06:30am',
    user: 'aditya-kanaujiya',
    event: 'event name',
    source: 'Macbook Air (iOS)',
    ip: '127.0.0.1',
  },
  {
    date: '15/01/2002, 06:30am',
    user: 'aditya-kanaujiya',
    event: 'event name',
    source: 'Macbook Air (iOS)',
    ip: '127.0.0.1',
  },
  {
    date: '15/01/2002, 06:30am',
    user: 'aditya-kanaujiya',
    event: 'event name',
    source: 'Macbook Air (iOS)',
    ip: '127.0.0.1',
  },
  {
    date: '15/01/2002, 06:30am',
    user: 'aditya-kanaujiya',
    event: 'event name',
    source: 'Macbook Air (iOS)',
    ip: '127.0.0.1',
  },
  {
    date: '15/01/2002, 06:30am',
    user: 'aditya-kanaujiya',
    event: 'event name',
    source: 'Macbook Air (iOS)',
    ip: '127.0.0.1',
  },
  {
    date: '15/01/2002, 06:30am',
    user: 'aditya-kanaujiya',
    event: 'event name',
    source: 'Macbook Air (iOS)',
    ip: '127.0.0.1',
  },
  // Add more data objects here...
];

const TableComponent = () => {
  return (
    <div className=" flex justify-center mt-8">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-5xl">
        {/* Search & Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 relative w-1/3">
            <input
              type="text"
              placeholder="Search"
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
            <div className="pt-2 text-2xl px-2 border-2 rounded-md text-[#05a8ff] shadow-md">
              <IoFilter />
            </div>
          </div>
          <button className="px-4 py-2 border rounded-lg text-[#ba75a4] border-[#ba75a4] hover:bg-purple-50">
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[#4c4d4f] border-b">
                <th className="p-3">
                  <input type="checkbox" />
                </th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">User</th>
                <th className="p-3">Event</th>
                <th className="p-3">Source</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 text-[#4c4d4f]">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{row.user}</td>
                  <td className="p-3">{row.event}</td>
                  <td className="p-3">{row.source}</td>
                  <td className="p-3">{row.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
