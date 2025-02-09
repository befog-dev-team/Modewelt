"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Index() {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 mt-6 mb-12">
      {/* Job Cards */}
      {[
        {
          title: "UX/UI designer",
          company: "Instagram",
          location: "CA, USA",
          description:
            "Instagram is a photo and video-sharing social networking service owned by Facebook, Inc.",
          link: "/job-profile",
        },
        {
          title: "Product designer",
          company: "Periscope",
          location: "Remote only",
          description:
            "Periscope is a live video streaming app for Android and iOS developed by Kayvon Beykpour and Joe Bernstein and acquired by Twitter before launch in 2015.",
          link: "/job-profile",
        },
      ].map((job, index) => (
        <div
          key={index}
          className="w-full flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white rounded-lg shadow-md space-y-4 sm:space-y-0 sm:space-x-6"
        >
          {/* Image and Text Section */}
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="h-[76px] w-[76px] flex-shrink-0">
              <Image
                src="/assets/sample/connection-profile.png"
                height={100}
                width={100}
                alt="connection image"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col space-y-2 w-full sm:w-[300px]">
              <p className="font-[Gotham] text-[#181818] font-bold text-[16px] sm:text-[18px] leading-tight">
                {job.title}
              </p>
              <div className="flex gap-3 text-sm text-[#18181899]">
                <div className="font-[Arial]">{job.company}</div>
                <div className="font-[Arial] text-[#181818]">{job.location}</div>
              </div>
              <span className="font-[Gotham] text-[#181818] text-[12px] sm:text-[14px] leading-[18px] mt-2">
                {job.description}
              </span>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-end sm:justify-center w-full sm:w-auto">
            <Link href={job.link}>
              <button className="w-[120px] h-[36px] flex justify-center items-center rounded-[4px] uppercase bg-gradient-to-r from-[#c166a0] via-[#A45286] to-[#c166a0] text-white text-[14px] font-semibold hover:bg-gradient-to-l hover:from-[#a3527e] hover:to-[#c166a0] transition duration-300 ease-in-out">
                <span className="font-[Arial] text-[14px] leading-[16px]">
                  More Info
                </span>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
