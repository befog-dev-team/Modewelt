"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const itemsPerPage = 18;

const JobListings = ({ jobs = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const router = useRouter();

  const displayedJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Job Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {displayedJobs.map((job) => (
          <div
            key={job.id}
            className="h-30 cursor-pointer hover:text-[#a35285]"
            onClick={() => router.push(`/admin/jobs/${job.id}`)}
          >
            <div className="bg-gray-300 w-full h-40 flex items-center justify-center rounded-lg text-center p-4 hover:bg-gray-100 border border-gray-300 transition-all">
              <span className="font-medium">{job.jobTitle}</span>
            </div>
            <p className="text-center mt-2 text-gray-600">
              {dayjs(job.createdAt).format("MMM DD, YYYY")}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-6 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 flex items-center rounded-md text-[#a35285] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <IoIosArrowBack className="mt-1" />
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
            let pageNumber = currentPage - 2 + index;
            if (totalPages <= 5) pageNumber = index + 1;
            if (pageNumber < 1 || pageNumber > totalPages) return null;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 rounded-md ${currentPage === pageNumber ? "bg-[#a35285] text-white" : "bg-gray-300 text-gray-700"
                  } focus:outline-none focus:ring-2`}
                aria-label={`Page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 rounded-md flex items-center text-[#a35285] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            Next
            <IoIosArrowForward className="mt-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListings;
