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
      {/* Job Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {displayedJobs.map((job, index) => (
          <div
            key={index}
            className="h-30 cursor-pointer"
            onClick={() =>
              router.push(`/admin/jobs/${(currentPage - 1) * itemsPerPage + index + 1}`)
            }
          >
            <div className="bg-gray-300 w-full h-40 flex items-center justify-center rounded-lg"></div>
            <p className="text-center text-black mt-2">{job}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 flex items-center rounded-md text-[#a35285] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <IoIosArrowBack className="mt-1" />
          Previous
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
          const pageNumber = currentPage - 2 + index;
          if (pageNumber < 1 || pageNumber > totalPages) return null;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-4 py-2 rounded-md ${
                currentPage === pageNumber ? "bg-[#a35285] text-white" : "bg-gray-300"
              } focus:ring-2`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 rounded-md flex items-center text-[#a35285] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          Next
          <IoIosArrowForward className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default JobListings;
