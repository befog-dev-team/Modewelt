"use client";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Toggle from "./button/button";

const PrivacySettings = () => {

  return (
    <div className="max-w-[1014px] bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#000000] mb-4">
        Privacy Setting
      </h2>
      
      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="mt-4 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
