"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Landing from "../../../public/Images/landingsec.png";
import { FaUserFriends, FaFileAlt, FaFilter } from "react-icons/fa";

const features = [
  {
    icon: <FaUserFriends className="text-[#7b4fff] text-4xl" />,
    title: "Unlimited Profile Views",
    description:
      "Review endless profiles free-of-cost. Pay only when you want to contact suitable candidates",
  },
  {
    icon: <FaFileAlt className="text-[#7b4fff] text-4xl" />,
    title: "All Fashion Jobs in One Place",
    description:
      "Find top fashion jobs on ModeweltJob.com without the hassle of searching multiple sites.",
  },
  {
    icon: <FaFilter className="text-[#7b4fff] text-4xl" />,
    title: "Direct Access to Top Brands",
    description:
      "Connect with leading fashion houses, startups, and established brands for job opportunities.",
  },
];

const searchOptions = [
  {
    id: 1,
    title: "Saves Time and Effort",
    description:
      "Users can find and apply for jobs instantly without wasting time surfing across multiple platforms.",
  },
  {
    id: 2,
    title: "Area-based Search",
    description: "Find candidates based on specific geographic locations",
  },
  {
    id: 3,
    title: "Tailored for Fashion Enthusiasts",
    description:
      "Unlike general job portals, ModeweltJob.com focuses exclusively on the fashion industry, providing highly relevant opportunities.",
  },
];

export default function HireActiveSection() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="p-6 md:p-12 min-h-[50vh] rounded-xl bg-transparent flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="h-[400px] rounded-xl flex justify-center">
          <Image
            src={Landing}
            alt="Modeweltjob Hiring Platform"
            className="rounded-xl object-cover w-full h-full"
          />
        </div>

        <div className="space-y-6">
          <p className="text-[#7b4fff] uppercase text-sm font-bold tracking-wider">
            Modeweltjob Database
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Quickly hire active jobseekers around your office.
          </h2>

          <div className="space-y-3">
            {searchOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => toggleExpand(option.id)}
                className="cursor-pointer border-b pb-2 transition-all duration-300"
              >
                <p className="font-semibold">{option.title}</p>
                {expanded === option.id && (
                  <p className="text-gray-600 text-sm">
                    {option.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <Link 
            href="/auth"
            prefetch={true}
            className="block mt-4 text-center bg-[#fc3fb4] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#e635a3] transition-all duration-300 font-bold"
          >
            Search Candidates
          </Link>
        </div>
      </div>

      <div className="mt-12 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {feature.icon}
            <h3 className="font-semibold mt-2 text-lg">{feature.title}</h3>
            <p className="text-black text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
