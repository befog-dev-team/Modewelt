"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";

export default function Index() {
  return (
    <div>
      <div className="bg-white h-[135px] p-5 my-4 rounded-[4px]">
        <div className="flex items-center space-x-4">
          <p className="text-[12px] pl-3 font-semibold font-[Gotham] text-[#181818] uppercase">
            Your dream job is here
          </p>
        </div>
        <hr className=" w-[790px] h-[1px] mx-auto mt-4 bg-[#D7D7D7] mb-4" />
        <div className="flex items-center px-2 justify-between text-[18px]">
          <input
            type="text"
            placeholder="Search jobs"
            className="flex-grow mt-[-11px] p-1 text-[18px] rounded-md focus:outline-none placeholder:text-[#18181833] placeholder:text-[18px]"
          />
          <div className="flex space-x-4 items-center">
            {/* Filter */}
            <IoFilterSharp
              size={24}
              className="text-[#e3e3e3] hover:text-gray-500"
            />
            <div className="flex justify-center items-center w-[32px] h-[32px] bg-[#bb679c] rounded-[4px]">
              <IoSearchOutline className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
