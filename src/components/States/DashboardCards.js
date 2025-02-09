"use client";
import React from "react";
import Image from "next/image";
import img1 from "../../../public/assets/states/1.png";
import img2 from "../../../public/assets/states/2.png";
import img3 from "../../../public/assets/states/3.png";
import img4 from "../../../public/assets/states/4.png";

const DashboardCards = () => {
  const stats = [
    {
      img: img4,
      title: "Accounts Reached",
      value: "40k",
      change: "+1.29%",
      weeklyGain: "+8.4K this week",
      background: "linear-gradient(90deg, rgba(171,84,136,1) 34%, rgba(186,86,141,1) 59%, rgba(199,88,145,1) 78%)",
      textColor: "text-white",
    },
    {
      img: img1,
      title: "Accounts Engagement",
      value: "40k",
      change: "+1.29%",
      weeklyGain: "+8.4K this week",
      bgColor: "bg-pink-100",
      textColor: "text-gray-900",
    },
    {
      img: img2,
      title: "Total Likes",
      value: "150k",
      change: "+1.29%",
      weeklyGain: "+8.4K this week",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
    },
    {
      img: img3,
      title: "Total Views",
      value: "40k",
      change: "+1.29%",
      weeklyGain: "+8.4K this week",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg shadow p-6 ${stat.bgColor || ""} ${stat.textColor || ""}`}
          style={stat.background ? { background: stat.background } : {}}
        >
          {/* Header Section: Image and Title */}
          <div className="flex items-center mb-4">
            <Image src={stat.img} alt={stat.title} className="w-12 h-12" />
            <h3 className="text-lg font-semibold ml-4">{stat.title}</h3>
          </div>
          {/* Stats Section */}
          <p className="text-3xl font-bold my-2">{stat.value}</p>
          <div className="flex items-center mb-4 gap-40">
            <p className="text-sm">{stat.weeklyGain}</p>
            <p className="text-xs mt-2">
              <span
                className={`font-bold bg-slate-500 p-2 rounded-full ${stat.change.includes("+") ? "text-green-500" : "text-red-500"
                  }`}
              >
                {stat.change}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
