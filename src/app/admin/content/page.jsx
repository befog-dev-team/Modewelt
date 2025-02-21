"use client";
import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Sidebar from "@/app/ui/dashboard/content/sidebar";
const content = () => {
  return (
    <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Content Moderation
              </h1>
              {/* <p className="mt-1 text-gray-600">
                Hi, Samantha. Welcome back to Sedap Admin!
              </p> */}
            </div>
            {/* Filter Period Section */}
            <div className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2">
              <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-[0.5rem] p-2">
                <FiCalendar />
              </div>
              <div>
                <p className="text-gray-600 text-lg">Filter Period</p>
                <p className="text-gray-800 font-sm text-[8px]">
                  17 April 2020 - 21 May 2020
                </p>
              </div>
              <div className="text-[#b9babd] text-2xl">
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </header>
        <div>
            <Sidebar/>
        </div>
      </div>
    </div>
  );
};
export default content;
