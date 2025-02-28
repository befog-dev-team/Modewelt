"use client"; // Use client-side rendering
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Designer", value: 30, color: "#2B2D69" },
  { name: "Illustrator", value: 15, color: "#F88C4F" },
  { name: "Sketch", value: 20, color: "#D761E2" },
  { name: "Graphics", value: 35, color: "#0000FF" },
];

const CustomPieChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-gray-800 text-lg font-semibold mb-4">
        Job Classification
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, percent }) =>
              `${name} ${Math.round(percent * 100)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
