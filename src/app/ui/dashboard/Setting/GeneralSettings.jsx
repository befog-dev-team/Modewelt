"use client";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const GeneralSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState("Light");

  return (
    <div className="max-w-[1014px] bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#000000] mb-4">
        General Setting
      </h2>

      {/* Language Selector */}
      <div className="mb-6">
        <label className="block text-sm text-[#000000] font-medium">
          Language
        </label>
        <select className="w-1/2 p-2 border border-gray-300 text-[#000000] rounded-lg mt-1">
          <option>English</option>
          <option>Spanish</option>
        </select>
      </div>

      {/* Theme Selection */}
      <div className="mb-6">
        <label className="block text-sm text-[#000000] font-medium">
          Theme
        </label>
        <div className="flex gap-4 mt-2">
          {["Light", "Night Mode", "Dark"].map((theme) => (
            <button
              key={theme}
              className={`flex flex-col items-center justify-center w-[150px] h-[100px] rounded-lg border ${
                selectedTheme === theme
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedTheme(theme)}
            >
              <div className="w-[80px] h-[60px] bg-gray-300 flex items-center justify-center rounded-md">
                <span className="text-sm">📷</span>
              </div>
              <span className="mt-2 text-[#000000] text-sm">{theme}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-sm text-[#000000] font-medium">Date</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="DD"
            className="w-[50px] text-[#000000] p-2 border border-gray-300 rounded-lg text-center"
          />
          <input
            type="text"
            placeholder="MM"
            className="w-[50px] text-[#000000] p-2 border border-gray-300 rounded-lg text-center"
          />
          <input
            type="text"
            placeholder="YYYY"
            className="w-[80px] text-[#000000] p-2 border border-gray-300 rounded-lg text-center"
          />
          <button className="p-2 border text-[#d1a5c2] border-gray-300 rounded-lg">
            <FaRegCalendarAlt />
          </button>
        </div>
      </div>

      {/* Time Zone */}
      <div className="mb-6">
        <label className="block text-sm text-[#000000] font-medium">
          Time Zone
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 max-w-[200px] w-full p-2 border text-[#000000] border-gray-300 rounded-lg"
            value="06:30am (+01:03pm GMT)"
            readOnly
          />
          <button className="p-2 border border-gray-300 text-[#000000] rounded-lg">
            Change Time Zone
          </button>
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

export default GeneralSettings;
