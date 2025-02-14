"use client";

import Image from "next/image";
import IndianFlag from "../../../../public/assets/jobs/indianFlag.png";
import ArrowDown from "../../../../public/assets/jobs/arrowDown.png";
import Search from "../../../../public/assets/jobs/search.png";
import { BellRing } from "lucide-react";
import { CircleUser } from "lucide-react";
import { MapPin } from "lucide-react";
import Modewelt from "../../../../public/assets/jobs/Modewelt.png";
import BusinessBag from "../../../../public/assets/jobs/businessbag.png";
import BuildIcon from "../../../../public/assets/jobs/buildingIcon.png";
import PepoleIcon from "../../../../public/assets/jobs/People.png";
import { ArrowRight } from "lucide-react";
import { Bookmark } from "lucide-react";
import Footer from "@/components/Footer";
import LaptopImage from "../../../../public/assets/jobs/laptop2.png";
import Banner from "../../../../public/assets/jobs/banner.png";
import Link from "next/link";

const jobProfile = () => {
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
        <div className="w-full min-h-fit px-4 bg-[#FFFFFF] flex flex-col lg:flex-row justify-between relative">
          <div className="max-w-full sm:max-w-[679px] w-full h-auto flex flex-col gap-[32px] px-6 py-8 lg:px-0 lg:py-0">
            <div className="max-w-full sm:max-w-[652px] w-full h-auto flex flex-col gap-6">
              <h1 className="w-full h-auto font-inter font-medium text-[32px] sm:text-[56px] leading-[40px] sm:leading-[64px] text-[#18191C]">
                Find a job that suits your interest & skills.
              </h1>
              <p className="max-w-[536px] w-full h-auto font-inter font-normal text-lg sm:text-lg text-[#5E6670]">
                Aliquam vitae turpis in diam convallis finibus in at risus.
                Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
              </p>
              <div className="max-w-full sm:max-w-[679px] w-full h-auto flex flex-col gap-6">
                <div className="w-full h-auto rounded-[8px] border-[1px] border-[#E4E5E8] p-3 flex flex-col sm:flex-row gap-3 bg-[#FFFFFF] shadow-custom-blue">
                  <div className="max-w-full sm:max-w-[628px] w-full h-[56px] flex justify-center items-center">
                    <div className="max-w-[288px] w-full h-[56px] rounded-[5px] bg-[#FFFFFF] flex items-center gap-2">
                      <Image src={Search} className="w-[24px] h-[24px]" alt="Search" />
                      <input
                        className="max-w-[156px] w-full h-[24px] font-inter font-normal text-base text-[#9199A3]"
                        type="text"
                        placeholder="Job title, keyword, company"
                      />
                    </div>
                    <span className="w-[32px] h-[1px] border-[1px] border-[#E4E5E8] rotate-90"></span>
                    <div className="max-w-[288px] w-full h-[56px] rounded-[5px] bg-[#FFFFFF] flex items-center gap-2">
                      <MapPin className="w-[24px] h-[24px]" />
                      <input
                        className="max-w-[104px] h-[24px] font-inter font-normal text-base leading-[24px] text-[#9199A3]"
                        type="text"
                        placeholder="Your Location"
                      />
                      <button className="max-w-[131px] w-full h-[56px] rounded py-4 px-[32px] gap-3 bg-[#A45286]">
                        <h1 className="w-[67px] h-[24px] font-inter font-semibold text-base text-[#FFFFFF]">
                          Find Job
                        </h1>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="max-w-full sm:max-w-[471px] w-full h-auto flex gap-4 mt-[32px] flex-wrap">
                  <h1 className="w-auto font-inter font-normal text-sm text-[#9199A3]">
                    Suggestion:
                  </h1>
                  <h1 className="font-inter font-normal text-sm text-[#474C54]">
                    Designer,
                  </h1>
                  <h1 className="font-inter font-normal text-sm text-[#474C54]">
                    Programing,
                  </h1>
                  <h1 className="font-inter font-medium text-sm text-[#0A65CC] whitespace-nowrap">
                    Digital Marketing,
                  </h1>
                  <h1 className="font-inter font-normal text-sm text-[#474C54]">
                    Video,
                  </h1>
                  <h1 className="font-inter font-normal text-sm text-[#474C54]">
                    Animation.
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-full sm:max-w-[492px] w-full h-auto relative top-0 lg:top-[50px] lg:left-[9px]">
            <Image className="w-full h-auto" src={Modewelt} alt="Modewelt" />
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-4 p-4 bg-[#FFFFFF]">
          <div className="max-w-[312px] w-full sm:w-[48%] md:w-[23%] h-[112px] rounded-[8px] p-5 flex items-center gap-5 bg-[#FFFFFF] shadow-sm">
            <Image
              className="w-[60px] h-[60px]"
              src={BusinessBag}
              alt="Business Bag"
            />
            <div className="w-full">
              <h1 className="font-inter font-medium text-lg md:text-2xl text-[#18191C]">
                1,75,324
              </h1>
              <span className="font-inter font-normal text-sm md:text-base text-[#767F8C]">
                Live Job
              </span>
            </div>
          </div>

          <div className="max-w-[312px] w-full sm:w-[48%] md:w-[23%] h-[112px] rounded-[8px] p-5 flex items-center gap-5 bg-[#FFFFFF] shadow-custom-white">
            <Image src={BuildIcon} alt="Build Icon" />
            <div className="w-full">
              <h1 className="font-inter font-medium text-lg md:text-2xl text-[#18191C]">
                97,354
              </h1>
              <span className="font-inter font-normal text-sm md:text-base text-[#767F8C]">
                Companies
              </span>
            </div>
          </div>

          <div className="max-w-[312px] w-full sm:w-[48%] md:w-[23%] h-[112px] rounded-[8px] p-5 flex items-center gap-5 bg-[#FFFFFF] shadow-sm">
            <Image src={PepoleIcon} alt="People Icon" />
            <div className="w-full">
              <h1 className="font-inter font-medium text-lg md:text-2xl text-[#18191C]">
                38,47,154
              </h1>
              <span className="font-inter font-normal text-sm md:text-base text-[#767F8C]">
                Candidates
              </span>
            </div>
          </div>

          <div className="max-w-[312px] w-full sm:w-[48%] md:w-[23%] h-[112px] rounded-[8px] p-5 flex items-center gap-5 bg-[#FFFFFF] shadow-sm">
            <Image src={BusinessBag} alt="New Jobs" />
            <div className="w-full">
              <h1 className="font-inter font-medium text-lg md:text-2xl text-[#18191C]">
                7,532
              </h1>
              <span className="font-inter font-normal text-sm md:text-base text-[#767F8C]">
                New Jobs
              </span>
            </div>
          </div>
        </div>

        <div className="w-full min-h-fit flex flex-col gap-[50px] p-1 left-[60px]">
          <div className="w-full flex flex-wrap justify-between items-center gap-4 sm:gap-6">
            {/* Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[40px] leading-snug md:leading-[48px] font-medium text-[#191F33]">
              Featured Job
            </h1>

            {/* Button */}
            <Link href="/job-profile2" prefetch={true}>
              <button className="flex items-center gap-2 px-4 py-2 sm:py-3 border border-[#E7F0FA] rounded-md bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <span className="text-sm sm:text-base md:text-lg font-semibold text-[#0A65CC] whitespace-nowrap">
                  View All
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
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
        <div className="relative w-full h-auto p-5 flex flex-wrap items-center justify-center gap-6 bg-[#FFFFFF] mt-[160px]">
          {/* First Image and Content */}
          <div className="relative max-w-[648px] w-full h-auto md:h-[290px] flex flex-col items-center md:items-start">
            <Image
              src={LaptopImage}
              className="w-full h-[180px] sm:h-[220px] md:h-full object-cover rounded-lg"
              alt="Laptop Image"
            />
            <div className="absolute top-1/2 left-1/2 md:left-[35%] transform -translate-x-1/2 -translate-y-1/2 text-center md:text-left">
              <h1 className="font-inter font-medium text-lg sm:text-xl md:text-[32px] leading-[1.2] text-[#191F33] mt-4 md:mt-[46px]">
                Become a Candidate
              </h1>
              <p className="max-w-[312px] w-full text-xs sm:text-sm md:text-base text-[#636A80] opacity-80 mt-2 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                cursus a dolor convallis efficitur.
              </p>
              <button className="w-full sm:w-auto max-w-[188px] h-[44px] sm:h-[48px] rounded-md flex items-center justify-center gap-2 px-4 bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <span className="text-xs sm:text-sm md:text-base font-semibold text-[#A45286]">
                  Register now
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Second Image and Content */}
          <div className="relative max-w-[648px] w-full h-auto md:h-[290px] flex flex-col items-center md:items-start">
            <Image
              src={Banner}
              className="w-full h-[180px] sm:h-[220px] md:h-full object-cover rounded-lg"
              alt="Banner Image"
            />
            <div className="absolute top-1/2 left-1/2 md:left-[35%] transform -translate-x-1/2 -translate-y-1/2 text-center md:text-left">
              <h1 className="font-inter font-medium text-lg sm:text-xl md:text-[32px] leading-[1.2] text-[#FFFFFF] mt-4 md:mt-[46px]">
                Become a Candidate
              </h1>
              <p className="max-w-[312px] w-full text-xs sm:text-sm md:text-base text-[#FFFFFF] opacity-80 mt-2 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                cursus a dolor convallis efficitur.
              </p>
              <button className="w-full sm:w-auto max-w-[188px] h-[44px] sm:h-[48px] rounded-md flex items-center justify-center gap-2 px-4 bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <span className="text-xs sm:text-sm md:text-base font-semibold text-[#A45286]">
                  Register now
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default jobProfile;
