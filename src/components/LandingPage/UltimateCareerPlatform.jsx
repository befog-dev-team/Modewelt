"use client";
import Image from "next/image";
import Link from "next/link";
import Professionals from "../../../public/Images/landing1.png";

export default function UltimateCareerPlatform() {
  return (
    <div className="relative bg-white lg:min-h-[718px] flex flex-col items-center p-6 pt-32 md:pt-48 lg:pb-20 sm:pb-10 overflow-visible -mt-24 z-0">
      {/* Background Image flipped horizontally */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-x-[-1]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1566924119080-9b37796cb157?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHx3b3JraW5nJTIwY29ycG9yYXRlJTIwbmFtZXN8ZW58MHx8MHx8fDA%3D')"
        }}
      ></div>
      {/* Unique Transition: Feathered Top Edge */}
      <div 
        className="absolute inset-0 z-0 backdrop-blur-[4px]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.8) 15%, rgba(255, 255, 255, 0.8) 100%)",
          maskImage: "linear-gradient(to top, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 85%, transparent 100%)",
        }}
      ></div>

      {/* Bottom Gradient Blend (to WhyChooseSection background) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-0"
        style={{
          background: "linear-gradient(to top, white, transparent)"
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="max-w-[750px] w-full text-center lg:px-[90px] lg:py-[101px] p-6 md:p-12 rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7b4fff]">
            The Ultimate Career Platform for{" "}
            <span className="gradient-text">Designers</span> Professionals
          </h1>
          <p className="mt-2 text-lg text-gray-700 font-bold">
            Build Your Fashion Career with Modeweltjob
          </p>
        </div>

        <section className="max-w-6xl w-full grid md:grid-cols-2 items-center gap-8">
          <div className="flex justify-center">
            <div className="w-full rounded-lg">
              <Image
                src={Professionals}
                alt="Fashion industry career opportunities"
                className="w-full max-w-md h-64"
              />
            </div>
          </div>

          <div className=" font-semibold text-center md:text-left">
            <p className="mt-4 text-gray-1000">
              Are you a fashion designer, stylist, photographer, or industry
              expert looking for the right opportunities? Modeweltjob is here to
              connect you with top brands, recruiters, and creative
              professionals worldwide. Whether you&apos;re starting your journey
              or leveling up your career, Modeweltjob makes it easier for you to
              showcase your talent and get hired.
            </p>
            <Link
              href="/auth?mode=signup"
              prefetch={true}
              className="inline-block mt-6 bg-[#fc3fb4] font-bold text-white px-6 py-2 rounded-md shadow-md hover:bg-[#fc3fb4] transition-all duration-300"
            >
              Register Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
