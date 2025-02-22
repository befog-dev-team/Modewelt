"use client";

import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import UserChart from "@/app/ui/dashboard/users/userchart";
import JobPostingChart from "@/app/ui/dashboard/analytics/JobPostingChart";
import MonthlyRevenueChart from "@/app/ui/dashboard/analytics/MonthlyRevenueChart";
import ReviewsChart from "@/app/ui/dashboard/analytics/ReviewsChart";
import TrendsTable from "@/app/ui/dashboard/analytics/TrendsTable";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ky from "ky";

const Analytics = ({ admin }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["user-management-stats"],
        queryFn: async () => await ky.get("/api/admin/user-management").json(),
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
        return <div className="min-h-screen flex justify-center items-center text-red-600">Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Analytics & Reports
                            </h1>
                        </div>
                        {/* Filter Period Section */}
                        <div className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2">
                            <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-[0.5rem] p-2">
                                <FiCalendar />
                            </div>
                            <div>
                                <p className="text-gray-600 text-lg">Filter Period</p>
                                <p className="text-gray-800 text-sm">
                                    17 April 2020 - 21 May 2020
                                </p>
                            </div>
                            <div className="text-[#b9babd] text-2xl">
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>
                </header>
                <section className="mt-8">
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <UserChart chartdata={data} />
                    </div>
                </section>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Job Posting Chart */}
                <div className="shadow-sm rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Job Posting</h2>
                        <button
                            className="flex items-center px-3 py-1.5 rounded-lg text-sm transition"
                            onClick={() => setFilter(!filter)}
                        >
                            <div className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2">
                                <div className="text-[#a65386] text-base bg-[#ead6ff] rounded-[0.5rem] p-2">
                                    <FiCalendar />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-base">Filter Period</p>
                                </div>
                                <div className="text-[#b9babd] text-base">
                                    <IoIosArrowDown />
                                </div>
                            </div>
                        </button>
                    </div>
                    <JobPostingChart />
                </div>

                {/* Monthly Revenue Chart */}
                {/* <div className="shadow-sm rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Monthly Revenue
          </h2>
          <MonthlyRevenueChart />
        </div> */}

                {/* Reviews Chart */}
                {/* <div className="bg-white shadow-sm rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700">Reviews</h2>
          <ReviewsChart />
        </div> */}

                {/* Trends Table */}
                <div className="mt-4 sm:mt-0 bg-[#f3f2f7] shadow-sm rounded-lg p-4 items-center space-x-2">
                    <h2 className="text-lg font-semibold text-gray-700 lg:mb-12 sm:mb-4">Trends</h2>
                    <TrendsTable />
                </div>
            </div>

            {/* Download Report Button */}
            {/* <div className="mt-6 flex justify-center">
        <button className="bg-[#a65386] text-white px-6 py-3 rounded-lg shadow hover:bg-[#914272] transition">
          Download Report
        </button>
      </div> */}
        </div>
    );
};

export default Analytics;
