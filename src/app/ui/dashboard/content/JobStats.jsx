"use client"

import React from "react";
import CustomBarChart from "./CustomBar";
import CustomPieChart from "./CustomPieChart";
import JobActivity from "./JobActivity";
import RecentJob from "./RecentJob";
import ky from "ky";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function JobStats() {
  // Fetch and cache stats using useQuery
  const { data: recentJob, isLoading: isRecentJobLoading, error: errorRecentJob } = useQuery({
    queryKey: ["content-moderation-job-stats", "recent-jobs"],
    queryFn: async () => {
      return await ky.get("/api/admin/content-moderation/job-stats/recent-jobs").json();
    },
  });

  const { data: classifyJob, isLoading: isClassifyJobLoading, error: errorClassifyJob } = useQuery({
    queryKey: ["content-moderation-job-stats", "classification"],
    queryFn: async () => {
      return await ky.get("/api/admin/content-moderation/job-stats/classification").json();
    },
  });

  const { data: jobActivity, isLoading: isJobActivityLoading, error: errorJobActivity } = useQuery({
    queryKey: ["content-moderation-job-stats", "activity"],
    queryFn: async () => {
      return await ky.get("/api/admin/content-moderation/job-stats/activity").json();
    },
  });

  // Loading state
  if (isRecentJobLoading || isClassifyJobLoading || isJobActivityLoading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Error state
  if (errorRecentJob || errorClassifyJob || errorJobActivity) {
    return (
      <div className="h-screen flex justify-center items-center bg-red-100 text-red-700 p-4 rounded-md">
        <p><strong>Error:</strong> Failed to fetch data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Job Listing */}
        {/* <div className="col-span-2 bg-gradient-to-r from-purple-500 to-pink-500 h-48 rounded-xl shadow-md">
          <h2 className="text-white p-4 text-xl font-semibold">Job Listing</h2>
        </div> */}

        {/* Recent Jobs */}
        {/* <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">Recent Jobs</h2>
          <div className="space-y-2">
            <JobCard
              title="Fashion Designer"
              company="Company Name"
              icon="📁"
            />
            <JobCard title="Job Name" company="Company Name" icon="💳" />
            <JobCard title="Job Name" company="Company Name" icon="🪙" />
          </div>
        </div> */}
      </div>

      {/* Weekly Activity & Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* <div className="bg-white w-max-[710px] w-full rounded-xl shadow-md p-4">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">
            Weekly Activity
          </h2>
          <CustomBarChart />
        </div> */}

        {/* RecentJob Section */}
        <RecentJob data={recentJob} />

        {/* CustomPieChart Section */}
        <CustomPieChart data={classifyJob} />
      </div>
      {/* JobActivity Section */}
      <JobActivity data={jobActivity} />
    </div>
  );
}

