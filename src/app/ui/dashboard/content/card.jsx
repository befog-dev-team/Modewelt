"use client";
import Image from "next/image";
import pageIcon from "../../../../../public/contact/page.png";
import reportIcon from "../../../../../public/contact/Vector.png";
import offensiveIcon from "../../../../../public/contact/time.png";
import actionIcon from "../../../../../public/contact/ac.png";

const cardData = [
  {
    title: "Total Post",
    value: "40,689",
    icon: pageIcon,
    timeFrame: "Last",
    period: "Day",
  },
  {
    title: "Reported Post",
    value: "8,900",
    icon: reportIcon,
    timeFrame: "Last",
    period: "Week",
  },
  {
    title: "Offensive Content",
    value: "2,040",
    icon: offensiveIcon,
    timeFrame: "Last",
    period: "Month",
  },
  {
    title: "Total Action",
    value: "1,245",
    icon: actionIcon,
    timeFrame: "Last",
    period: "Year",
  },
];

export default function StatsCards() {
  return (
    <div className=" max-w-[70%] xl:max-w-[980px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="px-4 py-0.5 text-sm bg-white rounded-2xl shadow-lg w-full max-w-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 font-semibold text-sm md:text-base">
                {item.title}
              </h3>
              <div className="w-12 h-12 p-3 bg-[#F5F0FA] rounded-[1rem] flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={28}
                  height={28}
                />
              </div>
            </div>
              <p className="text-xl font-bold text-black">{item.value}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12px] text-[#a6aaab] sm:text-md md:text-lg w-full sm:w-auto">
                <span className="text-green-600 font-semibold">
                  {item.timeFrame}
                </span>
                {item.period}
              </p>
              <select className="border text-[#a6aaab] border-gray-300 rounded-lg text-xs sm:text-sm md:text-base px-1 sm:px-2 py-0.5 sm:py-1 focus:outline-none focus:ring-2 focus:ring-gray-400 transition w-full sm:w-auto pb-1">
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
