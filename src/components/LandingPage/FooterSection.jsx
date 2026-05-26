"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentYear } from "@/lib/utils";

export default function FooterSection() {
  const router = useRouter();
  return (
    <>
      <div className="relative -mt-24 z-0 overflow-visible">
        {/* Background Color with feathering */}
        <div 
          className="absolute -top-24 left-0 right-0 bottom-0 z-0"
          style={{ 
            backgroundColor: "#edf2f7",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
          }}
        ></div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="max-w-[1192px] w-full my-8 border-t border-[#fc3fb4] p-[4px]" />
          <div className="text-center">
            <h3 className="text-2xl font-bold text-black">
              Let&apos;s hire your next great candidate
            </h3>
            <p className="text-black mt-6">
              A hiring platform built to solve for relevancy, volume and speed of
              hiring
            </p>
            <div className="mt-6 grid lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-center sm:justify-start">
              <Link 
                href="/auth" 
                prefetch={true}
                className="px-6 py-3 bg-[#fc3fb4] text-white font-semibold rounded-lg shadow-md hover:bg-[#fc3fb4] w-full sm:w-auto text-center"
              >
                Login/Sign up
              </Link>
              <Link 
                href="#contact" 
                prefetch={true}
                className="px-6 py-3 border border-[#fc3fb4] text-[#fc3fb4] font-semibold rounded-lg hover:bg-white/50 backdrop-blur-sm transition w-full sm:w-auto text-center"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full flex justify-center items-center bg-[#edf2f7] text-gray-600 py-8 border-t border-[#fc3fb4]/20">
        <div className="border-gray-700 text-sm">
          <p>© {getCurrentYear()} Modeweltjob | All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
