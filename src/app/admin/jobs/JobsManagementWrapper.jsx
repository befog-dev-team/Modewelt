"use client";

import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import JobStatistics from "@/app/ui/dashboard/job/JobStatistics";
import JobListings from "@/app/ui/dashboard/job/JobListings";
import ky from "ky";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// Filter Component
const Filter = ({ filterOpen, toggleFilter }) => (
    <div className="relative">
        <div
            className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2 cursor-pointer"
            onClick={toggleFilter}
        >
            <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-full p-2">
                <FiCalendar />
            </div>
            <div>
                <p className="text-gray-600 text-base">Filter Period</p>
            </div>
            <div className="text-[#b9babd] text-2xl">
                <IoIosArrowDown />
            </div>
        </div>

        {filterOpen && (
            <div className="absolute z-10 bg-white shadow-md rounded-lg p-4 w-full max-w-xs mt-2">
                <h3 className="text-lg font-semibold mb-3 text-[#3e4954]">Filter</h3>
                <input
                    type="text"
                    placeholder="Search Job by name/company name"
                    className="w-full p-2 border rounded-md mb-3 text-[#3e4954]"
                />
                <ul className="text-sm">
                    {[
                        "All Jobs",
                        "Types Of Job Listed",
                        "By company name",
                        "By department",
                    ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-2 py-2 text-[#3e4954]">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

const fetchJobs = async () => {
    try {
        return await ky.get("/api/admin/jobs-management").json();
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return [];
    }
}

// Jobs Management Wrapper Component
export default function JobsManagementWrapper() {
    const [filterOpen, setFilterOpen] = useState(false);

    const toggleFilter = () => setFilterOpen((prev) => !prev);

    const { data: jobs, isLoading, error } = useQuery({
        queryKey: ["jobs-management"],
        queryFn: fetchJobs,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader2 className="text-[#f26744] size-10 animate-spin" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="h-screen flex justify-center items-center bg-red-100 text-red-700 p-4 rounded-md">
                <p><strong>Error:</strong> {error.response?.data?.message || error.message}</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Job Management</h1>
                        </div>
                        <div className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2">
                            <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-[0.5rem] p-2">
                                <FiCalendar />
                            </div>
                            <div>
                                <p className="text-gray-600 text-lg">Filter Period</p>
                                <p className="text-gray-800 font-sm text-[8px]">
                                    17 April 2020 - 21 May 2020
                                </p>
                            </div>
                            <div className="text-[#b9babd] text-2xl">
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Job Statistics Section */}
                <div className="mb-6">
                    <JobStatistics jobs={jobs} />
                    {/* <Id/> */}
                </div>

                {/* All Jobs Section */}
                <section>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">All Jobs</h2>
                        <Filter filterOpen={filterOpen} toggleFilter={toggleFilter} />
                    </div>

                    {/* Jobs Listing */}
                    <div className="bg-white shadow rounded-lg p-6">
                        {/* Add jobs listing here */}
                        <JobListings jobs={jobs} />
                    </div>
                </section>
            </div>
        </div>
    );
};
