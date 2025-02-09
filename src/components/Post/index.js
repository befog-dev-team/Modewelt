"use client";
import Image from "next/image";
import React from "react";

function index() {
  return (
    <div>
      {/* post share */}
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          isPostShare ? "flex" : "hidden"
        } overflow-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal} // Close modal on click
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-8 text-center space-y-6">
              <h3 className="text-lg font-semibold">YOU SHARE BEFOG POST</h3>
              <hr className="my-2" />

              {/* Search Bar */}
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Search for posts..."
              />

              {/* Image and Text Section */}
              <div className="flex items-center justify-center space-x-4 p-4 border rounded-lg">
                <Image
                  width={100}
                  height={100}
                  src=""
                  alt="Post Image"
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="text-left">
                  <p className="font-semibold">Befog</p>
                  <span className="text-gray-500">
                    Description or additional text goes here.
                  </span>
                </div>
              </div>
              <hr className="my-2" />

              {/* Checkbox Section */}
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700">
                  I agree to share this post
                </label>
              </div>
            </div>
            <div className="">
              <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:bg-blue-600 hover:scale-105 active:scale-95">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
