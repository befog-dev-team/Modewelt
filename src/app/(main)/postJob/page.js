"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import toast  from "react-hot-toast";

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
    <div className="flex items-center m-5 w-full bg-white shadow-md rounded-lg justify-center h-[85vh]">
      <div className="w-full max-w-[50rem] h-auto p-6">
        <h1 className="text-4xl font-bold text-center text-[#f26744]">Post a job</h1>
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
            className="w-full max-w-[506px] px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26744] focus:outline-none"
            required
          />
          {/* Wrap the button with the Link component */}
          <button
            onClick={handleContinue}
            type="submit"  // Change to "button" because it's now wrapped in a Link
            className="w-full max-w-[506px] px-4 py-2 mt-4 text-white bg-[#f26744] rounded-lg hover:bg-[#f26744] focus:outline-none"
          >
            Continue
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          If you write with AI, we’ll use the job title and details from your company page to suggest a job post.{' '}
          <a href="#" className="text-[#f26744] hover:underline">
            Learn more
          </a>
        </p>
        <p className="mt-2 text-sm text-center text-gray-500">
          Limits may apply to free job posts.{' '}
          <a href="#" className="text-[#f26744] hover:underline">
            View our policy
          </a>
        </p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 opacity-[0.25]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-white/75 backdrop-blur-[1px] -z-10"></div>

      <div className="h-[90vh] w-full flex items-center justify-center relative z-10">
        <PostJob />
      </div>
    </div>
  );
};

export default Page;