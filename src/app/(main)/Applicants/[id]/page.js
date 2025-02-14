"use client";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import pdf from "../../../../../public/assets/Applicants/pdf.png";

const applicantsData = [
  {
    id: 1,
    name: "Aditya Kanaujiya",
    profilePic: "/profile.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    appliedAgo: "3 months ago",
    role: "Illustration Designer",
    location: "Noida, Uttar Pradesh, India",
    experience: [
      {
        title: "Fashion Designer",
        company: "Self Employed",
        location: "Global",
        duration: "Jun 2016 – Present",
        time: "3 yrs 3 mos",
      },
    ],
    education: [
      {
        university: "XYZ University, India",
        details: "BFA in Fashion Design",
        duration: "2013 – 2017",
        extra: "Advanced courses in illustration and design trends.",
      },
    ],
    resume: "aditya.kumar-resume.pdf",
  },
  {
    id: 2,
    name: "Sneha Sharma",
    profilePic: "/profile2.jpg",
    description: "Graphic designer specializing in UI/UX and branding.",
    appliedAgo: "1 month ago",
    role: "Graphic Designer",
    location: "Mumbai, Maharashtra, India",
    experience: [
      {
        title: "UI/UX Designer",
        company: "Design Studios",
        location: "Mumbai, India",
        duration: "Jan 2018 – Present",
        time: "5 yrs 2 mos",
      },
    ],
    education: [
      {
        university: "ABC Institute of Design",
        details: "Diploma in Graphic Design",
        duration: "2014 – 2016",
        extra: "Specialized in web and mobile app design.",
      },
    ],
    resume: "sneha.sharma-resume.pdf",
  },
];

const ApplicantsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [selectedApplicant, setSelectedApplicant] = useState(applicantsData[0]);

  const job = {
    id,
    title: "Illustration Designer",
    company: "Befog (AEW Technology)",
    location: "Lucknow, Uttar Pradesh, India (Hybrid)",
    closedAgo: "2 months ago",
    type: "Free job post",
    views: 255,
  };

  return (
    <div className="min-h-screen bg-[#a2defa]">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Job Details Card */}
        <div className="bg-white shadow-md rounded-lg border p-6">
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-gray-500">
            {job.company} · {job.location}
          </p>
          <p className="text-sm text-gray-400">
            Closed {job.closedAgo} · {job.type} · {job.views} views
          </p>
          <div className="flex gap-4 mt-4 justify-end">
            <button
              className="border border-[#f26744] text-[#f26744] px-4 py-2 rounded-full hover:bg-[#f26744] hover:text-white transition"
              onClick={() => router.push(`/Applicants/${job.id}`)}
            >
              View Applicants
            </button>
            {/* <button className="border border-[#f26744] text-[#f26744] px-4 py-2 rounded-full hover:bg-[#f26744] hover:text-white transition">
              Repost Job
            </button> */}
          </div>
        </div>

        {/* Applicants Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Applicants List */}
          <div className="bg-white shadow-md rounded-lg p-4 overflow-y-auto h-[500px]">
            <h2 className="text-lg font-semibold text-[#f26744] mb-4">
              Applicants
            </h2>
            {applicantsData.map((applicant) => (
              <div
                key={applicant.id}
                className={`flex items-center gap-4 p-3 mb-2 rounded-md cursor-pointer hover:bg-gray-100 transition ${
                  selectedApplicant.id === applicant.id ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedApplicant(applicant)}
              >
                <Image
                  src={applicant.profilePic}
                  alt={applicant.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-medium">{applicant.name}</h3>
                  <p className="text-xs text-gray-500 truncate w-48">
                    {applicant.description}
                  </p>
                  <span className="text-xs text-gray-400">
                    {applicant.appliedAgo}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Applicant Details */}
          <div className="col-span-2 bg-white shadow-md rounded-lg p-6 overflow-y-auto h-[500px]">
            <div className="flex items-center gap-4">
              <Image
                src={selectedApplicant.profilePic}
                alt={selectedApplicant.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {selectedApplicant.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedApplicant.description}
                </p>
                <p className="text-sm font-medium text-[#f26744]">
                  {selectedApplicant.role}
                </p>
                <p className="text-sm text-gray-400">
                  {selectedApplicant.location}
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="border border-[#f26744] uppercase text-[#f26744] px-4 py-2 rounded-full hover:bg-[#f26744] hover:text-white transition"
                onClick={() => router.push(`/Applicants/${job.id}`)}
              >
                See profile
              </button>
              <button className="border border-[#f26744] text-[#f26744] px-4 py-2 rounded-full hover:bg-[#f26744] hover:text-white uppercase transition">
                Message
              </button>
            </div>
            <h2 className="mt-8 text-md font-semibold text-[#f26744] uppercase">Insights from profile</h2>
            <h3 className="mt-6 text-md font-semibold text-gray-700">
              Experience
            </h3>
            {selectedApplicant.experience.map((exp, index) => (
              <div key={index} className="mt-2">
                <p className="text-sm font-medium">{exp.title}</p>
                <p className="text-xs text-gray-500">
                  {exp.company} - {exp.location}
                </p>
                <p className="text-xs text-gray-400">
                  {exp.duration} ({exp.time})
                </p>
              </div>
            ))}
            <h3 className="mt-6 text-md font-semibold text-gray-700">Resume</h3>
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md mt-2">
              <Image src={pdf} alt="pdf" />
              <span className="text-sm text-gray-600">
                {selectedApplicant.resume}
              </span>
              <a
                href={`/${selectedApplicant.resume}`}
                download
                className="ml-auto text-[#f26744] text-2xl my-4"
              >
                <MdOutlineFileDownload />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
