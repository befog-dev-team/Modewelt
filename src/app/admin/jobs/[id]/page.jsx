"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2, SquareArrowOutUpRight } from "lucide-react";
import ky from "ky";
import UserAvatar from "@/components/UserAvatar";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import pdf from "../../../../../public/assets/Applicants/pdf.png";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function ApplicantsDetails() {
  const router = useRouter();

  const { id } = useParams(); // Get the job id from the URL

  // Fetch job data
  const {
    data: job,
    error: jobError,
    isLoading: isJobLoading,
  } = useQuery({
    queryKey: ["admin-job", id],
    queryFn: async () => {
      return ky.get(`/api/admin/jobs-management/jobs/${id}`).json();
    },
  });

  // Fetch applicants data
  const {
    data: applicantsData,
    error: applicantsError,
    isLoading: isApplicantsLoading,
  } = useQuery({
    queryKey: ["admin-applicantsData", id],
    queryFn: async () => {
      return ky.get(`/api/jobs/job-applications?jobId=${id}`).json();
    },
  });

  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Handle applicant selection
  const handleApplicantSelect = (applicant) => {
    setSelectedApplicant(applicant);
  };

  // Function to download a file
  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success(`${fileName} downloaded successfully!`, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file.", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Loading state
  if (isJobLoading || isApplicantsLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Error state
  if (jobError || applicantsError) {
    return (
      <div className="h-screen flex justify-center items-center bg-red-100 text-red-700 p-4 rounded-md">
        <p>
          <strong>Error:</strong>{" "}
          {jobError?.message || applicantsError?.message || "An error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
      {/* Sidebar - Applicant List */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg text-[#303940] font-semibold mb-4">Applicants</h2>
        <ul className="space-y-2">
          {applicantsData && applicantsData.length === 0 ? (
            <p className="text-gray-500">No applicants found for this job.</p>
          ) : (
            applicantsData.map((applicant, index) => (
              <li
                key={index}
                onClick={() => handleApplicantSelect(applicant)}
                className={`flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-gray-200 ${selectedApplicant?.id === applicant.id ? "bg-gray-200" : ""
                  }`}
              >
                <UserAvatar
                  avatarUrl={applicant?.user?.avatarUrl}
                  alt={`${applicant.firstName} ${applicant.lastName}`}
                  width={120}
                  height={120}
                  size={40}
                  className="rounded-full w-10 h-10"
                />
                <span className="text-[#303940]">
                  {applicant.firstName} {applicant.lastName}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Applicant Details */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg text-[#303940] font-semibold mb-4">
          Applicant Details
        </h2>
        {selectedApplicant ? (
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center gap-2">
              <Link href={`/profile/${selectedApplicant.user.username}`}>
                <UserAvatar
                  src={selectedApplicant?.user?.avatarUrl}
                  alt={`${selectedApplicant.firstName} ${selectedApplicant.lastName}`}
                  width={120}
                  height={120}
                  className="rounded-full w-32 h-32 "
                />
              </Link>
              <Link href={`/profile/${selectedApplicant.user.username}`}>
                <h3 className="text-xl text-[#303940] font-semibold hover:underline">
                  {selectedApplicant.firstName} {selectedApplicant.lastName}
                </h3>
              </Link>
              <p className="text-gray-500">
                @{selectedApplicant?.user?.username}
              </p>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:outline hover:text-black hover:bg-transparent transition-colors duration-200"
                onClick={() => router.push(`/profile/${selectedApplicant.user.username}`)}
              >
                View Profile
              </button>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <strong>Application ID:</strong> {selectedApplicant.id}
                </p>
                <p className="text-gray-600">
                  <strong>Application Date:</strong>{" "}
                  {dayjs(selectedApplicant.createdAt).format("MMM DD, YYYY")}
                </p>
                <p className="text-gray-600">
                  <strong>User ID:</strong> {selectedApplicant.userId}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {selectedApplicant.email}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {selectedApplicant.phone}
                </p>
                <p className="text-gray-600">
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(selectedApplicant.dob).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Gender:</strong> {selectedApplicant.gender}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Current Location:</strong>{" "}
                  {selectedApplicant.currentLocation}
                </p>
                <p className="text-gray-600">
                  <strong>Preferred Location:</strong>{" "}
                  {selectedApplicant.preferredLocation}
                </p>
                <p className="text-gray-600">
                  <strong>Available in:</strong>{" "}
                  {selectedApplicant.availableJoinDays} days
                </p>
                <p className="text-gray-600">
                  <strong>Languages:</strong> {selectedApplicant.language}
                </p>
              </div>
            </div>

            {/* Salary Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <strong>Current Salary:</strong>{" "}
                  {selectedApplicant.currentSalary}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Expected Salary:</strong>{" "}
                  {selectedApplicant.expectedSalary}
                </p>
              </div>
            </div>

            {/* Skills and Achievements */}
            <div>
              <div className="text-gray-600 mb-4">
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedApplicant.skills.split(", ").map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                <strong>Achievements:</strong> {selectedApplicant.achievements}
              </p>
            </div>

            {/* Portfolio */}
            {selectedApplicant.portfolioUrl && (
              <div>
                <p className="text-gray-600">
                  <strong>Portfolio:</strong>{" "}
                  <a
                    href={selectedApplicant.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {selectedApplicant.portfolioUrl}
                  </a>
                </p>
              </div>
            )}

            {/* Education List */}
            <h3 className="mt-8 text-lg font-semibold text-gray-800">Education</h3>
            <div className="space-y-3">
              {selectedApplicant.educationList.map((edu, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                >
                  <p className="text-gray-600">
                    <strong>Degree:</strong> {edu.degree}
                  </p>
                  <p className="text-gray-600">
                    <strong>Institution:</strong> {edu.institution}
                  </p>
                </div>
              ))}
            </div>

            {/* Experience List */}
            <h3 className="mt-8 text-lg font-semibold text-gray-800">Experience</h3>
            <div className="space-y-3">
              {selectedApplicant.experienceList.map((exp, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                >
                  <p className="text-gray-600">
                    <strong>Company:</strong> {exp.company}
                  </p>
                  <p className="text-gray-600">
                    <strong>Role:</strong> {exp.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Resume */}
            <h3 className="mt-6 text-lg font-semibold text-gray-800">Resume</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md">
              <Image src={pdf} alt="pdf" width={28} height={28} />
              <span className="text-md text-gray-700 font-medium">
                {selectedApplicant.resumeFileName}
              </span>
              {/* View Icon */}
              <SquareArrowOutUpRight
                onClick={() => window.open(selectedApplicant.resumeFileUrl, "_blank")}
                className="ml-auto text-[#f26744] transition-transform duration-200 hover:scale-110 cursor-pointer"
                size={20}
              />
              {/* Download Icon */}
              <MdOutlineFileDownload
                className="text-[#f26744] transition-transform duration-200 hover:scale-110 cursor-pointer"
                size={24}
                onClick={(e) => {
                  e.stopPropagation();
                  downloadFile(selectedApplicant.resumeFileUrl, selectedApplicant.resumeFileName || "resume.pdf");
                }}
              />
            </div>

            {/* Additional Documents */}
            <h3 className="mt-8 text-lg font-semibold text-gray-800">Additional Documents</h3>
            <div className="space-y-3">
              {selectedApplicant.additionalDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md"
                >
                  <Image src={pdf} alt="pdf" width={28} height={28} />
                  <span className="text-md text-gray-700 font-medium">
                    {doc.fileName}
                  </span>
                  {/* View Icon */}
                  <SquareArrowOutUpRight
                    onClick={() => window.open(doc.fileUrl, "_blank")}
                    className="ml-auto text-[#f26744] transition-transform duration-200 hover:scale-110 cursor-pointer"
                    size={20}
                  />
                  {/* Download Icon */}
                  <MdOutlineFileDownload
                    className="text-[#f26744] transition-transform duration-200 hover:scale-110 cursor-pointer"
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(doc.fileUrl, doc.fileName || "document.pdf");
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No applicant selected</p>
        )}
      </div>

      {/* Job Description */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-[#303940] mb-4">Job Details</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong>Job ID:</strong> {job?.id}
          </p>
          <p className="text-gray-600">
            <strong>Job Title:</strong> {job?.jobTitle}
          </p>
          <p className="text-gray-600">
            <strong>Company:</strong> {job?.company}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {job?.location}
          </p>
          <p className="text-gray-600">
            <strong>Job Type:</strong> {job?.jobType}
          </p>
          <p className="text-gray-600">
            <strong>Workplace Type:</strong> {job?.workplaceType}
          </p>
          <p className="text-gray-600">
            <strong>Salary:</strong> {job?.salaryAmount} {job?.salaryCurrency} (
            {job?.salaryType})
          </p>
          <p className="text-gray-600">
            <strong>Job Level:</strong> {job?.jobLevel}
          </p>
          <p className="text-gray-600">
            <strong>Expiration Date:</strong>{" "}
            {new Date(job?.expirationDate).toLocaleDateString()}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:outline hover:text-black hover:bg-transparent transition-colors duration-200"
            onClick={() => router.push(`/jobDetails/${job?.id}`)}
          >
            View Job
          </button>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Job Description */}
        <div>
          <h3 className="text-lg font-bold text-[#303940] mb-2">Description</h3>
          <p className="text-gray-600">{job?.description}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#303940] mb-2">Skills</h3>
          <ul className="text-gray-700">
            {job.skills && job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#303940] mb-2">Requirements</h3>
          <p className="text-gray-600">{job?.requirements}</p>
        </div>

        {/* Benefits */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#303940] mb-2">Benefits</h3>
          <p className="text-gray-600">{job?.benefits}</p>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        closeOnClick
        newestOnTop
        draggable
      />
    </div>
  );
}