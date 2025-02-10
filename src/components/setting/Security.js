"use client";
import React from "react";
import Link from "next/link"; // Ensure Link is imported from next/link

const forgetpassword = "/forgetpassword";

const Security = () => {
  return (
    <div className="flex items-center justify-center mb-24 space-y-8 mx-auto pt-4">
      <div className="max-w-[716px] w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-[1.3rem] font-semibold text-gray-800">
              Account access
            </h2>
            <ul className="mt-3 space-y-2">
              <li className="flex justify-between items-center p-2">
                <span>Email addresses</span>
                <button
                  className="text-blue-600 text-sm sm:text-base"
                  aria-label="Email Info"
                >
                  Info@befog.in →
                </button>
              </li>
              {/* Uncomment if you want to include phone numbers */}
              {/* <li className="flex justify-between items-center p-2">
                <span>Phone numbers</span>
                <button className="text-blue-600 text-sm sm:text-base">
                  →
                </button>
              </li> */}
              <Link href={forgetpassword}>
              <li className="flex justify-between items-center p-2">
                <span>Change password</span>
                  <button
                    className="text-blue-600 text-sm sm:text-base"
                    aria-label="Change Password"
                  >
                    →
                  </button>
              </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
