"use client";

import AdminDatePicker from "../../ui/common/AdminDatePicker";
import UserChart from "@/app/ui/dashboard/users/userchart";
import UserDetails from "@/app/ui/dashboard/users/userdetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserManagement({ admin }) {
  // Default: Last 30 days
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { data = {}, isLoading, error, refetch } = useQuery({
    queryKey: ["user-management-stats", dateRange],
    queryFn: async () => {
      if (!dateRange?.from || !dateRange?.to) return {}; // 🔥 Prevents returning `null`
      const params = {
        from: dateRange.from.toISOString().split("T")[0],
        to: dateRange.to.toISOString().split("T")[0],
      };

      const res = await axios.get("/api/admin/user-management", { params });
      return res.data ?? {}; // 🔥 Ensures an empty object instead of `null`
    },
    enabled: false, // Fetch only when triggered
  });

  // Fetch data initially when the component mounts
  useEffect(() => {
    refetch();
  }, []);

  // Trigger API call only when the filter button is clicked
  const handleFilterClick = () => {
    if (dateRange?.from && dateRange?.to) {
      refetch();
    }
  };

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
    newRegistrations = 0,
    previousNewRegistrations = 0,
    activeUsers = 0,
    previousActiveUsers = 0,
    totalUsers = 0,
    previousTotalUsers = 0,
    deletedAccounts = 0,
    previousDeletedAccounts = 0,
  } = data || {}; // Ensures `data` never breaks the UI

  const getTrendIndicator = (current, previous) => {
    if (previous === 0) return <span className="text-gray-600">N/A</span>;

    const percentageChange = ((current - previous) / previous) * 100;
    const formattedChange = percentageChange.toFixed(1);

    return (
      <span
        className={`flex items-center ${percentageChange > 0 ? "text-green-600" : "text-red-600"
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
            <AdminDatePicker
              date={dateRange}
              onDateChange={setDateRange}
              onFilterClick={handleFilterClick}
            />
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
          {data &&
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <UserChart chartdata={data} />
            </div>
          }
        </section>

        {/* User Details Section */}
        <section className="mt-8">
          {data &&
            <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
              <UserDetails users={data.userDetails} />
            </div>
          }
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
