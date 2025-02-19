"use client"; // Use client-side rendering
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: "Sat", value1: 450, value2: 220 },
  { day: "Sun", value1: 350, value2: 100 },
  { day: "Mon", value1: 320, value2: 250 },
  { day: "Tue", value1: 480, value2: 300 },
  { day: "Wed", value1: 120, value2: 180 },
  { day: "Thu", value1: 410, value2: 230 },
  { day: "Fri", value1: 420, value2: 280 },
];

const CustomBarChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="day" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value1" fill="blue" barSize={30} />
          <Bar dataKey="value2" fill="cyan" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
