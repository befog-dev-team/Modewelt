"use client";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Toggle from "./button/button";

const NotificationSettings = () => {
  const [formData, setFormData] = useState({
    email: "adityakanaujiya.ui@gmail.com",
  });

  return (
    <div className="max-w-[1014px] bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#000000] mb-4">
        Notification Setting
      </h2>
      <div className="flex items-center space-x-8">
        {/* Email Display */}
        <div className="w-1/2">
          <label className="block text-[#4a4a4a] mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            className="w-full p-2 text-[#4a4a4a] border rounded-md bg-gray-100"
            disabled
          />
        </div>
        {/* Email Notification Toggle */}
        <div className="flex items-center space-x-4 mt-6 gap-6">
          <span className="text-[#4a4a4a]">Email Notification</span>
          <Toggle />
        </div>
      </div>
      {/* <div className="flex items-center space-x-4 mt-6 gap-6">
        <span className="text-[#4a4a4a]">Push Notification</span>
        <Toggle />
      </div> */}
      <div className="flex items-center space-x-4 mt-6 gap-6">
        <span className="text-[#4a4a4a]">SMS Alert</span>
        <Toggle />
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

export default NotificationSettings;
