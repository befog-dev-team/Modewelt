"use client";

import AdminDatePicker from "../../ui/common/AdminDatePicker";
import UserChart from "@/app/ui/dashboard/users/userchart";
import UserDetails from "@/app/ui/dashboard/users/userdetails";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function UserManagement({ admin }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-management-stats"],
    queryFn: async () => await ky.get("/api/admin/user-management").json(),
  });

  const [isOpen, setIsOpen] = useState(false);

  // Loading State
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Error: {error.message}
      </div>
    );
  }

  // Ensure data exists before destructuring
  if (!data) return null;

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
    if (previous === 0) return <span className="text-gray-600">N/A</span>;

    const percentageChange = ((current - previous) / previous) * 100;
    const formattedChange = percentageChange.toFixed(1);

    return (
      <span
        className={`flex items-center ${
          percentageChange > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
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
            <h1 className="text-2xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="mt-1 text-gray-600">
              Hi {admin.displayName || admin.username}, welcome back to
              Modeweltjob Admin Panel!
            </p>
          </div>

          {/* Filter Period Section */}
          <div className="relative">
            <AdminDatePicker />
          </div>
        </header>

        {/* Stats Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            trend={getTrendIndicator(totalUsers, previousTotalUsers)}
          />
          <StatCard
            title="Active Users"
            value={activeUsers}
            trend={getTrendIndicator(activeUsers, previousActiveUsers)}
          />
          <StatCard
            title="New Registrations"
            value={newRegistrations}
            trend={getTrendIndicator(
              newRegistrations,
              previousNewRegistrations
            )}
          />
          <StatCard
            title="Deleted Accounts"
            value={deletedAccounts}
            trend={getTrendIndicator(deletedAccounts, previousDeletedAccounts)}
          />
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
      <p className="text-3xl font-bold text-gray-800">
        {value.toLocaleString()}
      </p>
      <p className="text-sm mt-2">{trend}</p>
    </div>
  );
}
