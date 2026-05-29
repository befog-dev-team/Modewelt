"use client";

import { useRouter } from "next/navigation";

import MyJobSection from "@/components/Jobs/MyJobSection";

export default function JobManagementPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 opacity-[0.25]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-white/75 dark:bg-black/80 backdrop-blur-[1px] -z-10 transition-colors"></div>

      <div className="px-4 lg:px-8 relative z-10 min-h-screen">
        <div className="flex flex-col md:flex-row items-start p-4 md:p-6 lg:p-8 gap-6">
          {/* Sidebar Menu */}
          <aside className="w-full md:w-1/4 bg-white dark:bg-gray-950 shadow-md rounded-lg p-4 min-h-full mt-11 border dark:border-gray-800 transition-colors">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white transition-colors">
              <i className="ri-briefcase-line text-[#f26744]"></i>
              Manage Your Jobs
            </h3>
            <hr className="my-2 border-gray-200 dark:border-gray-800" />
            <ul className="space-y-2">
              <li
                className="cursor-pointer text-[#f26744] font-bold"
                onClick={() => router.push("/jobManagement")}
              >
                My Jobs
              </li>
              <li
                className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#f26744] dark:hover:text-[#f26744] transition-colors"
                onClick={() => router.push("/postJob")}
              >
                Post a Job
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center text-[#f26744] mb-4 leading-tight">
              My Jobs
            </h3>

            {/* Jobs List */}
            <section className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 sm:p-6 h-[78vh] overflow-y-auto no-scrollbar border dark:border-gray-800 transition-colors">
              <MyJobSection />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
