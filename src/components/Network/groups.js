"use client";
import React, { useState } from "react";
import Image from "next/image";
import CreateGroupModal from "./CreateGroupModal";

export default function Invitation() {
  const [activeTab, setActiveTab] = useState("request");

  const handleRequest = () => {
    setActiveTab("request");
  };

  const handleYourGroup = () => {
    setActiveTab("your-group");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center space-x-4">
        <Image
          src="/assets/groups/groups.png"
          className="w-[22px] h-[22px] sm:w-[30px] sm:h-[30px]"
          height={30}
          width={30}
          alt="invitation icon"
        />
        <h2 className="font-[Arial] text-[#A45286] text-[18px] sm:text-[20px] font-bold leading-[23px] uppercase">
          Groups
        </h2>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between border-b border-[#E7E7E7] space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex space-x-4 sm:space-x-8 w-full sm:w-auto">
            {/* Your Group Button */}
            <div
              className={`w-full sm:w-[240px] flex justify-center items-center font-semibold text-sm sm:text-[12px] ${
                activeTab === "request"
                  ? "bg-[#fff] text-[#000] h-[40px] cursor-pointer"
                  : "h-[50px] bg-[#f26744] text-white rounded-t-[4px]"
              } transition-all duration-300 uppercase`}
              onClick={handleYourGroup}
            >
              Your Group
            </div>

            {/* Request Button */}
            <div
              className={`w-full sm:w-[240px] flex justify-center items-center font-semibold text-sm sm:text-[12px] ${
                activeTab === "your-group"
                  ? "bg-[#fff] text-[#000] h-[40px] cursor-pointer"
                  : "h-[50px] bg-[#f26744] text-white rounded-t-[4px]"
              } transition-all duration-300 uppercase`}
              onClick={handleRequest}
            >
              Request
            </div>
          </div>

          {/* Create Group Button */}
          <button
            className="w-[141px] h-[32px] flex justify-center items-center ml-auto bg-[#f26744] rounded-[4px] transition-all hover:bg-[#9a4e79]"
            onClick={handleOpenModal}
          >
            <span className="font-[Arial] font-semibold text-[12px] text-white uppercase">
              Create a Group
            </span>
          </button>

          {isModalOpen && <CreateGroupModal onClose={handleCloseModal} />}
        </div>

        {/* Content for Your Group or Request */}
        <div className="mt-4">
          {activeTab === "request" ? (
            <div>
              {/* Divider */}
              <div className="flex items-center space-x-4 mt-8">
                <hr className="flex-grow border-[#E7E7E7]" />
                <div className="font-[Gotham] font-[400] text-[12px] text-[#181818] leading-[11.48px] uppercase">
                  YOU HAVE{" "}
                  <span className="text-[#A45286]">2 NEW GROUP REQUEST</span>
                </div>
                <hr className="flex-grow border-[#E7E7E7]" />
              </div>

              {/* Request Cards */}
              <div className="mt-7 space-y-6">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="w-full max-w-full mx-auto bg-white border border-[#E4E4E4] rounded-lg shadow-lg hover:shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/assets/sample/connection-profile.png"
                        height={52}
                        width={52}
                        alt="connection image"
                        className="w-14 h-14 sm:w-[52px] sm:h-[52px] rounded-full object-cover"
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

                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-[#181818bb] font-[Gotham] leading-relaxed">
                        Hey, I saw your works. I like it! Can we do something
                        together? Or maybe you have a project for UX at the
                        moment?
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="w-[91px] h-[32px] flex justify-center items-center border-[#E7E7E7] border-[1px] rounded-[4px] uppercase font-[Arial] font-bold text-[#B7B7B7] text-xs sm:text-sm leading-[13.8px] transition-all duration-300 hover:border-red-500 hover:text-red-500">
                        Pending
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Your Group Section */}
              <div className="space-y-2 mt-7 w-full max-w-full h-auto overflow-auto bg-[#fff] rounded-[4px]">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-auto sm:h-[95px] flex flex-col sm:flex-row items-center sm:justify-between mt-1 px-4 sm:space-x-6 bg-white rounded-[4px] mb-4 transition-all duration-300 ease-in-out hover:bg-[#f8f8f8]"
                  >
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0 w-full sm:w-auto">
                      <Image
                        src="/assets/sample/connection-profile.png"
                        height={52}
                        width={52}
                        alt="connection image"
                        className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="font-[Arial] font-bold text-[#181818] text-[14px] sm:text-[16px] leading-[16.1px] uppercase">
                          Group Name
                        </p>
                        <p className="font-[Arial] mt-[4px] text-[#181818] text-[14px] sm:text-[16px] opacity-[60%] font-[400] leading-[15px]">
                          15,522 members
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end sm:justify-center sm:w-auto w-full">
                      <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex justify-center items-center rounded-[4px] cursor-pointer">
                        <Image
                          src="/assets/groups/your-group/threedots.png"
                          height={500}
                          width={500}
                          alt="three dots icon"
                          className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
