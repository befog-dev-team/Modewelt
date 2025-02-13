"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const jobData = {
  title: "Illustration Designer",
  company: "Befog (AEW Technology)",
  location: "Lucknow, Uttar Pradesh, India (Hybrid)",
  status: "Closed 2 months ago",
  type: "Free job post",
  views: 255,
  applicants: 100, // This is a number, not an object with an ID
  jobViews: 433,
  description:
    "We specialize in delivering innovative IT solutions tailored to meet business needs. From web and mobile app development to strategic IT consulting, we are committed to driving success through cutting-edge technology and personalized service.",
  role: "Front-End Developer Intern (Unpaid, 2-Month Internship)",
  duration: "2 Months (Unpaid)",
  responsibilities: [
    "Assist in building responsive and user-friendly web applications.",
    "Collaborate with the design and development teams to implement UI/UX designs.",
    "Debug and optimize front-end code for performance.",
    "Stay updated with the latest web development trends and technologies.",
  ],
  requirements: [
    "Knowledge of HTML, CSS, JavaScript, and basic front-end frameworks (React, Angular, or Vue.js).",
    "Understanding of responsive web design principles.",
    "Strong attention to detail and problem-solving skills.",
    "A passion for learning and coding.",
  ],
  offers: [
    "A certificate of completion at the end of the internship.",
    "Mentorship from experienced developers.",
    "The opportunity to work on live projects and build your portfolio.",
    "A pre-placement offer (PPO) if your performance exceeds expectations.",
  ],
};

export default function JobListing() {
  const router = useRouter(); // ✅ Moved inside the component

  return (
    <div className="bg-[#a2defa] min-h-screen">
      <Navbar />
      <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto">
        <motion.div
          className="rounded-xl overflow-hidden bg-[#f6f7f2] p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Job Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="w-full lg:w-3/4 my-4 bg-white py-6 px-8 rounded-xl">
              <h1 className="text-2xl font-bold">{jobData.title}</h1>
              <p className="text-gray-600">
                {jobData.company} | {jobData.location}
              </p>
              <p className="text-sm text-gray-500">
                {jobData.status} • {jobData.type} • {jobData.views} views
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-end">
                <button
                  className="bg-white border-[#f26744] border-2 text-[#f26744] px-4 py-2 rounded-[4rem] hover:bg-[#f26744] hover:text-white transition w-full sm:w-auto"
                  onClick={() => router.push(`/Applicants/${jobData._id}`)}
                >
                  View Applicants
                </button>
                <button className="bg-white border-[#f26744] border-2 text-[#f26744] px-4 py-2 rounded-[4rem] hover:bg-[#f26744] hover:text-white transition w-full sm:w-auto">
                  Repost Job
                </button>
              </div>
            </div>

            {/* Job Performance */}
            <div className="w-full lg:w-1/3 my-4 bg-white py-6 px-8 rounded-xl">
              <h2 className="text-lg font-semibold">Job Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-gray-700 mt-2">
                <p>
                  Applicants:{" "}
                  <span className="font-bold">{jobData.applicants}</span>
                </p>
                <p>
                  Views: <span className="font-bold">{jobData.jobViews}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          {/* Job Details */}
          <Section title="Job Description">{jobData.description}</Section>
          <Section title="About the Role">{jobData.role}</Section>
          <Section title="Duration">{jobData.duration}</Section>
          <Section title="Key Responsibilities">
            <ul className="list-disc list-inside space-y-2 ">
              {jobData.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title="Requirements">
            <ul className="list-disc list-inside space-y-2">
              {jobData.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title="What We Offer">
            <ul className="list-disc list-inside space-y-2">
              {jobData.offers.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div className="w-full">
    <h2 className="text-lg font-semibold mt-4">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </div>
);
