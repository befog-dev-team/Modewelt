"use client";

import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PostJob = () => {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");

  const handleChange = (e) => {
    setJobTitle(e.target.value);
  }

  const handleContinue = (e) => {
    e.preventDefault();
    if (jobTitle.trim() === "") {
      toast.error("Please enter a job title");
      return;
    }
    router.push(`/jobDescription?jobTitle=${encodeURIComponent(jobTitle)}`)
  };

  return (
    <div className="flex items-center m-5 w-full bg-[#ffffff] shadow-md rounded-lg justify-center h-[85vh]">
      <div className="w-full max-w-[50rem] h-auto p-6">
        <h1 className="text-4xl font-bold text-center text-[#a35285]">Post a job</h1>
        <p className="mt-2 text-center text-gray-600">Increase the quality of your hire</p>
        <form className="mt-6 flex flex-col items-center">
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={handleChange}
            placeholder="Title"
            className="w-full max-w-[506px] px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a35285] focus:outline-none"
            required
          />
          {/* Wrap the button with the Link component */}
          <button
            onClick={handleContinue}
            type="submit"  // Change to "button" because it's now wrapped in a Link
            className="w-full max-w-[506px] px-4 py-2 mt-4 text-white bg-[#a35285] rounded-lg hover:bg-[#92406d] focus:outline-none"
          >
            Continue
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          If you write with AI, we’ll use the job title and details from your company page to suggest a job post.{' '}
          <a href="#" className="text-[#a35285] hover:underline">
            Learn more
          </a>
        </p>
        <p className="mt-2 text-sm text-center text-gray-500">
          Limits may apply to free job posts.{' '}
          <a href="#" className="text-[#a35285] hover:underline">
            View our policy
          </a>
        </p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[90vh] w-full flex items-center justify-center">
        <PostJob />
      </div>
    </div>
  );
};

export default Page;