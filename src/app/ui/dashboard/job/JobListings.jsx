"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const jobs = Array.from({ length: 50 }, (_, i) => `Job Name ${i + 1}`);
const itemsPerPage = 24;

const JobListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const router = useRouter();

  const displayedJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {displayedJobs.map((job, index) => (
          <div
            key={`${job}-${index}`}
            className="h-30 cursor-pointer"
            onClick={() =>
              router.push(`/ui/dashboard/job/${(currentPage - 1) * itemsPerPage + index + 1}`)
            }
          >
            <div className="bg-gray-300 w-full h-40 flex items-center justify-center rounded-lg"></div>
            <p className="text-center text-black mt-2">{job}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="px-4 py-2 flex rounded-md text-[#a35285] disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <IoIosArrowBack className="mt-1" />
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1 ? "bg-[#a35285] text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className="px-4 py-2 rounded-md flex text-[#a35285] disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
          <IoIosArrowForward className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default JobListings;
