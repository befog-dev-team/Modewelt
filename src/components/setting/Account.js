"use client";
import React from "react";
import Link from "next/link";

const Account = () => {
  const profile = "/profile";
  const feed = "/feed";

  return (
    <div className="Account">
      <div className="flex items-center justify-center mb-24 space-y-8 mx-auto pt-4">
        <div className="max-w-[716px] w-full mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* Profile Information Section */}
            <div>
              <h2 className="text-[1.3rem] font-semibold text-gray-800">
                Profile information
              </h2>
              <ul className="mt-3 space-y-2">
              <Link href={profile}>
                <li className="flex justify-between items-center p-2">
                  <span>Name, location, and industry</span>
                  
                    <button
                      className="text-blue-600 text-sm sm:text-base"
                      aria-label="Edit Profile Information"
                    >
                      →
                    </button>
                </li>
                </Link>
              </ul>
            </div>

            {/* General Preferences Section */}
            <div>
              <h2 className="text-[1.1rem] font-semibold text-gray-800">
                General preferences
              </h2>
              <ul className="mt-3 space-y-2">
                {/* <Link>
                <li className="flex justify-between items-center p-2">
                  <span>Language</span>
                  <button
                    className="text-blue-600 text-sm sm:text-base"
                    aria-label="Edit Language Preferences"
                  >
                    →
                  </button>
                </li>
                </Link> */}
                <Link href={profile}>
                  <li className="flex justify-between items-center p-2">
                  <span>Showing profile photos</span>
                  <button
                    className="text-blue-600 text-sm sm:text-base"
                    aria-label="Change Profile Photo Visibility"
                  >
                    All LinkedIn members
                  </button>
                  </li>
                </Link>
                <Link href={feed}>
                <li className="flex justify-between items-center p-2">
                  <span>Preferred Feed View</span>
                  <button
                    className="text-blue-600 text-sm sm:text-base"
                    aria-label="Change Feed View Preferences"
                  >
                    Most relevant posts (Recommended)
                  </button>
                </li>
                </Link>
              </ul>
            </div>

            {/* Account Management Section */}
            <div>
              <h2 className="text-[1.3rem] font-semibold text-gray-800">
                Account management
              </h2>
              <ul className="mt-3 space-y-2">
                <Link href={profile}>
                <li className="flex justify-between items-center p-2">
                  <span>Manage account</span>
                  <button
                    className="text-blue-600 text-sm sm:text-base"
                    aria-label="Manage Account"
                  >
                    →
                  </button>
                </li>
                </Link>
                <li className="flex justify-between items-center p-2">
                  <span>Close account</span>
                  <button
                    className="text-blue-600 text-sm sm:text-base"
                    aria-label="Close Account"
                  >
                    →
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
