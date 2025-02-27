"use client";

import Image from "next/image";
import pageIcon from "../../../../../public/contact/page.png";
import reportIcon from "../../../../../public/contact/Vector.png";
import offensiveIcon from "../../../../../public/contact/time.png";
import actionIcon from "../../../../../public/contact/ac.png";

export default function StatsCards({ reportStats }) {
  // Card Data
  const cardData = [
    { title: "Total Reports", value: reportStats.totalReports, icon: pageIcon },
    { title: "Reported Posts", value: reportStats.reportedPosts, icon: reportIcon },
    { title: "Reported Jobs", value: reportStats.reportedJobs, icon: offensiveIcon },
    { title: "Total Actions", value: reportStats.totalActions, icon: actionIcon },
  ];

  return (
    <div className="max-w-[70%] xl:max-w-[980px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 font-semibold text-base md:text-lg">
                {item.title}
              </h3>
              <div className="w-12 h-12 p-3 bg-[#F5F0FA] rounded-xl flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-black mt-4">{item.value}</p>
            {/* Time Option */}
            {/* <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
              <p className="text-sm text-[#a6aaab]">
                <span className="text-green-600 font-semibold">
                  {item.timeFrame}{" "}
                </span>
                {item.period}
              </p>
              <select className="border text-[#a6aaab] border-gray-300 rounded-lg text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400 transition">
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}