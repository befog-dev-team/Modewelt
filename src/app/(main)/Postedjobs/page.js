"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Bg from "../../../../public/assets/jobmenu/image.png";
import { FaEllipsisH } from "react-icons/fa";

const fetchJobs = async () => {
  return [
    { id: 1, title: "Illustration Designer", company: "Company Name", location: "Lucknow, Uttar Pradesh, India (Hybrid)", posted: "Created 2mo Ago", status: "Completed" },
    { id: 2, title: "UI/UX Designer", company: "Another Company", location: "Bangalore, India (Remote)", posted: "Created 1mo Ago", status: "Active" },
    { id: 3, title: "Frontend Developer", company: "Tech Corp", location: "Mumbai, India (Hybrid)", posted: "Created 3mo Ago", status: "Draft" },
  ];
};

export default function PostedJobs() {
  const [filter, setFilter] = useState("All");
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div className="bg-[#a2defa] min-h-screen">
      <Navbar />
      <div className="px-4 lg:px-8 lg:my-6 space-y-10 lg:space-y-0 lg:space-x-14">
        <div className="flex flex-col md:flex-row p-4 md:p-6 lg:p-8">
          {/* Sidebar Menu */}
          <aside className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <i className="ri-briefcase-line text-[#f26744]"></i> MANAGE YOUR JOBS
            </h3>
            <hr className="my-2" />
            <ul className="space-y-2">
              <li className="cursor-pointer text-gray-700 hover:text-[#f26744]" onClick={() => router.push("/Myjobs")}>
                My Jobs
              </li>
              <li className="cursor-pointer text-[#f26744] font-semibold" onClick={() => router.push("/Postedjobs")}>
                Posted Job
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4 mt-6 md:mt-0 md:ml-6">
            <h2 className="text-xl font-semibold text-center text-[#f26744]">POSTED JOBS</h2>
            <div className="flex justify-center gap-2 my-4">
              {["All", "Draft", "Completed", "Active"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 border rounded-full text-sm ${filter === status ? "bg-[#f26744] text-white" : "border-gray-300 text-gray-600"}`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Jobs List */}
            <section className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-4 p-4 border-b last:border-none cursor-pointer" onClick={() => router.push(`/Jobpostdetail/${job.id}`)}>
                    <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400">Posted - {job.posted}</p>
                      <p className="text-green-600 text-sm font-medium">{job.status}</p>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaEllipsisH className="text-2xl" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center w-full bg-white p-6 rounded-lg mb-6">
                  <Image src={Bg} alt="No jobs found" />
                  <h2 className="mt-4 text-lg font-semibold text-gray-700">No Recent Job Activity</h2>
                  <p className="text-gray-500 text-center px-4">Find new opportunities and manage your job search progress here.</p>
                  <button className="mt-4 bg-[#ba669d] text-white px-6 py-2 rounded-full hover:bg-[#9d4f80]">
                    SEARCH JOB
                  </button>
                </div>
              )}
              <div className="text-center mt-4 text-gray-600">See All</div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}