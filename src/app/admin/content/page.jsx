"use client";

import AdminDatePicker from "@/app/ui/common/AdminDatePicker";
import Sidebar from "@/app/ui/dashboard/content/sidebar";
import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

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
            <div className="relative">
              <AdminDatePicker />
            </div>
          </div>
        </header>
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
export default content;
