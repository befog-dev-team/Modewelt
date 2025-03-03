"use client";

import AdminDatePicker from "@/app/ui/common/AdminDatePicker";
import JobPostingChart from "@/app/ui/dashboard/analytics/JobPostingChart";
import MonthlyRevenueChart from "@/app/ui/dashboard/analytics/MonthlyRevenueChart";
import ReviewsChart from "@/app/ui/dashboard/analytics/ReviewsChart";
import TrendsTable from "@/app/ui/dashboard/analytics/TrendsTable";
import UserChart from "@/app/ui/dashboard/users/userchart";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Loader2 } from "lucide-react";

const Analytics = ({ admin }) => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user-management-stats"],
    queryFn: async () => await ky.get("/api/admin/user-management").json(),
  });

  const {
    data: jobStats,
    isLoading: jobLoading,
    error: jobError,
  } = useQuery({
    queryKey: ["admin-jobStats"],
    queryFn: async () => await ky.get("/api/admin/analytics").json(),
  });

  const { data: jobTrends,
    isLoading: jobTrendsLoading,
    error: jobTrendsError,
  } = useQuery({
    queryKey: ["job-trends"],
    queryFn: async () => ky.get("/api/admin/analytics/job-trends").json(),
  });

  // Loading state
  if (userLoading || jobLoading || jobTrendsLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Error state
  if (userError || jobError || jobTrendsError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Error: {userError?.message || jobError?.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mx-[2rem]">
                Analytics & Reports
              </h1>
            </div>
            {/* Filter Period Section */}
            <div className="relative">
              <AdminDatePicker
                date={dateRange}
                onDateChange={setDateRange}
                onFilterClick={handleFilterClick}
              />
            </div>
          </div>
        </header>

        {/* User Chart Section */}
        <section className="mt-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden p-6">
            <UserChart chartdata={userData} />
          </div>
        </section>

        {/* Grid Layout for Charts and Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
          {/* Job Posting Chart */}
          <div className="bg-gray-100 rounded-lg overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Job Posting</h2>
            </div>
            <JobPostingChart jobStats={jobStats} />
          </div>

          {/* Monthly Revenue Chart */}
          {/* <div className="bg-white rounded-lg overflow-hidden p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Monthly Revenue
            </h2>
            <MonthlyRevenueChart />
          </div> */}

          {/* Reviews Chart */}
          {/* <div className="bg-white rounded-lg overflow-hidden p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Reviews</h2>
            <ReviewsChart />
          </div> */}

          {/* Trends Table */}
          <div className="bg-gray-100 rounded-lg overflow-hidden p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Trends</h2>
            <TrendsTable jobTrends={jobTrends} />
          </div>
        </div>

        {/* Download Report Button */}
        {/* <div className="mt-8 flex justify-center">
          <button className="bg-[#a65386] text-white px-6 py-3 rounded-lg hover:bg-[#914272] transition">
            Download Report
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Analytics;