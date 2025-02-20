"use client";

import { FiCalendar } from "react-icons/fi";
import UserChart from "@/app/ui/dashboard/users/userchart";
import UserDetails from "@/app/ui/dashboard/users/userdetails";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ky from "ky";

export default function UserManagement({ admin }) {
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
        return <div className="min-h-screen bg-gray-100">Error: {error.message}</div>;
    }

    const { newRegistrations, previousNewRegistrations, activeUsers, previousActiveUsers, totalUsers, previousTotalUsers, deletedAccounts, previousDeletedAccounts } = data;

    // Function to determine the trend color & arrow
    const getTrendIndicator = (current, previous) => {
        if (previous === 0) {
            return <span className="text-gray-600">0.0%</span>; // If previous is zero, treat as no change
        }

        const percentageChange = ((current - previous) / previous) * 100;
        const formattedChange = percentageChange.toFixed(1); // One decimal place

        if (percentageChange === 0) {
            return <span className="text-gray-600">0.0%</span>; // No change
        }

        return (
            <span className={`flex items-center ${percentageChange > 0 ? "text-green-600" : "text-red-600"}`}>
                {percentageChange > 0 ? "▲" : "▼"} {Math.abs(formattedChange)}%
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                User Management
                            </h1>
                            <p className="mt-1 text-gray-600">
                                Hi {admin.displayName || admin.username}, Welcome back to Modeweltjob Admin Panel!
                            </p>
                        </div>
                        {/* Filter Period Section */}
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

                {/* Stats Section */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Total Users */}
                    <div className="bg-white shadow-sm rounded-lg p-4">
                        <h2 className="text-gray-600 text-sm">Total Users</h2>
                        <p className="text-3xl font-bold text-gray-800">{totalUsers.toLocaleString()}</p>
                        <p className="text-sm mt-2">{getTrendIndicator(totalUsers, previousTotalUsers)}</p>
                    </div>

                    {/* Active Users */}
                    <div className="bg-white shadow-sm rounded-lg p-4">
                        <h2 className="text-gray-600 text-sm">Total Active Users</h2>
                        <p className="text-3xl font-bold text-gray-800">{activeUsers.toLocaleString()}</p>
                        <p className="text-sm mt-2">{getTrendIndicator(activeUsers, previousActiveUsers)}</p>
                    </div>

                    {/* Total Pending Card */}
                    {/* <div className="bg-white shadow-sm rounded-lg p-4">
                        <h2 className="text-gray-600 text-sm">Total Pending</h2>
                        <p className="text-3xl font-bold text-gray-800">2,040</p>
                        <p className="text-sm text-green-600 mt-2">
                        ▲ 1.8% Up from yesterday
                        </p>
                    </div> */}

                    {/* New Users */}
                    <div className="bg-white shadow-sm rounded-lg p-4">
                        <h2 className="text-gray-600 text-sm">Total New Users</h2>
                        <p className="text-3xl font-bold text-gray-800">{newRegistrations.toLocaleString()}</p>
                        <p className="text-sm mt-2">{getTrendIndicator(newRegistrations, previousNewRegistrations)}</p>
                    </div>

                    {/* Total Deleted Accounts Card */}
                    <div className="bg-white shadow-sm rounded-lg p-4">
                        <h2 className="text-gray-600 text-sm">Total Deleted Accounts</h2>
                        <p className="text-3xl font-bold text-gray-800">{deletedAccounts.toLocaleString()}</p>
                        <p className="text-sm mt-2">{getTrendIndicator(deletedAccounts, previousDeletedAccounts)}</p>
                    </div>
                </div>

                {/* User Chart Section */}
                <section className="mt-8">
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <UserChart chartdata={data} />
                    </div>
                </section>

                {/* User Details Section */}
                <section className="mt-8">
                    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        <UserDetails />
                    </div>
                </section>
            </div>
        </div>
    );
};

function StatCard({ title, value, color }) {
    return (
        <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-gray-600 text-sm">{title}</h2>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className={`text-sm mt-2 ${color === "green" ? "text-green-600" : "text-red-600"}`}>
                {color === "green" ? "▲" : "▼"} Data updated
            </p>
        </div>
    );
}