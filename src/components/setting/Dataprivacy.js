"use client";
import React from "react";
import Link from "next/link"; // Ensure Link is imported from next/link

const chat = "/chat";

const Security = () => {
  return (
    <div className="flex items-center justify-center mb-24 space-y-8 mx-auto pt-4">
      <div className="max-w-[716px] w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-[1.3rem] font-semibold text-gray-800">
              Who can reach you
            </h2>
            <ul className="mt-3 space-y-2">
              <li className="flex justify-between items-center p-2">
                <span>Invitations to connect</span>
                <button
                  className="text-blue-600 text-sm sm:text-base"
                  aria-label="Invitations to connect"
                >
                  →
                </button>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>Invitations from your network</span>
                <button
                  className="text-blue-600 text-sm sm:text-base"
                  aria-label="Invitations from your network"
                >
                  →
                </button>
              </li>
              <Link href={chat} prefetch={true}>
                <li className="flex justify-between items-center p-2">
                  <span>Messages</span>
                  <button
                    className="text-blue-600 text-sm sm:text-base"
                    aria-label="Messages"
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
