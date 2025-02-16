"use client";

import FollowingFeed from "@/app/(main)/FollowingFeed"; // Importing FollowingFeed component
import ForYouFeed from "@/app/(main)/ForYouFeed"; // Importing ForYouFeed component
import React, { useState } from "react"; // Importing necessary hooks

export default function SortBySection() {
    const [selectedFeed, setSelectedFeed] = useState("For You"); // State for selected feed
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

    // Function to handle option click
    const handleOptionClick = (option) => { // option is the selected feed
        setSelectedFeed(option); // Set the selected feed
        setIsDropdownOpen(false); // Close the dropdown 
    };

    return (
        <div className="px-4 sm:px-8">
            {/* Dropdown */}
            <div className="flex justify-center items-center space-x-4 flex-wrap relative">
                <hr className="flex-grow border-gray-300" />
                <div className="relative">
                    <p
                        className="text-center text-[12px] font-[Gotham] font-[600] uppercase sm:text-[14px] cursor-pointer"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                        SORT BY:{" "}
                        <span className="font-semibold text-[#f26744]">{selectedFeed}</span>
                    </p>
                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 shadow-md rounded-sm z-10">
                            <ul className="text-sm sm:text-base">
                                <li
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleOptionClick("For You")}
                                >
                                    For You
                                </li>
                                <li
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleOptionClick("Following")}
                                >
                                    Following
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <hr className="flex-grow border-gray-300" />
            </div>

            {/* Post Section */}
            <div className="pt-1">
                {selectedFeed === "Following" ? <FollowingFeed /> : <ForYouFeed />} {/* Conditional Feed Rendering */}
            </div>
        </div>
    );
}
