"use client";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Toggle from "./button/button";

const ConnectedAccount = () => {
  return (
    <div className="max-w-[1014px] bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#000000] mb-4">
        Connected Account
      </h2>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <p className="text-black">Social media Linked</p>
          <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-700 transition-colors">
            Add another account
          </p>
        </div>
        <div className="flex gap-4 mb-8">
          <div className="w-12 h-12 rounded-lg border-1 bg-gray-500"></div>
          <div className="w-12 h-12 rounded-lg border-1 bg-gray-500"></div>
          <div className="w-12 h-12 rounded-lg border-1 bg-gray-500"></div>
          <div className="w-12 h-12 rounded-lg border-1 bg-gray-500"></div>
        </div>
      </div>

      <h1 className="text-black font-semibold">Manage Integration</h1>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <p className="text-black">Social media Linked</p>
          <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-700 transition-colors">
            Add another account
          </p>
        </div>
        <div className="flex gap-4 mb-8">
          <div className="flex flex-col justify-center items-center">
            <div className="w-12 h-12 rounded-full border bg-gray-500"></div>
            <div className="mt-2 text-gray-600">Name</div>
            <div className="text-sm text-[#a6a6a6]">xyz@gmail.com</div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="w-12 h-12 rounded-full border bg-gray-500"></div>
            <div className="mt-2 text-gray-600">Name</div>
            <div className="text-sm text-[#a6a6a6]">xyz@gmail.com</div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="w-12 h-12 rounded-full border bg-gray-500"></div>
            <div className="mt-2 text-gray-600">Name</div>
            <div className="text-sm text-[#a6a6a6]">xyz@gmail.com</div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="w-12 h-12 rounded-full border bg-gray-500"></div>
            <div className="mt-2 text-gray-600">Name</div>
            <div className="text-sm text-[#a6a6a6]">xyz@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="mt-4 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ConnectedAccount;
