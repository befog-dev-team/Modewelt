"use client";

import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatRelativeDate } from "@/lib/utils";


export default function JobListing() {
  // Function to fetch job data from API
  const fetchJob = async (id) => {
    const response = await axios.get(`/api/jobs/${id}`);
    return response.data;
  };

  const router = useRouter(); // ✅ Moved inside the component

  const { id } = useParams(); // Get the job id from the URL
  if (!id) notFound(); // Redirect to 404 page if id is not provided

  // Using useQuery to fetch and cache job data
  const { data: job, error, isLoading } = useQuery({
    queryKey: ["job", id], // Cache key based on the job id
    queryFn: () => fetchJob(id), // Fetch function
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
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

  const jobStatus = new Date(job.expirationDate) > new Date() ? "Active" : "Expired";
  const formattedExpirationDate = new Date(job.expirationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gradient-to-b from-[#dcf59d] to-[#f6f7f2] dark:from-black dark:to-gray-950 min-h-screen transition-colors">
      <Navbar />
      <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto">
        <motion.div
          className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg p-6 space-y-6 border dark:border-gray-800 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Job Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="w-full my-4 bg-gradient-to-r from-[#f6f7f2] to-[#ffffff] dark:from-gray-800 dark:to-gray-900/50 py-6 px-8 rounded-xl shadow-sm border dark:border-gray-700 transition-colors">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors">{job.jobTitle}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors">
                {job.company} | {job.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
                {job.jobType} • {job.workplaceType} • {job.salaryAmount} {job.salaryCurrency} {job.salaryType}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Posted: {formatRelativeDate(job.createdAt)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Expires: {formattedExpirationDate}</p>
              <span className={`text-sm font-semibold ${jobStatus === "Active" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                {jobStatus}
              </span>
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-end">
                <button
                  className="bg-white border-[#f26744] border-2 text-[#f26744] px-6 py-2 rounded-[4rem] hover:bg-[#f26744] hover:text-white transition w-full sm:w-auto"
                  onClick={() => router.push(`/Applicants/${job.id}`)}
                >
                  View Applicants
                </button>
              </div>
            </div>

            {/* Job Performance */}
            {/* <div className="w-full lg:w-1/3 my-4 bg-gradient-to-r from-[#f6f7f2] to-[#ffffff] py-6 px-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Job Performance</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-700 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Applicants:</p>
                  <p className="font-bold text-lg">{job.applicants || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Views:</p>
                  <p className="font-bold text-lg">{job.jobViews || "N/A"}</p>
                </div>
              </div>
            </div> */}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 my-6 transition-colors"></div>

          <Section title="About the Role">
            <p className="text-gray-700 dark:text-gray-300">{job.jobTitle}</p>
          </Section>

          {/* Job Details */}
          <Section title="Job Description">
            <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
          </Section>

          <Section title="Job Level">
            <p className="text-gray-700 dark:text-gray-300">{job.jobLevel}</p>
          </Section>

          <Section title="Requirements">
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{job.requirements || "No requirements listed."}</li>
            </ul>
          </Section>

          <Section title="What We Offer">
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{job.benefits || "No benefits listed."}</li>
            </ul>
          </Section>

          <Section title="Skills">
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {job.skills && job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </Section>

          <Section title="Salary Details">
            <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Amount:</p>
                <p className="font-bold">{job.salaryAmount} {job.salaryCurrency}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type:</p>
                <p className="font-bold">{job.salaryType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Country:</p>
                <p className="font-bold">{job.salaryCountry}</p>
              </div>
            </div>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div className="w-full">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-4 transition-colors">{title}</h2>
    <div className="text-gray-700 dark:text-gray-300 transition-colors">{children}</div>
  </div>
);