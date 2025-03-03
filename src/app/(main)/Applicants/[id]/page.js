"use client";

import { MdOutlineFileDownload } from "react-icons/md";
import { Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import pdf from "../../../../../public/assets/Applicants/pdf.png";
import { Loader2, SquareArrowOutUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatRelativeDate } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import ky from "ky";

// Applicants Page Component
const ApplicantsPage = () => {
  const router = useRouter(); // Next.js router hook
  const [selectedApplicant, setSelectedApplicant] = useState(null); // Selected applicant state

  const { id } = useParams(); // Get the job id from the URL
  if (!id) notFound(); // Redirect to 404 page if id is not provided

  // Using useQuery to fetch and cache job data
  const { data: job, error, isLoading } = useQuery({
    queryKey: ["job", id], // Cache key based on the job id
    queryFn: async () => {
      return ky.get(`/api/jobs/${id}`).json()
    },
  });

  // Using useQuery to fetch and cache applicants data
  const { data: applicantsData } = useQuery({
    queryKey: ["applicantsData", id],
    queryFn: async () => {
      return ky.get(`/api/jobs/job-applications?jobId=${id}`).json();
    },
  });

  // Loading or error state handling
  if (isLoading) {
    return (
      <Loader2 className="h-screen flex justify-center mx-auto items-center text-[#f26744] size-10 animate-spin" />
    );
  }

  // Error handling if job data fetch fails
  if (error) {
    return <div className="min-h-screen bg-gray-100">Error: {error.message}</div>;
  }

  // Set the first applicant as selected by default
  if (applicantsData && applicantsData.length > 0 && !selectedApplicant) {
    setSelectedApplicant(applicantsData[0]);
  }

  // Job status and formatted expiration date
  const jobStatus = new Date(job.expirationDate) > new Date() ? "Active" : "Expired";
  const formattedExpirationDate = new Date(job.expirationDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcf59d]">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Job Details Card */}
        <Suspense fallback={<Loader2 className="mx-auto" />}>
          <div className="bg-white shadow-md rounded-lg border p-6">
            <h2 className="text-2xl font-bold">{job.jobTitle}</h2>
            <p className="text-gray-500">
              {job.company} · {job.location}
            </p>
            <div>
              <p className="text-sm text-gray-400">
                {job.salaryAmount} {job.salaryCurrency}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Expires : {formattedExpirationDate} · {job.jobType} · {job.workplaceType}
            </p>
            <span className={`text-sm font-semibold ${jobStatus === "Active" ? "text-green-600" : "text-red-500"}`}>
              {jobStatus}
            </span>
          </div>
        </Suspense>

        {/* Applicants Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Applicants List */}
          <Suspense fallback={<Loader2 className="mx-auto" />}>
            <div className="bg-white shadow-md rounded-lg p-4 overflow-y-auto h-[500px]">
              <h2 className="text-lg font-semibold text-[#f26744] mb-4">Applicants</h2>
              {Array.isArray(applicantsData) && applicantsData.length > 0 ? (
                applicantsData.map((applicant) => (
                  <div
                    key={applicant.id}
                    className={`flex items-center gap-4 p-3 mb-2 rounded-md cursor-pointer hover:bg-gray-100 transition ${selectedApplicant?.id === applicant.id ? "bg-gray-200" : ""
                      }`}
                    onClick={() => setSelectedApplicant(applicant)}
                  >
                    <UserAvatar avatarUrl={applicant.user.avatarUrl} size={1000} />
                    <div>
                      <h3 className="text-sm font-medium">
                        {applicant.firstName} {applicant.lastName}
                      </h3>
                      <p className="text-xs text-gray-500 truncate w-48">{applicant.email}</p>
                      <span className="text-xs text-gray-400">
                        Applied on: {formatRelativeDate(applicant.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No applications received yet.</div>
              )}
            </div>
          </Suspense>

          {/* Applicant Details */}
          <Suspense fallback={<Loader2 className="mx-auto" />}>
            <div className="col-span-2 bg-white shadow-md rounded-lg p-6 overflow-y-auto h-[500px] no-scrollbar">
              {selectedApplicant && (
                <div>
                  {/* Header Section */}
                  <div className="flex items-center gap-4">
                    <UserAvatar
                      className="w-20 h-20"
                      avatarUrl={selectedApplicant.user.avatarUrl}
                      size={1000}
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {selectedApplicant.firstName} {selectedApplicant.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">{selectedApplicant.email}</p>
                      <p className="text-sm text-gray-400">
                        Phone: {selectedApplicant.countryCode} {selectedApplicant.phone}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-4 mt-4">
                    <button
                      className="border border-[#f26744] uppercase text-[#f26744] px-4 py-2 rounded-full hover:bg-[#f26744] hover:text-white transition"
                      onClick={() => router.push(`/profile/${selectedApplicant.user.username}`)}
                    >
                      See profile
                    </button>
                  </div>

                  {/* Insights from Profile */}
                  <h2 className="mt-8 text-md font-semibold text-[#f26744] uppercase">
                    Insights from profile
                  </h2>

                  {/* Experience */}
                  <h3 className="mt-6 text-md font-semibold text-gray-700">Experience</h3>
                  {selectedApplicant.experienceList.map((exp, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-sm font-medium">{exp.role}</p>
                      <p className="text-xs text-gray-500">{exp.company}</p>
                    </div>
                  ))}

                  {/* Education */}
                  <h3 className="mt-6 text-md font-semibold text-gray-700">Education</h3>
                  {selectedApplicant.educationList.map((edu, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-sm font-medium">{edu.degree}</p>
                      <p className="text-xs text-gray-500">{edu.institution}</p>
                    </div>
                  ))}

                  {/* Skills */}
                  <h3 className="mt-6 text-md font-semibold text-gray-700">Skills</h3>
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

                  {/* Achievements */}
                  <h3 className="mt-6 text-md font-semibold text-gray-700">Achievements</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedApplicant.achievements.split(", ").map((achievement, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>

                  {/* Preferred Location */}
                  <h3 className="mt-6 text-md font-semibold text-gray-700">Preferred Location</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedApplicant.preferredLocation}
                  </p>

                  {/* Salary Expectations */}
                  <h3 className="mt-6 text-md font-semibold text-gray-700">Salary Expectations</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Current: {selectedApplicant.currentSalary} | Expected: {selectedApplicant.expectedSalary}
                  </p>

                  {/* Languages */}
                  <h3 className="mt-6 text-md font-semibold text-gray-700">Languages</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedApplicant.language.split(", ").map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                      >
                        {lang}
                      </span>
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
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;