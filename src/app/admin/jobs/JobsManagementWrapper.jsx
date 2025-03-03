"use client";

import AdminDatePicker from "@/app/ui/common/AdminDatePicker";
import JobListings from "@/app/ui/dashboard/job/JobListings";
import JobStatistics from "@/app/ui/dashboard/job/JobStatistics";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// Filter Component
// const Filter = ({ filterOpen, toggleFilter }) => (
//   <div className="relative">
//     <div
//       className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2 cursor-pointer"
//       onClick={toggleFilter}
//     >
//       <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-full p-2">
//         <FiCalendar />
//       </div>
//       <div>
//         <p className="text-gray-600 text-base">Filter Period</p>
//       </div>
//       <div className="text-[#b9babd] text-2xl">
//         <IoIosArrowDown />
//       </div>
//     </div>

//     {filterOpen && (
//       <div className="absolute z-10 bg-white shadow-md rounded-lg p-4 w-full max-w-xs mt-2">
//         <h3 className="text-lg font-semibold mb-3 text-[#3e4954]">Filter</h3>
//         <input
//           type="text"
//           placeholder="Search Job by name/company name"
//           className="w-full p-2 border rounded-md mb-3 text-[#3e4954]"
//         />
//         <ul className="text-sm">
//           {[
//             "All Jobs",
//             "Types Of Job Listed",
//             "By company name",
//             "By department",
//           ].map((item, index) => (
//             <li
//               key={index}
//               className="flex items-center space-x-2 py-2 text-[#3e4954]"
//             >
//               <input type="checkbox" className="w-4 h-4" />
//               <span>{item}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </div>
// );

// Jobs Management Wrapper Component
export default function JobsManagementWrapper() {
  // Default: Last 30 days
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => setFilterOpen((prev) => !prev);

  const { data: jobs, isLoading, error, refetch } = useQuery({
    queryKey: ["jobs-management", dateRange],
    queryFn: async () => {
      if (!dateRange?.from || !dateRange?.to) return {}; // 🔥 Prevents returning `null`
      const params = {
        from: dateRange.from.toISOString().split("T")[0],
        to: dateRange.to.toISOString().split("T")[0],
      };
      const res = await axios.get("/api/admin/jobs-management", { params });
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
        <p>
          <strong>Error:</strong>{" "}
          {error.response?.data?.message || error.message}
        </p>
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
              <h1 className="text-2xl font-bold text-gray-800">
                Job Management
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

        {/* Job Statistics Section */}
        <div className="mb-6">
          {jobs && (
            <JobStatistics jobs={jobs} />
          )}
          {/* <Id/> */}
        </div>

        {/* All Jobs Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">All Jobs</h2>
            {/* <Filter filterOpen={filterOpen} toggleFilter={toggleFilter} /> */}
          </div>

          {/* Jobs Listing */}
          <div className="bg-white shadow rounded-lg p-6">
            {/* Add jobs listing here */}
            {jobs && (
              <JobListings jobs={jobs} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
