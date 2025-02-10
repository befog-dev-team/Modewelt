"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const cardData = [
    {
      title: "Likes",
      value: "5k",
      percentage: 82,
      gradient: "linear-gradient(90deg, rgba(148,53,115,1) 34%, rgba(128,48,100,0.9514399509803921) 59%, rgba(112,46,88,0.9486388305322129) 78%)",
      chartData: [82, 18],
    },
    {
      title: "Comments",
      value: "2k",
      percentage: 68,
      gradient: "linear-gradient(90deg, rgba(148,53,115,1) 34%, rgba(128,48,100,0.9514399509803921) 59%, rgba(112,46,88,0.9486388305322129) 78%)",
      chartData: [68, 32],
    },
    {
      title: "Share",
      value: "500k",
      percentage: 46,
      gradient: "linear-gradient(90deg, rgba(148,53,115,1) 34%, rgba(128,48,100,0.9514399509803921) 59%, rgba(112,46,88,0.9486388305322129) 78%)",
      chartData: [46, 54],
    },
  ];

  return (
    <div className="bg-gray-100 flex justify-center items-center py-4 rounded-lg shadow-md">
      <div className="space-y-6 max-w-[771px] w-full">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 rounded-lg shadow-md text-white"
            style={{ background: card.gradient }}
          >
            {/* Icon and Text */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                {card.title === "Likes" && <span className="text-2xl">👍</span>}
                {card.title === "Comments" && <span className="text-2xl">💬</span>}
                {card.title === "Share" && <span className="text-2xl">🔗</span>}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
            {/* Doughnut Chart */}
            <div className="relative w-16 h-16">
              <Doughnut
                data={{
                  datasets: [
                    {
                      data: card.chartData,
                      backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(200, 200, 200, 0.2)"],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false },
                  },
                  cutout: "75%",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                {card.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
