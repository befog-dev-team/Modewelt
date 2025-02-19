"use client";

import { useState } from "react";
import Image from "next/image";
import profile from "../../../../../public/navbar/profile.jpg";

const applicants = [
  { name: "Ashley Brown", username: "@ashley", avatar: profile },
  { name: "Javier Holloway", username: "@javier", avatar: profile },
  { name: "Stephen Harris", username: "@stephen", avatar: profile },
  { name: "Richard Walters", username: "@richard", avatar: profile },
  { name: "Michael Simon", username: "@michael", avatar: profile },
  { name: "Melissa Bradley", username: "@melissa", avatar: profile },
  { name: "Victoria Griffin", username: "@victoria", avatar: profile },
];

export default function ApplicantsDetails() {
  const [selectedApplicant, setSelectedApplicant] = useState(
    applicants.length > 0 ? applicants[0] : null
  );
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

  const handleDownload = () => {
    // Trigger file download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    setShowResumeModal(false);
    setShowDownloadSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowDownloadSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg text-[#303940] font-semibold mb-4">
          Specialist Name
        </h2>
        <ul>
          {applicants.map((applicant, index) => (
            <li
              key={index}
              onClick={() => setSelectedApplicant(applicant)}
              className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-gray-200"
            >
              <Image
                src={applicant.avatar}
                alt={applicant.name}
                width={32}
                height={32}
                className="rounded-full w-10 h-10"
              />
              <span className="text-[#303940]">{applicant.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Applicant Details */}
      <div className="flex-1 w-1/3 bg-white ml-2 p-6 rounded-lg shadow-md">
        <h2 className="text-lg  text-[#303940] font-semibold mb-4">
          Applicant Details
        </h2>
        {selectedApplicant ? (
          <div className="flex flex-col items-center gap-4 m-auto">
            <Image
              src={selectedApplicant?.avatar}
              alt={selectedApplicant?.name}
              width={80}
              height={80}
              className="rounded-full w-40 h-40"
            />
            <div className="">
              <h3 className="text-xl text-[#303940] font-semibold">
                {selectedApplicant?.name}
              </h3>
              <p className="text-gray-500 text-center">
                {selectedApplicant?.username}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No applicant selected</p>
        )}
      </div>

      {/* Job Description */}
      <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
        {/* Job Details */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-[#303940]">Job Description</h2>
            <p className="my-2">
              <span className="font-bold text-[#303940]">Job Name –</span>{" "}
              <span className="text-[#303940]">Fashion Designer Intern</span>
            </p>
            <p className="my-2">
              <span className="font-bold text-[#303940]">Company Name –</span>{" "}
              <span className="text-[#303940]">XYZ Company</span>
            </p>
            <p className="my-2">
              <span className="font-bold text-[#303940]">Address –</span>{" "}
              <span className="text-[#303940]">XYZ Company</span>
            </p>
          </div>

          {/* Image Placeholder */}
          <Image
            src={profile}
            alt="name"
            width={32}
            height={32}
            className="rounded-lg w-20 h-20"
          />
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Description */}
        <div>
          <h3 className="text-lg font-bold text-[#303940]">Description</h3>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        {/* See Resume Button */}
        <div className="mt-6">
          <button 
            onClick={() => setShowResumeModal(true)} 
            className="bg-[#a35285] text-white px-6 py-2 rounded-md hover:bg-[#8a3d6c]"
          >
            See Resume
          </button>
        </div>
      </div>

      {/* Resume Modal */}
      {showResumeModal && (
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
              className="bg-[#a35285] text-white px-4 py-2 rounded hover:bg-[#8a3d6c] inline-block"
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
            <p className="text-[#000000] font-semibold">
              Successfully Downloaded!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}