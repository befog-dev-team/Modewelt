"use client";
import { useState } from "react";
import profile from "../../../../../public/navbar/profile.jpg";
import Image from "next/image";
import { FaTrash, FaGoogleDrive } from "react-icons/fa";

export default function ReplyBox() {
  return (
    <div className="w-full">
      <div className="mt-4 border rounded-lg shadow-md p-4 bg-white">
        <div className="flex items-center space-x-3 border-b pb-2">
          <Image
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-[#1f2a38]">Name</h3>
            <p className="text-sm text-gray-500">23rd March 2025, 08:30pm</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex space-x-4 text-gray-600 py-2 justify-between">
          <div>
            <h1>Replay</h1>
          </div>
          <div className="flex gap-2 h-2 items-center justify-center mt-1">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M0.582031 12.5833V14.4167H13.4154V12.5833H0.582031ZM4.70703 8.73334H9.29036L10.1154 10.75H12.0404L7.6862 0.666672H6.3112L1.95703 10.75H3.88203L4.70703 8.73334ZM6.9987 2.48167L8.71286 7.08334H5.28453L6.9987 2.48167Z"
                fill="black"
                fillOpacity="0.54"
              />
            </svg>

            <svg
              width="11"
              height="22"
              viewBox="0 0 11 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M9.1263 5.5V16.0417C9.1263 18.0675 7.48547 19.7083 5.45964 19.7083C3.4338 19.7083 1.79297 18.0675 1.79297 16.0417V4.58334C1.79297 3.31834 2.81964 2.29167 4.08464 2.29167C5.34964 2.29167 6.3763 3.31834 6.3763 4.58334V14.2083C6.3763 14.7125 5.9638 15.125 5.45964 15.125C4.95547 15.125 4.54297 14.7125 4.54297 14.2083V5.5H3.16797V14.2083C3.16797 15.4733 4.19464 16.5 5.45964 16.5C6.72464 16.5 7.7513 15.4733 7.7513 14.2083V4.58334C7.7513 2.55751 6.11047 0.916672 4.08464 0.916672C2.0588 0.916672 0.417969 2.55751 0.417969 4.58334V16.0417C0.417969 18.8283 2.67297 21.0833 5.45964 21.0833C8.2463 21.0833 10.5013 18.8283 10.5013 16.0417V5.5H9.1263Z"
                fill="black"
                fillOpacity="0.54"
              />
            </svg>
            <svg
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M2.5737 5.00001C2.5737 3.43251 3.84786 2.15834 5.41536 2.15834H9.08203V0.416672H5.41536C2.88536 0.416672 0.832031 2.47001 0.832031 5.00001C0.832031 7.53001 2.88536 9.58334 5.41536 9.58334H9.08203V7.84167H5.41536C3.84786 7.84167 2.5737 6.56751 2.5737 5.00001ZM6.33203 5.91667H13.6654V4.08334H6.33203V5.91667ZM14.582 0.416672H10.9154V2.15834H14.582C16.1495 2.15834 17.4237 3.43251 17.4237 5.00001C17.4237 6.56751 16.1495 7.84167 14.582 7.84167H10.9154V9.58334H14.582C17.112 9.58334 19.1654 7.53001 19.1654 5.00001C19.1654 2.47001 17.112 0.416672 14.582 0.416672Z"
                fill="black"
                fillOpacity="0.54"
              />
            </svg>

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M9.98953 0.833328C4.92953 0.833328 0.832031 4.93999 0.832031 10C0.832031 15.06 4.92953 19.1667 9.98953 19.1667C15.0587 19.1667 19.1654 15.06 19.1654 10C19.1654 4.93999 15.0587 0.833328 9.98953 0.833328ZM9.9987 17.3333C5.94703 17.3333 2.66536 14.0517 2.66536 10C2.66536 5.94833 5.94703 2.66666 9.9987 2.66666C14.0504 2.66666 17.332 5.94833 17.332 10C17.332 14.0517 14.0504 17.3333 9.9987 17.3333ZM13.207 9.08333C13.9679 9.08333 14.582 8.46916 14.582 7.70833C14.582 6.94749 13.9679 6.33333 13.207 6.33333C12.4462 6.33333 11.832 6.94749 11.832 7.70833C11.832 8.46916 12.4462 9.08333 13.207 9.08333ZM6.79036 9.08333C7.5512 9.08333 8.16536 8.46916 8.16536 7.70833C8.16536 6.94749 7.5512 6.33333 6.79036 6.33333C6.02953 6.33333 5.41536 6.94749 5.41536 7.70833C5.41536 8.46916 6.02953 9.08333 6.79036 9.08333ZM9.9987 15.0417C12.1345 15.0417 13.9495 13.7033 14.6829 11.8333H5.31453C6.04786 13.7033 7.86286 15.0417 9.9987 15.0417Z"
                fill="black"
                fillOpacity="0.54"
              />
            </svg>

            <FaGoogleDrive className="cursor-pointer" />
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M17.25 15.4167V2.58333C17.25 1.575 16.425 0.75 15.4167 0.75H2.58333C1.575 0.75 0.75 1.575 0.75 2.58333V15.4167C0.75 16.425 1.575 17.25 2.58333 17.25H15.4167C16.425 17.25 17.25 16.425 17.25 15.4167ZM5.79167 10.375L8.08333 13.1342L11.2917 9L15.4167 14.5H2.58333L5.79167 10.375Z"
                fill="black"
                fillOpacity="0.54"
              />
            </svg>
          </div>
          <div>
            <FaTrash className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Text Area */}
        <textarea
          className="w-full p-2 border rounded-lg text-[#1f2a38] focus:outline-none focus:ring-2 focus:ring-[#a65386]"
          rows="4"
          placeholder="Type your reply here..."
        ></textarea>

        {/* Actions */}
        <div className="flex justify-end items-center mt-2">
          <button className="bg-[#a35285] text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
