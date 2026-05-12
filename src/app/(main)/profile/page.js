"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Profile from "../../../components/Profile";
import profileimg from "../../../../public/assets/profile/backgroundImageBackrgound.png";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { MdEditSquare } from "react-icons/md";
import { FaEllipsisVertical } from "react-icons/fa6";
// import vector from "../../../../public/assets/profile/Vector.png";
import imageArticle from "../../../../public/assets/profile/imgarticle.png";
// import EditProfile from "@/components/Profile/EditProfile";
// import { RxCross2 } from "react-icons/rx";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import ProjectPage from "../../../components/Profile/Project";
import SkillsPage from "../../../components/Profile/Skills";
import Experience from "../../../components/Profile/Experience";
import ProjectPage2 from "../../../components/Profile/Project2";
import Postpage from "../../../components/Profile/Post";
import Commentpage from "../../../components/Profile/Comment";
import Videopage from "../../../components/Profile/Video";
import Imagepage from "../../../components/Profile/Images";
import Documentpage from "../../../components/Profile/Documents";
import Userprofile from "../../../components/Profile/UserProfile";

function Page() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("profile");
  const [activeSectionPost, setActiveSectionPost] = useState("post");

  const [activeTab, setActiveTab] = useState("events");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };
  const events = [
    {
      id: 1,
      title: "React Workshop for Beginners",
      date: "Mon, Dec 5, 6:00 PM",
      type: "online",
      organizer: "Aditya Kumar Kanaujiy",
      description:
        "Learn the basics of React.js and build your first web application.",
      applicants: 12524,
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      date: "Wed, Dec 7, 4:00 PM",
      type: "in-person",
      organizer: "Jane Doe",
      description:
        "Explore advanced CSS features, including Flexbox, Grid, and animations.",
      applicants: 5420,
    },
  ];

  const reminders = [
    {
      id: 1,
      title: "Submit Project Report",
      dueDate: "Thu, Dec 10, 12:00 PM",
      details: "Ensure all team members have contributed to the final report.",
    },
    {
      id: 2,
      title: "Schedule Team Meeting",
      dueDate: "Fri, Dec 11, 2:00 PM",
      details: "Discuss the project updates and the next steps.",
    },
  ];

  // const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

  // const toggleEditProfile = () => {
  //   setIsEditProfileVisible((prev) => !prev);
  // };

  return (
    <div className="bg-[#dcf59d]">
      <Navbar />
      <div className="h-auto w-full p-4">
        {/* Main content area */}
        <div className="flex flex-col lg:flex-row justify-center mt-12 space-y-10 lg:space-y-0 lg:space-x-14 px-4 lg:px-8">
          {/* Top section with image and info */}
          <div className="flex flex-col">
            {/* Left side with images and details */}
            <Userprofile />

            <div className="flex flex-wrap items-end border-b-[1px] border-[#E7E7E7] w-full max-w-[850px] mt-2">
              <button
                onClick={() => setActiveSection("profile")}
                className={`flex-1 min-w-[100px] flex justify-center items-center font-[Arial] text-[14px] md:text-[16px] font-bold transition-all duration-300 leading-[13.8px] ${activeSection === "profile"
                  ? "bg-[#fc3fb4] text-white rounded-t-[4px] cursor-pointer h-[51px]"
                  : "bg-white text-black h-[40px] cursor-pointer"
                  }`}
              >
                Profile
              </button>

              <button
                onClick={() => setActiveSection("activities")}
                className={`flex-1 min-w-[100px] flex justify-center items-center font-[Arial] text-[14px] md:text-[16px] font-semibold transition-all duration-300 leading-[13.8px] ${activeSection === "activities"
                  ? "h-[50px] bg-[#fc3fb4] text-white rounded-t-[4px] cursor-pointer"
                  : "bg-white text-black h-[40px] cursor-pointer"
                  }`}
              >
                Activity & Interests
              </button>

              <button
                onClick={() => setActiveSection("articles")}
                className={`flex-1 min-w-[100px] flex justify-center items-center font-[Arial] text-[14px] md:text-[16px] font-semibold transition-all duration-300 leading-[13.8px] ${activeSection === "articles"
                  ? "h-[50px] bg-[#fc3fb4] text-white rounded-t-[4px] cursor-pointer"
                  : "bg-white text-black h-[40px] cursor-pointer"
                  }`}
              >
                Articles (3)
              </button>
            </div>

            {/* Profile Section */}
            {activeSection === "profile" && (
              <div>
                <Profile />
                <ProjectPage />
                <SkillsPage />
                <Experience />
                <ProjectPage2 />
              </div>
            )}

            {/* Activities and Interests Section */}
            {activeSection === "activities" && (
              <div>
                <div
                  className="w-full max-w-[850px] mt-8 bg-[#ffffff] mx-auto"
                  style={{
                    height:
                      activeSectionPost === "post" ||
                        activeSectionPost === "comment"
                        ? "auto"
                        : activeSectionPost === "videos"
                          ? "auto"
                          : activeSectionPost === "images"
                            ? "auto"
                            : "auto",
                  }}
                >
                  <div>
                    <h1 className="text-lg sm:text-xl font-semibold py-3 px-4">
                      Recent Activities
                    </h1>
                  </div>

                  {/* Buttons for switching sub-sections */}
                  <div className="px-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveSectionPost("post")}
                      className={`border-2 border-[#A45286] rounded-md px-4 py-2 text-sm md:text-lg ${activeSectionPost === "post"
                        ? "bg-[#A45286] text-white"
                        : ""
                        }`}
                    >
                      Post
                    </button>
                    <button
                      onClick={() => setActiveSectionPost("comment")}
                      className={`border-2 border-[#A45286] rounded-md px-4 py-2 text-sm md:text-lg ${activeSectionPost === "comment"
                        ? "bg-[#A45286] text-white"
                        : ""
                        }`}
                    >
                      Comment
                    </button>
                    <button
                      onClick={() => setActiveSectionPost("videos")}
                      className={`border-2 border-[#A45286] rounded-md px-4 py-2 text-sm md:text-lg ${activeSectionPost === "videos"
                        ? "bg-[#A45286] text-white"
                        : ""
                        }`}
                    >
                      Videos
                    </button>
                    <button
                      onClick={() => setActiveSectionPost("images")}
                      className={`border-2 border-[#A45286] rounded-md px-4 py-2 text-sm md:text-lg ${activeSectionPost === "images"
                        ? "bg-[#A45286] text-white"
                        : ""
                        }`}
                    >
                      Images
                    </button>
                    <button
                      onClick={() => setActiveSectionPost("documents")}
                      className={`border-2 border-[#A45286] rounded-md px-4 py-2 text-sm md:text-lg ${activeSectionPost === "documents"
                        ? "bg-[#A45286] text-white"
                        : ""
                        }`}
                    >
                      Documents
                    </button>
                  </div>

                  {/* Dynamic content based on active post section */}
                  <div className="p-4">
                    {/* Post Section */}
                    {activeSectionPost === "post" && <Postpage />}
                    {activeSectionPost === "comment" && <Commentpage />}
                    {activeSectionPost === "videos" && <Videopage />}
                    {activeSectionPost === "images" && <Imagepage />}
                    {activeSectionPost === "documents" && <Documentpage />}
                  </div>
                </div>
                <div className="p-6 bg-[#FFFFFF] max-w-[850px] w-full min-h-fit">
                  {/* Header */}
                  <h1 className="text-xl font-bold mb-4">Events / Reminders</h1>

                  {/* Tabs */}
                  <div className="flex space-x-4 mb-6">
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded ${activeTab === "events"
                        ? "bg-[#a35285] text-white"
                        : "bg-white text-[#a35285] border border-[#a35285]"
                        }`}
                      onClick={() => handleTabSwitch("events")}
                    >
                      EVENTS
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded ${activeTab === "reminders"
                        ? "bg-[#a35285] text-white"
                        : "bg-white text-[#a35285] border border-[#a35285]"
                        }`}
                      onClick={() => handleTabSwitch("reminders")}
                    >
                      REMINDERS
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div>
                    {activeTab === "events" && (
                      <div className="space-y-6">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-start space-x-4 border-b border-gray-200 pb-4"
                          >
                            {/* Thumbnail */}
                            <div className="w-[250px] h-[143px] bg-gray-200 rounded flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                />
                                <line x1="3" y1="8" x2="21" y2="8" />
                                <line x1="8" y1="3" x2="8" y2="21" />
                              </svg>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h2 className="text-lg font-semibold">
                                {event.title}
                              </h2>
                              <p className="text-sm text-gray-500 mt-1">
                                {event.date}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                🎥 {event.type} • By {event.organizer}
                              </p>
                              <p className="text-sm text-gray-500 mt-2">
                                {event.description}
                              </p>
                              <p className="text-sm text-gray-500 mt-2 flex items-center">
                                <span className="mr-2">👥</span>
                                {event.applicants.toLocaleString()} Applicants
                              </p>
                            </div>

                            {/* Options Menu */}
                            <div className="relative">
                              <button className="text-gray-500 hover:text-gray-700">
                                <FaEllipsisVertical />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="text-center mt-2">
                          <button className="w-full h-full text-[#a35284] font-medium text-sm px-4 py-3 rounded transition-all duration-300 hover:bg-[#a35284] hover:text-white">
                            SEE ALL POST
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "reminders" && (
                      <div className="space-y-6">
                        {reminders.map((reminder) => (
                          <div
                            key={reminder.id}
                            className="border-b border-gray-200 pb-4"
                          >
                            <h2 className="text-lg font-semibold">
                              {reminder.title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                              📅 Due: {reminder.dueDate}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              {reminder.details}
                            </p>
                          </div>
                        ))}
                        <div className="text-center mt-2">
                          <button className="w-full h-full text-[#a35284] font-medium text-sm px-4 py-3 rounded transition-all duration-300 hover:bg-[#a35284] hover:text-white">
                            SEE ALL POST
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Articles Section */}
            {activeSection === "articles" && (
              <div className="mt-10 bg-[#ffffff] rounded-md min-h-min max-w-full w-full shadow-lg p-6">
                {/* Article Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h1 className="m-1 font-semibold text-lg sm:text-xl md:text-2xl">
                    Article
                  </h1>
                  <FaEllipsisVertical className="m-1 font-semibold text-lg sm:text-xl md:text-2xl" />
                </div>

                {/* Author Information */}
                <div className="flex flex-col sm:flex-row mt-3">
                  <Image
                    src="/assets/sample/connection-profile.png"
                    height={100}
                    width={100}
                    alt="connection image"
                    className="w-[52px] h-[52px] rounded-full mb-3 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="font-[Gotham] text-md text-[#181818] font-bold text-[14px] sm:text-lg leading-[13.4px]">
                      UX/UI designer
                    </p>
                    <p className="text-sm sm:text-base text-[#666]">
                      product designer at company name
                    </p>
                  </div>
                </div>

                {/* Article Content */}
                <div className="w-full flex items-center justify-center px-4 py-4">
                  <div className="max-w-full sm:max-w-[804px] w-full bg-[#e0eaff] shadow-lg rounded-2xl overflow-hidden">
                    <div className="bg-[#e0eaff] p-8 flex flex-col sm:flex-row justify-between">
                      <h1 className="text-2xl sm:text-3xl font-bold text-[#6687bd]">
                        Name of article
                      </h1>
                      <p className="text-sm sm:text-base text-[#9bb3d4] mt-2 sm:mt-0">
                        Blog post number
                        <br />
                        Date of publishment
                      </p>
                    </div>
                    <div className="relative">
                      <Image
                        src={imageArticle}
                        alt="Mountain"
                        className="w-full h-72 sm:h-[320px] lg:h-[400px] object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Author Information - Second Block */}
                <div className="flex flex-col sm:flex-row mt-3">
                  <Image
                    src="/assets/sample/connection-profile.png"
                    height={100}
                    width={100}
                    alt="connection image"
                    className="w-[52px] h-[52px] rounded-full mb-3 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="font-[Gotham] text-md text-[#181818] font-bold text-[14px] sm:text-lg leading-[13.4px]">
                      UX/UI designer
                    </p>
                    <p className="text-sm sm:text-base text-[#666]">
                      product designer at company name
                    </p>
                  </div>
                </div>

                {/* Article Content - Second Block */}
                <div className="w-full flex items-center justify-center px-4 py-4">
                  <div className="max-w-full sm:max-w-[804px] w-full bg-[#a35285] shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-[#a35285] p-8 flex flex-col sm:flex-row justify-between">
                      <h1 className="text-2xl sm:text-3xl font-bold text-[#ffffff]">
                        Name of article
                      </h1>
                      <p className="text-sm sm:text-base text-[#ffffff] mt-2 sm:mt-0">
                        Blog post number
                        <br />
                        Date of publishment
                      </p>
                    </div>
                    <div className="relative">
                      <Image
                        src={imageArticle}
                        alt="Mountain"
                        className="w-full h-72 sm:h-[320px] lg:h-[400px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other content area */}
          <div className="w-full lg:w-[290px] hidden lg:block">
            <div className="">
              <div className="h-[360px] shadow-lg">
                <div className="flex justify-between max-w-[230px] w-full ml-5">
                  <span className="font-semibold">Your Dashboard</span>
                  <span
                    className="text-[#A45286] rounded-md hover:bg-[#A45286] hover:text-[#fff] font-semibold cursor-pointer"
                    onClick={() => router.push("/states")}
                  >
                    Go To Stats
                  </span>
                </div>
                <hr className="max-w-[230px] w-full mx-auto mt-4" />
                <div className="flex flex-col md:flex-row md:flex-wrap gap-6 m-4 mt-4">
                  <div className="flex flex-col w-full md:max-w-[200px] h-auto mb-2">
                    <span className="text-[#A45286] rounded-md font-arial font-bold text-[36px] md:text-[45px] leading-tight md:leading-[51.75px] text-left">
                      560
                    </span>
                    <span className="text-[14px] md:text-[16px] text-gray-700">
                      Views Today
                    </span>
                  </div>

                  <div className="flex flex-col w-full md:max-w-[200px] h-auto mb-2">
                    <span className="text-[#A45286] rounded-md font-arial font-bold text-[36px] md:text-[45px] leading-tight md:leading-[51.75px] text-left">
                      80
                    </span>
                    <span className="text-[14px] md:text-[16px] text-gray-700">
                      Likes Today
                    </span>
                  </div>

                  <div className="flex flex-col w-full md:max-w-[200px] h-auto mb-2">
                    <span className="text-[#A45286] rounded-md font-arial font-bold text-[36px] md:text-[45px] leading-tight md:leading-[51.75px] text-left">
                      09
                    </span>
                    <span className="text-[14px] md:text-[16px] text-gray-700">
                      Search Appearances
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[427px] bg-[#ffffff] mt-5 shadow-lg p-4">
                {/* Header Section */}
                <div className="flex justify-between px-3 py-3 w-full font-[Gotham] mt-2">
                  <span className="font-semibold text-sm">VISITORS</span>
                  <span className="text-[#fc3fb4] rounded-md font-semibold text-sm cursor-pointer hover:bg-[#A45286] hover:text-white transition-all duration-200 px-2 py-1">
                    VIEW ALL
                  </span>
                </div>
                <hr className="w-full mx-auto my-2 border-t border-gray-300" />

                {/* Visitor List */}
                <div className="flex flex-col space-y-3">
                  {/* Visitor 1 */}
                  <div className="flex items-center w-full h-[52px] space-x-3">
                    <Image
                      width={52}
                      height={52}
                      src={profileimg}
                      alt="Nikhil Gupta"
                      className="w-[52px] h-[52px] rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Nikhil Gupta</span>
                      <p className="text-gray-700 text-[10px]">
                        HR-manager, 10,000 connec...
                      </p>
                    </div>
                  </div>

                  {/* Visitor 2 */}
                  <div className="flex items-center w-full h-[52px] space-x-3">
                    <Image
                      width={52}
                      height={52}
                      src={profileimg}
                      alt="Ayush Gautam"
                      className="w-[52px] h-[52px] rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Ayush Gautam</span>
                      <p className="text-gray-700 text-[10px]">iOS developer</p>
                    </div>
                  </div>

                  {/* Visitor 3 */}
                  <div className="flex items-center w-full h-[52px] space-x-3">
                    <Image
                      width={52}
                      height={52}
                      src={profileimg}
                      alt="Aditya Kumar"
                      className="w-[52px] h-[52px] rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Aditya Kumar</span>
                      <p className="text-gray-700 text-[10px]">
                        Senior UX designer
                      </p>
                    </div>
                  </div>

                  {/* Visitor 4 */}
                  <div className="flex items-center w-full h-[52px] space-x-3">
                    <Image
                      width={52}
                      height={52}
                      src={profileimg}
                      alt="Amit Verma"
                      className="w-[52px] h-[52px] rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Amit Verma</span>
                      <p className="text-gray-700 text-[10px]">
                        Product designer at Com...
                      </p>
                    </div>
                  </div>

                  {/* Visitor 5 */}
                  <div className="flex items-center w-full h-[52px] space-x-3">
                    <Image
                      width={52}
                      height={52}
                      src={profileimg}
                      alt="Abhay Mishra"
                      className="w-[52px] h-[52px] rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Abhay Mishra</span>
                      <p className="text-gray-700 text-[10px]">
                        Team lead at Google
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* You May Like ADs Section */}

            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Page;
