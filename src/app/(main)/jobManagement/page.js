"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MyJobSection from "@/components/Jobs/MyJobSection";

export default function JobManagementPage() {
  const router = useRouter();

  return (
    <div className="bg-[#dcf59d] min-h-screen">
      <Navbar />
      <div className="px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-start p-4 md:p-6 lg:p-8 gap-6">
          {/* Sidebar Menu */}
          <aside className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4 min-h-full">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <i className="ri-briefcase-line text-[#f26744]"></i>
              MANAGE YOUR JOBS
            </h3>
            <hr className="my-2" />
            <ul className="space-y-2">
              <li
                className="cursor-pointer text-[#f26744] font-semibold uppercase"
                onClick={() => router.push("/jobManagement")}
              >
                My Jobs
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h2 className="text-xl font-semibold text-center text-[#f26744] mb-4 uppercase">
              My Jobs
            </h2>

            {/* Jobs List */}
            <section className="bg-white shadow-md rounded-lg p-4 sm:p-6 h-[78vh] overflow-y-auto">
              <MyJobSection />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
