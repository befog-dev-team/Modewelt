import React from "react";
// import Image from "next/image";

// Left Sections
import NewJobSection from "../../../components/Jobs/NewJobSection";
// import SortBySection from "../../../components/Jobs/SortBySection";
// import MoreJobSection from "../../../components/Jobs/MoreJobSection";
// Right Sections
// import PostJobSection from "../../../components/Jobs/PostJobSection";
// import MySearchSection from "../../../components/Jobs/MySearchSection";
import Navbar from "@/components/Navbar";
import JobMenu from "../../../components/Jobs/Jobmenu/page";
// import Footer from "@/components/Footer";

// const jobList = [
//   { title: "Fashion Designer", company: "Company Name" },
//   { title: "Product Designer", company: "Company Name" },
// ];

export const metadata = {
  title: "Jobs",
  description: "Jobs page for showing jobs",
};

export default function Jobs() {
  return (
    <div className="bg-[#dcf59d] min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center mt-12 space-y-10 lg:space-y-0 lg:space-x-14 px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex flex-col w-full lg:w-[850px] mb-8 lg:mb-0">
          {/* New Job Section */}
          <NewJobSection />

          {/* Sort By Section */}
          {/* <SortBySection headingText="Jobs For You" /> */}

          {/* Sort By Section */}
          {/* <SortBySection headingText="New Jobs" /> */}

          {/* More Job Section */}
          {/* <MoreJobSection /> */}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[290px] hidden lg:block">
          {/* Post Job Section */}
          {/* <PostJobSection /> */}

          {/* My Search Section */}
          {/* <MySearchSection /> */}

          {/* Job Menu Section */}
          <JobMenu />

          {/* Trending Job Section */}
          {/* <div className="bg-white h-[245px] shadow-lg mb-4 rounded-lg p-4">
            <p className="font-bold px-5 pt-4 pb-2">Tracked Jobs</p>
            <hr className="border-t border-gray-300 mt-2" />

            <div className="space-y-4 px-3 py-6 overflow-y-auto">
              {jobList.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 border border-[#F4F4F4] rounded-md p-2 transition-shadow duration-300 hover:shadow-md"
                >
                  <Image
                    src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
                    alt={`${job.title} Thumbnail`}
                    width={32}
                    height={32}
                    className="rounded-full object-cover h-[32px]"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {job.title}
                    </p>
                    <p className="text-xs text-gray-500">{job.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Trending Articles Section */}
          {/* <div className="bg-white h-[400px] p-4 shadow-lg">
            <p className="font-bold py-3">Articles for you</p>
            <hr className="border-t border-gray-300 mt-2" />
            <div className="w-full flex-wrap space-y-4">
              {[{
                title: "The guide. Apply for a job",
                viewers: "12,932 viewers",
              }, {
                title: "Your dream job and how you can g",
                viewers: "9,112 viewers",
              }, {
                title: "Now you know it. 15 steps to find job",
                viewers: "7,221 viewers",
              }].map((article, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 space-y-2"
                >
                  <Image
                    width={100}
                    height={100}
                    src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
                    alt="Trending Article"
                    className="w-[80px] h-[52px] object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium text-sm">{article.title}</p>
                    <span className="text-xs">{article.viewers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
