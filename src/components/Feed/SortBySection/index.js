"use client";

import dynamic from "next/dynamic";
const FollowingFeed = dynamic(() => import("@/app/(main)/FollowingFeed"), { loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg mt-4 transition-colors" /> });
const ForYouFeed = dynamic(() => import("@/app/(main)/ForYouFeed"), { loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg mt-4 transition-colors" /> });
import { useState } from "react"; // Importing necessary hooks

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
                <hr className="flex-grow border-gray-300 dark:border-gray-800 transition-colors" />
                <div className="relative">
                    <p
                        className="text-center text-[12px] font-[Gotham] font-[600] uppercase sm:text-[14px] cursor-pointer text-gray-900 dark:text-gray-300 transition-colors"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                        SORT BY:{" "}
                        <span className="font-semibold text-[#fc3fb4]">{selectedFeed}</span>
                    </p>
                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-md rounded-sm z-10 transition-colors">
                            <ul className="text-sm sm:text-base text-gray-900 dark:text-gray-100">
                                <li
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => handleOptionClick("For You")}
                                >
                                    For You
                                </li>
                                <li
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => handleOptionClick("Following")}
                                >
                                    Following
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <hr className="flex-grow border-gray-300 dark:border-gray-800 transition-colors" />
            </div>

            {/* Post Section */}
            <div className="pt-1">
                {selectedFeed === "Following" ? <FollowingFeed /> : <ForYouFeed />} {/* Conditional Feed Rendering */}
            </div>
        </div>
    );
}
