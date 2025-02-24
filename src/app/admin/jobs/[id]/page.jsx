"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ky from "ky";
import UserAvatar from "@/components/UserAvatar";

export default function ApplicantsDetails() {
  const { id } = useParams(); // Get the job id from the URL

  // Fetch Job Data
  const { data: job, error: jobError, isLoading: jobLoading } = useQuery({
    queryKey: ["admin-job", id],
    queryFn: async () => ky.get(`/api/admin/jobs-management/jobs/${id}`).json(),
  });

  // Fetch Applicants Data
  const { data: applicantsData, error: applicantsError, isLoading: applicantsLoading } = useQuery({
    queryKey: ["admin-applicantsData", id],
    queryFn: async () => ky.get(`/api/jobs/job-applications?jobId=${id}`).json(),
  });

  // Initial selected applicant
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

  // Handle loading state
  if (jobLoading || applicantsLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Handle error state
  if (jobError || applicantsError) {
    return (
      <div className="h-screen flex justify-center items-center bg-red-100 text-red-700 p-4 rounded-md">
        <p><strong>Error:</strong> {jobError?.message || applicantsError?.message}</p>
      </div>
    );
  }

  // Handle Resume Download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowResumeModal(false);
    setShowDownloadSuccess(true);

    setTimeout(() => {
      setShowDownloadSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar - Applicants List */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg text-[#303940] font-semibold mb-4">Applicants</h2>
        <ul>
          {applicantsData?.length > 0 ? (
            applicantsData.map((applicant) => (
              <li
                key={applicant.id}
                onClick={() => setSelectedApplicant(applicant)}
                className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-gray-200"
              >

                <UserAvatar
                  avatarUrl={applicant.user.avatarUrl}
                  size={1000}
                  className="rounded-full w-10 h-10"
                />
                <span className="text-[#303940]">{applicant.user.username}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No applicants found</p>
          )}
        </ul>
      </div>

      {/* Applicant Details */}
      <div className="flex-1 w-1/3 bg-white ml-2 p-6 rounded-lg shadow-md">
        <h2 className="text-lg text-[#303940] font-semibold mb-4">Applicant Details</h2>
        {selectedApplicant ? (
          <div className="flex flex-col items-center gap-4 m-auto">
            <UserAvatar
              avatarUrl={selectedApplicant.user.avatarUrl}
              size={1000}
              className="rounded-full w-40 h-40"
            />
            <div className="text-center">
              <h3 className="text-xl text-[#303940] font-semibold">
                {selectedApplicant?.user.username}
              </h3>
              <p className="text-gray-500">{selectedApplicant?.user.email}</p>
              <p className="text-gray-500">{selectedApplicant?.user.location}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No applicant selected</p>
        )}
      </div>

      {/* Job Description */}
      <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-[#303940]">Job Description</h2>
            <p className="my-2">
              <span className="font-bold text-[#303940]">Job Name –</span> {job?.jobTitle}
            </p>
            <p className="my-2">
              <span className="font-bold text-[#303940]">Company Name –</span> {job?.company}
            </p>
            <p className="my-2">
              <span className="font-bold text-[#303940]">Address –</span> {job?.location}
            </p>
          </div>

          {/* Job Image */}
          <Image
            src={job?.image || "/default-job.png"}
            alt="job"
            width={80}
            height={80}
            className="rounded-lg w-20 h-20"
          />
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Description */}
        <div>
          <h3 className="text-lg font-bold text-[#303940]">Description</h3>
          <p className="text-gray-600 mt-2">{job?.description || "No description provided"}</p>
        </div>

        {/* See Resume Button */}
        {selectedApplicant && (
          <div className="mt-6">
            <button
              onClick={() => setShowResumeModal(true)}
              className="bg-[#a35285] text-white px-6 py-2 rounded-md hover:bg-[#8a3d6c]"
            >
              See Resume
            </button>
          </div>
        )}
      </div>

      {/* Resume Modal */}
      {showResumeModal && selectedApplicant && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="bg-white p-8 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Resume</h2>
            <button
              onClick={handleDownload}
              className="bg-[#a35285] text-white px-4 py-2 rounded hover:bg-[#8a3d6c]"
            >
              Download
            </button>
          </div>
        </div>
      )}

      {/* Download Success Modal */}
      {showDownloadSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#d9ffe7] py-12 px-20 rounded-lg">
            <p className="text-[#000000] font-semibold">Successfully Downloaded!</p>
          </div>
        </div>
      )}
    </div>
  );
}
