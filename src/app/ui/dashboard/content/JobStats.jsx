// pages/index.js
import React from "react";
import CustomBarChart from "./CustomBar";
import CustomPieChart from "./CustomPieChart";
import JobActivity from "./JobActivity";
import RecentJob from "./RecentJob";

export default function JobStats() {
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
        <RecentJob />

        {/* CustomPieChart Section */}
        <CustomPieChart />
      </div>
      {/* JobActivity Section */}
      <JobActivity />
    </div>
  );
}

