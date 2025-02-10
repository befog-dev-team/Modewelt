"use client";

import Image from "next/image";
import IndianFlag from "../../../../public/assets/jobs/indianFlag.png";
import ArrowDown from "../../../../public/assets/jobs/arrowDown.png";
import Search from "../../../../public/assets/jobs/search.png";
import { BellRing } from "lucide-react";
import { CircleUser } from "lucide-react";
import { MapPin } from "lucide-react";

import { Bookmark } from "lucide-react";
import Footer from "@/components/Footer";
import { LocateFixed } from "lucide-react";
import { SlidersVertical } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

const jobProfile2 = () => {
  return (
    <>
      <div className="w-full h-auto bg-[#F6F7F2] ">
        <nav className="w-full h-auto py-4 px-4 sm:px-8 flex flex-wrap items-center justify-between border-b border-[#ECECEC] bg-[#FFFFFF]">
          {/* Logo */}
          <h1 className="font-bungee text-xl text-[#A45286]">Modewelt</h1>

          {/* Search and Dropdown */}
          <div className="w-full sm:max-w-[668px] flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
            <div className="w-full flex items-center border border-[#E4E5E8] bg-[#FFFFFF] rounded-md p-2">
              <div className="flex items-center gap-3">
                <Image
                  src={IndianFlag}
                  className="w-[24px] h-[16px]"
                  alt="India Flag"
                />
                <span className="font-inter font-medium text-sm text-[#18191C]">
                  India
                </span>
                <Image
                  className="w-[16px] h-[16px]"
                  src={ArrowDown}
                  alt="Arrow Down"
                />
              </div>
              <span className="hidden sm:block border-l border-[#E4E5E8] mx-4 h-5"></span>
              <div className="flex items-center w-full">
                <Image
                  src={Search}
                  className="w-[24px] h-[24px]"
                  alt="Search Icon"
                />
                <input
                  type="text"
                  className="w-full ml-2 font-inter text-sm text-[#9199A3] placeholder-[#9199A3] focus:outline-none"
                  placeholder="Job title, keyword, company"
                />
              </div>
            </div>
          </div>

          {/* Notification and Profile */}
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <button className="relative">
              <BellRing size={24} />
            </button>
            <CircleUser className="w-[32px] h-[32px] sm:w-[48px] sm:h-[48px]" />
          </div>
        </nav>
        <div className="w-full h-auto flex flex-wrap items-center justify-between px-4 py-4 sm:px-10 sm:py-6 bg-[#FFFFFF]">
          {/* Title */}
          <h1 className="font-inter font-medium text-lg flex items-center">
            Find Job
          </h1>

          {/* Breadcrumb */}
          <div className="flex gap-2 mt-2 sm:mt-0">
            <span className="font-inter font-normal text-sm text-[#767F8C]">
              Feed / Job
            </span>
            <span className="font-inter font-normal text-sm text-[#767F8C]">
              /
            </span>
            <span className="font-inter font-normal text-sm text-[#767F8C]">
              Find job
            </span>
          </div>
        </div>
        <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 px-3 shadow-custom-blue rounded-[8px] mt-[10px]">
          {/* Search Section */}
          <div className="w-full h-[48px] rounded-[5px] bg-[#FFFFFF] flex items-center p-3 gap-3 justify-center sm:col-span-2 lg:col-span-1">
            <Image src={Search} className="w-[24px] h-[24px]" alt="Search" />
            <input
              className="w-full h-[24px] font-inter font-normal text-base text-[#9199A3] placeholder:text-[#9199A3] focus:outline-none focus:ring-2 focus:ring-[#A45286] focus:border-transparent"
              placeholder="Search by: Job title, Position, Keyword..."
            />
          </div>

          {/* Divider */}
          <div className="w-full hidden sm:block sm:col-span-1 justify-center">
            <span className="w-[60px] border-t-[1px] border-[#EDEFF5] -rotate-90 mt-[-8px] sm:mt-[-12px] mb-4 sm:mb-0"></span>
          </div>

          {/* Location Section */}
          <div className="w-full h-[48px] rounded-[5px] bg-[#FFFFFF] flex items-center gap-3 justify-center sm:col-span-2 lg:col-span-1">
            <MapPin className="w-[24px] h-[24px]" />
            <input
              className="w-full h-[24px] font-inter font-normal text-base text-[#9199A3] placeholder:text-[#9199A3] focus:outline-none focus:ring-2 focus:ring-[#A45286] focus:border-transparent"
              placeholder="City, state or zip code"
            />
            <LocateFixed className="w-[24px] h-[24px]" />
          </div>

          {/* Button Section */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:col-span-2 lg:col-span-1">
            {/* Filters Button */}
            <button className="w-full h-[48px] rounded-[4px] py-3 px-6 flex gap-3 items-center bg-[#F1F2F4] hover:bg-[#E5E6E8] focus:outline-none focus:ring-2 focus:ring-[#A45286]">
              <SlidersVertical className="w-[24px] h-[24px]" />
              <h1 className="font-inter font-semibold text-base text-[#18191C]">
                Filters
              </h1>
            </button>

            {/* Find Job Button */}
            <button className="w-full h-[48px] rounded-[3px] py-3 px-6 flex gap-3 bg-[#A45286] hover:bg-[#9B3A65] focus:outline-none focus:ring-2 focus:ring-[#7A2A5A]">
              <h1 className="font-inter font-semibold text-base text-[#FFFFFF]">
                Find Job
              </h1>
            </button>
          </div>
        </div>

        <div className="w-full min-h-fit flex flex-col gap-[50px] p-5 left-[60px]">
          <div className="w-full h-[48px] flex justify-between px-4 sm:px-6 md:px-8">
            <h1 className="w-full font-inter font-medium text-[32px] sm:text-[36px] md:text-[40px] leading-[40px] sm:leading-[44px] md:leading-[48px] text-[#191F33]">
              Featured Job
            </h1>
          </div>

          <div className="w-full min-h-fit flex flex-col gap-[50px] p-1 left-[60px]">
            <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
              {/* First Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      Part-time
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      FULL-TIME
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient-2 shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      INTERNSHIP
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
              {/* First Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      Part-time
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      FULL-TIME
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient-2 shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      INTERNSHIP
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
              {/* First Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      Part-time
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      FULL-TIME
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient-2 shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      INTERNSHIP
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
              {/* First Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      Part-time
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      FULL-TIME
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Job Card */}
              <div className="w-full sm:w-[424px] h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col bg-custom-gradient-2 shadow-custom-1">
                <div className="w-full h-auto flex flex-col gap-[6px]">
                  <h1 className="font-inter font-medium text-lg text-[#18191C]">
                    Fashion Designer
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <h1 className="py-1 px-2 flex items-center gap-2.5 bg-[#E7F6EA] font-inter font-semibold text-xs leading-[12px] text-[#0BA02C]">
                      INTERNSHIP
                    </h1>
                    <span className="font-inter font-normal text-sm text-[#767F8C]">
                      Salary: $20,000 - $25,000
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="w-[48px] h-[48px] rounded p-3 bg-[#EDEFF5]"></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-inter font-medium text-base text-[#18191C]">
                        Company Name
                      </h1>
                      <div className="w-full flex gap-1 items-center">
                        <MapPin className="w-[18px] h-[18px]" />
                        <span className="font-inter font-normal text-sm text-[#767F8C]">
                          Dhaka, Bangladesh
                        </span>
                        <Bookmark className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-[110px] mx-auto">
        <ArrowLeft className="w-[24px] h-[24px] cursor-pointer" />

        <div className="flex items-center gap-2">
          {["01", "02", "03", "04", "05"].map((num, index) => (
            <span
              key={index}
              className={`w-[58px] h-[48px] rounded-[50px] relative flex items-center justify-center 
        ${index === 0 ? "bg-[#A45286]" : "bg-[#EDEFF5]"}`}
            >
              <h1
                className={`absolute text-sm font-medium font-inter ${
                  index === 0 ? "text-[#FFFFFF]" : "text-[#5E6670]"
                }`}
              >
                {num}
              </h1>
            </span>
          ))}
        </div>

        <ArrowRight className="w-[24px] h-[24px] cursor-pointer" />
      </div>

      <Footer />
    </>
  );
};

export default jobProfile2;
