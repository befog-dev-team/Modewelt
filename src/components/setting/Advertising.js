"use client"
import React from "react";
// import Image from "next/image";

const Security = () => {
  return (
    <div className="flex items-center justify-center mb-24 space-y-8 mx-auto pt-4">
      <div className="max-w-[716px] w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-[1.3rem] font-semibold text-gray-800">
              Profile information
            </h2>
            <ul className="mt-3 space-y-2">
              <li className="flex justify-between items-cen ter p-2">
                <span>Name, location, and industry</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  →
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Personal demographic information</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  →
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Verifications</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  →
                </button>
              </li>
            </ul>
          </div>

          {/* Display Section */}
          <div>
            <h2 className="text-[1.1rem] sm:text-lg font-medium text-gray-800">
              Display
            </h2>
            <ul className="mt-3 space-y-2">
              <li className="flex justify-between items-center p-2">
                <span>Dark mode</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  →
                </button>
              </li>
            </ul>
          </div>

          {/* General Preferences Section */}
          <div>
            <h2 className="text-[1.1rem] font-semibold text-gray-800">
              General preferences
            </h2>
            <ul className="mt-3 space-y-2">
              <li className="flex justify-between items-center p-2">
                <span>Language</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  →
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Content language</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  →
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Autoplay videos</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  On
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Sound effects</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  On
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Showing profile photos</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  All LinkedIn members
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Preferred Feed View</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  Most relevant posts (Recommended)
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Security;