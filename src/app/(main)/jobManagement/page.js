"use client";

import { useRouter } from "next/navigation";

import MyJobSection from "@/components/Jobs/MyJobSection";

export default function JobManagementPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-white/75 backdrop-blur-[1px] -z-10"></div>

      <div className="px-4 lg:px-8 relative z-10">
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
