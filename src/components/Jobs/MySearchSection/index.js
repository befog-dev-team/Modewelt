"use client";

import React from "react";
// import Image from 'next/image'

export default function Index() {
  return (
    <div>
      <div className="bg-white h-[290px] flex flex-col justify-start items-center mb-3 rounded-[4px]">
        {/* My Search Header */}
        <div className="flex justify-between">
          <div className="font-[600] px-8 pt-4 text-[12px] pb-2 uppercase font-[Gotham] text-[#181818] leading-[11.48px]">
            My Searches
          </div>
          <div className="font-[300] px-8 pt-4 text-[12px] pb-2 uppercase font-[Gotham] text-[#A45286] leading-[13.8px] hover:scale-105 hover:font-[900] transition-all duration-300">
            Edit list
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-[#F4F4F4] w-[230px] mx-auto mt-2" />

        {/* My Search List */}
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="w-[230px] h-[54px] flex bg-[#FFE3EF] mt-4 items-center justify-center p-3 gap-[0.5rem] rounded-[4px] hover:bg-[#f5c9dd]"
          >
            <div>
              <p className="font-medium text-[14px]">Fashion Designing</p>
              <p className="text-[14px]">University, Lucknow</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
