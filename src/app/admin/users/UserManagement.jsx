"use client";

import { useState, useRef, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ky from "ky";

import UserChart from "@/app/ui/dashboard/users/userchart";
import UserDetails from "@/app/ui/dashboard/users/userdetails";

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
        return <div className="min-h-screen flex justify-center items-center text-red-600">Error: {error.message}</div>;
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState({
        start: "17 April 2020",
        end: "21 May 2020",
    });

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDateChange = (start, end) => {
        setSelectedPeriod({ start, end });
        setIsOpen(false);
    };

    const {
        newRegistrations,
        previousNewRegistrations,
        activeUsers,
        previousActiveUsers,
        totalUsers,
        previousTotalUsers,
        deletedAccounts,
        previousDeletedAccounts,
    } = data;

    const getTrendIndicator = (current, previous) => {
        if (previous === 0) return <span className="text-gray-600">0.0%</span>;

        const percentageChange = ((current - previous) / previous) * 100;
        const formattedChange = percentageChange.toFixed(1);

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
                <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                        <p className="mt-1 text-gray-600">
                            Hi {admin.displayName || admin.username}, welcome back to Modeweltjob Admin Panel!
                        </p>
                    </div>

                    {/* Filter Period Section */}
                    <div ref={dropdownRef} className="relative">
                        <button
                            className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2 cursor-pointer focus:ring-2 focus:ring-gray-300"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-expanded={isOpen}
                        >
                            <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-lg p-2">
                                <FiCalendar />
                            </div>
                            <div>
                                <p className="text-gray-600 text-lg">Filter Period</p>
                                <p className="text-gray-800 text-xs font-medium">
                                    {selectedPeriod.start} - {selectedPeriod.end}
                                </p>
                            </div>
                            <div className="text-[#b9babd] text-2xl">
                                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        </button>

                        {isOpen && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
                                {[
                                    { start: "01 June 2021", end: "15 July 2021" },
                                    { start: "10 Aug 2022", end: "25 Sep 2022" },
                                ].map(({ start, end }) => (
                                    <button
                                        key={start}
                                        className="block w-full text-left text-gray-800 hover:bg-gray-100 p-2 rounded-md"
                                        onClick={() => handleDateChange(start, end)}
                                    >
                                        {start} - {end}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                {/* Stats Section */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <StatCard title="Total Users" value={totalUsers} trend={getTrendIndicator(totalUsers, previousTotalUsers)} />
                    <StatCard title="Active Users" value={activeUsers} trend={getTrendIndicator(activeUsers, previousActiveUsers)} />
                    <StatCard title="New Registrations" value={newRegistrations} trend={getTrendIndicator(newRegistrations, previousNewRegistrations)} />
                    <StatCard title="Deleted Accounts" value={deletedAccounts} trend={getTrendIndicator(deletedAccounts, previousDeletedAccounts)} />
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
}

// Reusable StatCard Component
function StatCard({ title, value, trend }) {
    return (
        <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-gray-600 text-sm">{title}</h2>
            <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p>
            <p className="text-sm mt-2">{trend}</p>
        </div>
    );
}
