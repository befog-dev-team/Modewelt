"use client";

import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import JobSection from "@/components/Jobs/JobSection/index.js";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="bg-white dark:bg-gray-900 h-[135px] p-5 my-4 rounded-[4px] border dark:border-gray-800 transition-colors">
        <div className="flex items-center space-x-4">
          <p className="text-[15px] pl-3 font-semibold font-[Gotham] text-gray-900 dark:text-gray-300">
            Your dream job is here
          </p>
        </div>
        <hr className="w-full h-[1px] mx-auto mt-4 bg-gray-200 dark:bg-gray-800 mb-4 border-none transition-colors" />
        <div className="flex items-center px-2 justify-between text-[18px]">
          <input
            type="text"
            placeholder="Search jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow mt-[-11px] p-1 text-[18px] rounded-md focus:outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400"
          />
          <div className="flex space-x-4 items-center">
            {/* <IoFilterSharp size={24} className="text-[#e3e3e3] hover:text-gray-500" /> */}
            <div className="flex justify-center items-center w-[32px] h-[32px] bg-[#fc3fb4] rounded-[4px]">
              <IoSearchOutline className="text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Pass searchQuery to JobSection */}
      <JobSection searchQuery={searchQuery} />
    </div>
  );
}
