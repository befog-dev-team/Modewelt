"use client";
import React from "react";
import Image from "next/image";

export default function Network() {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16">
      <div>
        {/* Pages Heading */}
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/pages/pages.png"
            className="w-6 h-6"
            height={30}
            width={30}
            alt="pages icon"
          />
          <h2 className="font-[Arial] text-[#A45286] text-xl font-bold uppercase leading-[23px]">
            Pages
          </h2>
        </div>

        <div className="mt-7 space-y-6">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="w-full max-w-[850px] mx-auto bg-white border border-[#E4E4E4] rounded-lg shadow-sm hover:shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:space-x-6"
            >
              {/* Image and Text Section */}
              <div className="flex items-center space-x-4">
                <Image
                  src="/assets/sample/connection-profile.png"
                  height={52}
                  width={52}
                  alt="connection image"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="font-[Gotham] text-[#181818] font-semibold text-sm sm:text-base leading-tight">
                    Go with the Flow
                  </p>
                  <p className="font-[Arial] mt-1 text-[#181818] text-xs sm:text-sm font-normal leading-tight">
                    Senior graphic designer
                  </p>
                </div>
              </div>
              <div className="w-[3px] sm:w-[3px] h-[42px] bg-[#A45286] hidden sm:block"></div>
              {/* Message Section */}
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-[#181818bb] font-[Gotham] leading-relaxed">
                  Hey, I saw your works. I like it! Can we do something together?
                  Or maybe you have a project for UX at the moment?
                </p>
              </div>

              {/* Buttons Section */}
              <div className="flex space-x-2">
                <button className="w-[91px] h-[32px] flex justify-center items-center border-[#E7E7E7] border-[1px] rounded-[4px] uppercase font-[Arial] font-bold text-[#B7B7B7] text-xs sm:text-sm leading-[13.8px] transition-all duration-300 hover:border-red-500 hover:text-red-500">
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
