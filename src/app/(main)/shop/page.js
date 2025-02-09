"use client";
import React from "react";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
// import { FaPlus } from "react-icons/fa6";
import img from "../../../../public/Images/Images1.png";
import Navbar from "@/components/Navbar";

function Page() {
  return (
    <div>
      <Navbar />
      <div className="h-auto pt-4 mt-[10px] justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="max-w-[1224px] w-full h-[54px] space-x-7 flex justify-center">
            <button
              className="max-w-[589px] w-full border-gray-300 border-2 rounded-lg"
              style={{
                background: "linear-gradient(90deg, #D36BAD 0%, #A45286 100%)",
                color: "white",
              }}
            >
              Material
            </button>
            <button
              className="max-w-[589px] w-full border-gray-300 border-2 rounded-lg"
              style={{
                background: "linear-gradient(90deg, #D36BAD 0%, #A45286 100%)",
                color: "white",
              }}
            >
              Cloths
            </button>
          </div>

          <div className="mt-[124px] sm:mt-[40px] max-w-[966px] w-full h-auto flex flex-col items-center">
            <p className="max-w-[966px] w-full h-auto text-center text-[30px] text-[#A45286] font-[Arial] font-[900] uppercase">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece
            </p>

            <p className="max-w-[755px] w-full h-auto text-[#8F8F8F] mt-7 text-center">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to
            </p>
          </div>

          {/* Search Box with Icon */}
          <div className="mt-12 w-full max-w-[966px] mx-auto px-4 flex flex-col sm:flex-row justify-center items-center relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:max-w-[501px] h-[44px] border-2 border-gray-300 rounded-full p-2 pl-10 pr-10 focus:outline-none focus:border-[#D36BAD] transition-colors"
            />
            {/* Search Icon */}
            <span className="absolute sm:static sm:ml-2 left-[89%] sm:left-auto transform -translate-x-1/2 sm:transform-none top-1/2 sm:top-auto -translate-y-1/2 sm:-translate-y-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#a65386] text-gray-700">
              <IoSearch className="h-5 w-5 text-white" />
            </span>
          </div>
        </div>

        <div className="w-full py-10 px-6 sm:px-10 md:px-14 h-auto mb-2">
          <div className="flex justify-between mb-6">
            <p className="font-semibold text-xl sm:text-2xl ml-8 text-[#a85488]">
              Featured Products
            </p>
            <p className="text-right text-gray-500 text-sm sm:text-base mr-8">
              More Products
            </p>
          </div>

          {/* Product Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* Loop to generate 4 product cards */}
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[286px] lg:w-[286px] h-auto mt-6 "
                >
                  <div className="relative w-full h-[366px] border-2 border-gray-300 mb-2 overflow-hidden rounded-lg shadow-md">
                    <span className="absolute top-2 left-2 bg-[#A45286] text-white text-xs font-bold px-2 py-1 rounded">
                      -50%
                    </span>
                    <Image
                      width={100}
                      height={100}
                      src={img} // Replace with actual image paths
                      alt="Product Image"
                      objectFit="cover" // Maintains aspect ratio
                      className="rounded-lg"
                    />
                  </div>
                  <div className="p-4 rounded-lg">
                    <p className="text-lg font-semibold">
                      Waterproof Watch | FireBolt
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">
                        $120
                        <span className="line-through text-sm text-gray-400">
                          $150
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
          {/* Header Section */}
          <header className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#A45286]">
              VIEW OUR RANGE OF CATEGORIES
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600 lg:mx-[100px] md:mx-auto">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don’t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to
            </p>
          </header>

          {/* Categories Layout */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3 items-start w-full max-w-7xl">
            {/* Left Container (Category 01) */}
            <div
              className="bg-gray-200 rounded-[10px] shadow-lg flex items-center justify-center text-lg font-medium"
              style={{ width: "100%", maxWidth: "399px", height: "505px" }}
            >
              Category 01
            </div>

            {/* Middle Container (Category 02 and 03 stacked) */}
            <div className="flex flex-col gap-6 w-full items-center">
              <div
                className="bg-gray-200 rounded-[10px] shadow-lg flex items-center justify-center text-lg font-medium"
                style={{ width: "100%", maxWidth: "414px", height: "235px" }}
              >
                Category 02
              </div>
              <div
                className="bg-gray-200 rounded-[10px] shadow-lg flex items-center justify-center text-lg font-medium"
                style={{ width: "100%", maxWidth: "414px", height: "235px" }}
              >
                Category 03
              </div>
            </div>

            {/* Right Container (Category 04) */}
            <div
              className="bg-gray-200 rounded-[10px] shadow-lg flex items-center justify-center text-lg font-medium"
              style={{ width: "100%", maxWidth: "399px", height: "505px" }}
            >
              Category 04
            </div>
          </div>
        </div>
        <div className="w-full py-10 px-6 sm:px-10 md:px-14 h-auto mb-2">
          <div className="flex justify-between mx-auto mb-6">
            <p className="font-semibold text-xl sm:text-2xl ml-8 text-[#A45286]">
              Featured Products
            </p>
            <p className="text-right text-gray-500 text-sm sm:text-base mr-8">
              <button
                className="bg-[#A45286] text-white text-sm sm:text-base rounded-md w-[91px] h-[32px] hover:opacity-100 "
                style={{ gap: "0px" }}
              >
                Visit
              </button>
            </p>
          </div>
          <div className="flex pb-5">
            <p className="font text-l sm:text-l flex-initial w-full md:w-[685px] ml-8">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t
            </p>
          </div>
          {/* Product Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* Loop to generate 4 product cards */}
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[286px] lg:w-[286px] h-auto mt-6"
                >
                  <div className="relative w-full h-[366px] border-2 border-gray-300 mb-2 overflow-hidden rounded-lg shadow-md">
                    <span className="absolute top-2 left-2 bg-[#A45286] text-white text-xs font-bold px-2 py-1 rounded">
                      -50%
                    </span>
                    <Image
                      src={img} // Replace with actual image paths
                      alt="Product Image"
                      layout="fill" // Ensures the image covers the entire div
                      objectFit="cover" // Maintains aspect ratio
                      className="rounded-lg"
                    />
                  </div>
                  <div className="p-4 rounded-lg">
                    <p className="text-lg font-semibold">
                      Waterproof Watch | FireBolt
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">
                        $120
                        <span className="line-through text-sm text-gray-400">
                          $150
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="min-h-[666px] max-h-fit w-full bg-gradient-to-r from-[#9e4f81] to-[#572b47] flex items-center justify-center md:h-auto">
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 text-center px-4 sm:px-8 md:px-16 lg:px-[30rem] lg:pr-[7rem] ">
                <p className="text-white text-sm md:text-base mt-[3rem]">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don&apos;t
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div
                className="col-span-1 flex flex-col justify-center items-center md:items-start pt-8 pb-56 pl-0 pr-0
"
              >
                <h1 className="text-white text-2xl md:text-4xl font-bold mb-4 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                </h1>
                <button className="bg-white text-[#9e4f81] font-bold py-2 px-4 rounded">
                  READ MORE
                </button>
              </div>

              <div className="col-span-1 py-5 flex flex-col justify-center items-center">
                <div className="text-white text-4xl md:text-6xl font-bold mb-2">
                  99%
                </div>
                <p className="text-white text-center text-sm md:text-base">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don&apos;t
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to.
                </p>
              </div>

              <div className="col-span-1 flex flex-col justify-center items-center">
                <div className="text-white text-4xl md:text-6xl font-bold mb-2">
                  100%
                </div>
                <p className="text-white text-center text-sm md:text-base">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don&apos;t
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#9e4f81] text-xl md:text-2xl font-bold">
                Latest Ongoings
              </h2>
              <button className="bg-[#9e4f81] text-white font-bold py-2 px-4 rounded-md text-sm">
                READ ALL
              </button>
            </div>

            <p className="text-gray-600 text-sm md:text-base max-w-[685px] mb-8">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="rounded-lg">
                    <div className="bg-gray-300 flex items-center justify-center mb-4 w-full aspect-[16/9] md:max-w-[413px] rounded-lg">
                      <span className="text-gray-500 text-sm">
                        Image Placeholder
                      </span>
                    </div>
                    <h3 className="text-gray-900 text-lg font-bold text-center md:text-left">
                      NAME OF THE BRAND
                    </h3>
                    <div className="flex items-center justify-center md:justify-start text-gray-600 text-sm my-2">
                      <span className="rounded-full bg-gray-400 w-8 h-8 mr-2"></span>
                      <span>16 JAN</span>
                    </div>
                    <p className="text-gray-600 text-sm text-center md:text-left">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="min-h-fit flex flex-col justify-between">
          <div className="min-h-fit bg-gray-100 py-10 px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Left Side */}
                <div>
                  <h2 className="text-[#9e4f81] text-xl sm:text-2xl md:text-3xl font-bold">
                    Frequently Asked Question
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-4 mb-6">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which
                    don&apos;t.
                  </p>
                  <button className="bg-[#9e4f81] text-white font-bold py-2 px-4 rounded-md text-sm sm:text-base">
                    SIGN OUT
                  </button>
                </div>

                {/* Right Side */}
                <div className="space-y-4">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="border border-[#9e4f81] rounded-lg p-4 flex items-start gap-4"
                      >
                        <div className="h-4 w-4 rounded-full bg-[#9e4f81] mt-1"></div>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg w-full">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don&apos;t.
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-gradient-to-r from-[#9e4f81] to-[#572b47] py-16 px-4">
            <div className="container mx-auto text-center">
              {/* Title */}
              <h1 className="text-white text-3xl font-bold mb-4">Modewelt</h1>
              {/* Subtitle */}
              <p className="text-white text-sm md:text-base mb-6">
                There are many variations of passages of Lorem Ipsum available,
                but the majority
              </p>
              {/* Search Bar */}
              <div className="mt-12 w-full flex justify-center">
                {/* Wrapper for input and icon */}
                <div className="relative w-[501px]">
                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-[44px] border-2 border-gray-300 rounded-full px-4 pr-12 focus:outline-none focus:border-[#D36BAD] transition-colors"
                  />
                  {/* Search Icon inside the input */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-[#FFC8EB] text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.35-4.35"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-white">
            {/* Content for this section */}
          </div>

          {/* Copyright Section */}
          <div className="bg-gradient-to-r from-[#9e4f81] to-[#572b47] py-4 text-center text-gray-100 text-sm">
            copyright @
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
