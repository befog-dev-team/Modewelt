"use client";
// import React, { useState } from "react";
import Image from "next/image";
// import { MdOutlineFileUpload, MdEditSquare } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";
import profileimg from "../../../public/assets/profile/backgroundImageBackrgound.png";
import vector from "../../../public/assets/profile/Vector.png";
// import EditProfile from "@/components/Profile/EditProfile";

const ProfilePage = () => {
//   const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

//   const toggleEditProfile = () => {
//     setIsEditProfileVisible(!isEditProfileVisible);
//   };

  return (
    <div className="h-auto bg-gray-100 flex items-center justify-center">
      <div className="max-w-[850px] w-full shadow-lg rounded-lg">
        {/* Background Image */}
        <div className="relative w-full h-[180px]">
          <Image
            src={profileimg}
            alt="Profile Background"
            layout="fill"
            className="object-cover rounded-t-lg"
          />

          {/* Action Buttons */}
          <div className="absolute inset-x-2 top-2 flex justify-between">
            {/* Upload Icon */}
            <div
              className="p-2 bg-white bg-opacity-90 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-transform"
              aria-label="Upload Icon"
              tabIndex={0}
            >
              {/* <MdOutlineFileUpload
                className="text-gray-600 text-xl"
                aria-hidden="true"
              /> */}
            </div>

            {/* Edit Profile Button */}
            <div>
              {/* <div
                onClick={toggleEditProfile}
                className="flex items-center bg-white bg-opacity-90 px-4 py-2 rounded-md shadow-lg space-x-2 cursor-pointer hover:scale-105 transition-transform"
                role="button"
                aria-label="Edit Profile"
                tabIndex={0}
              >
                <MdEditSquare className="text-gray-600 text-xl" />
                <p className="text-gray-800 font-medium text-sm">Edit Profile</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="relative mt-1 px-4 pb-4">
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
            {/* Profile Image */}
            <div className="h-[170px] w-[170px] -mt-4 bg-gray-200 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src={profileimg}
                alt="User Profile"
                width={170}
                height={240}
                className="object-cover"
              />
            </div>

            {/* User Information */}
            <div className="text-center md:text-left mt-4 md:mt-0 flex-1">
              <h1 className="text-2xl font-bold">Aditya Kumar</h1>
              <div className="flex items-center justify-center md:justify-start mt-2 space-x-2">
                <Image
                  src={vector}
                  alt="Location Icon"
                  width={13}
                  height={13}
                />
                <p className="text-gray-700">Lucknow, Uttar Pradesh, India</p>
              </div>
              <p className="text-gray-600 mt-2">
                Passionate about building impactful solutions. Dedicated to
                delivering user-friendly interfaces and scalable web
                applications.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <button className="w-full md:w-[170px] h-[32px] bg-gradient-to-b from-[#FFA1AF] to-[#A45286] text-white rounded-md hover:opacity-90 transition">
                  Contact Info
                </button>
                <button className="w-full md:w-[170px] h-[32px] bg-white text-[#A45286] border-[2px] border-[#A45286] rounded-md hover:bg-[#A45286] hover:text-white transition">
                  1,043 connections
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
