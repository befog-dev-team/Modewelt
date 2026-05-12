"use client";
import Image from "next/image";
import Link from "next/link";
import Admin from "../../../public/Images/admin.png";

export default function StartPostingSection() {
  return (
    <div className="lg:pt-16 sm:pt-4 bg-transparent">
      <section className="max-w-[1192px] w-full flex flex-col md:flex-row items-center justify-between bg-[#4640de] text-white p-8 md:p-16 m-auto gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start posting jobs today
          </h1>
          <p className="text-lg mb-6">Start posting jobs for only Free.</p>
          <Link 
            href="/auth" 
            prefetch={true}
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Sign Up For Free
          </Link>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src={Admin}
            alt="Dashboard Preview"
            width={600}
            height={400}
            className="rounded-md shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
