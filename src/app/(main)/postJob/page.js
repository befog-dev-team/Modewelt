"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import toast  from "react-hot-toast";

const jobTitleSuggestions = [
  // Fashion
  "Fashion Designer", "Fashion Stylist", "Fashion Merchandiser", "Textile Designer",
  "Visual Merchandiser", "Fashion Photographer", "Fashion Illustrator", "Pattern Maker",
  "Production Coordinator (Garment)", "Boutique Manager", "Fashion Marketing Specialist",
  
  // Programming & Tech
  "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "UI/UX Designer", "Product Manager", "Data Scientist", "Mobile App Developer",
  "DevOps Engineer", "AI/Machine Learning Engineer", "Cybersecurity Analyst",
  "Cloud Architect", "Game Developer", "QA Engineer", "IT Project Manager",
  
  // Makeup & Beauty
  "Makeup Artist", "Professional Esthetician", "Hair Stylist", "Beauty Consultant",
  "Cosmetic Scientist", "Special Effects (SFX) Makeup Artist", "Bridal Stylist",
  "Nail Technician", "Salon Manager", "Skin Care Specialist",
  
  // Art & Creative
  "Fine Artist", "Art Director", "Creative Director", "Illustrator", "Animator",
  "Motion Designer", "Graphic Designer", "Sketch Artist", "Art Curator",
  "Video Editor", "Concept Artist", "Gallery Manager", "Interior Designer",
  "3D Modeler", "UX Researcher",
  
  // Business & Other
  "Digital Marketing Manager", "Social Media Coordinator", "Content Creator",
  "Operations Manager", "Sales Executive", "Accountant", "Human Resources Manager",
  "Public Relations Manager", "E-commerce Manager", "Copywriter",
];

const PostJob = () => {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setJobTitle(value);

    if (value.length > 0) {
      const filtered = jobTitleSuggestions.filter((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 10)); // Limit to top 10 for better UX
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setJobTitle(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (jobTitle.trim() === "") {
      toast.error("Please enter a job title");
      return;
    }
    router.push(`/jobDescription?jobTitle=${encodeURIComponent(jobTitle)}`);
  };

  return (
    <div className="flex items-center m-5 w-full bg-white shadow-md rounded-lg justify-center h-[85vh]">
      <div className="w-full max-w-[50rem] h-auto p-6">
        <h1 className="text-4xl font-bold text-center text-[#f26744]">Post a job</h1>
        <p className="mt-2 text-center text-gray-600">Increase the quality of your hire</p>
        <form className="mt-6 flex flex-col items-center relative">
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <div className="relative w-full max-w-[506px]">
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={handleChange}
              placeholder="Title"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26744] focus:outline-none"
              autoComplete="off"
              required
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden no-scrollbar">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm border-b last:border-0 transition-colors"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Wrap the button with the Link component */}
          <button
            onClick={handleContinue}
            type="submit"
            className="w-full max-w-[506px] px-4 py-2 mt-4 text-white bg-[#f26744] rounded-lg hover:bg-[#8354f5] transition-colors focus:outline-none shadow-lg shadow-orange-500/10"
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