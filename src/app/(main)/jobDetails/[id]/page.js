import Navbar from "@/components/Navbar";
import Link from "next/link";
// import Image from "next/image";
// import { FaRegBookmark } from "react-icons/fa6";
// import fb from "../../../../../public/assets/jobs/facebook.png";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdStopwatch } from "react-icons/io";
import { LuLayers } from "react-icons/lu";
import { MdWorkOutline } from "react-icons/md";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";
// import { PiBagSimpleBold } from "react-icons/pi";
// import { RiLinkM } from "react-icons/ri";
// import { IoLogoLinkedin } from "react-icons/io5";
// import { TiSocialFacebookCircular } from "react-icons/ti";
// import { FaXTwitter } from "react-icons/fa6";
// import { HiOutlineMail } from "react-icons/hi";
// import { MapPin, Bookmark } from "lucide-react";

// const JobCard = ({ title, type, salary, company, location, bgColor }) => (
//     <div
//         className={`w-full rounded-[8px] border-[1px] border-[#E4E5E8] p-6 gap-5 flex flex-col sm:flex-row ${bgColor} shadow-custom-1`}
//     >
//         {/* Job Title and Job Type */}
//         <div className="w-full flex-1 flex-col gap-2">
//             <h1 className="font-inter font-medium text-lg sm:text-xl md:text-2xl text-[#18191C]">
//                 {title}
//             </h1>
//             <div className="flex flex-wrap gap-2 sm:gap-4">
//                 <h1
//                     className={`rounded-[3px] py-1 px-2 flex items-center justify-center gap-2.5 font-inter font-semibold text-xs sm:text-sm leading-[12px] ${type === "Part-time"
//                         ? "bg-[#E7F6EA] text-[#0BA02C]"
//                         : type === "FULL-TIME"
//                             ? "bg-[#FFF4E5] text-[#FFA500]"
//                             : "bg-[#EAF2FF] text-[#007BFF]"
//                         }`}
//                 >
//                     {type}
//                 </h1>
//                 <span className="font-inter font-normal text-xs sm:text-sm text-[#767F8C]">
//                     Salary: {salary}
//                 </span>
//             </div>
//         </div>

//         {/* Job Details */}
//         <div className="w-full sm:w-auto flex-1 flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
//             {/* Profile Image Placeholder */}
//             <div className="w-[48px] h-[48px] rounded-full p-3 bg-[#EDEFF5]" />
//             <div className="flex-1 flex-col gap-2">
//                 <h2 className="font-inter font-medium text-base sm:text-lg md:text-xl text-[#18191C]">
//                     {company}
//                 </h2>
//                 <div className="flex gap-2 sm:gap-4 items-center text-sm sm:text-base text-[#767F8C]">
//                     <MapPin className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
//                     <span>{location}</span>
//                     <Bookmark className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]" />
//                 </div>
//             </div>
//         </div>
//     </div>
// );


const getJobData = cache(async (id) => {
    const job = await prisma.job.findUnique({
        where: { id },
    });

    if (!job) notFound();

    return job;
})

export default async function JobListing(props) {
    const params = await props.params;
    const { id } = params; // Destructure username from params

    if (!id) notFound();

    const job = await getJobData(id);
    console.log(job);

    const formatCreatedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, ', ').replace(',', '');
    };

    const formatExpirationDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).replace(/(\d{2}) (\w{3}) (\d{4})/, "$1 $2, $3");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
            <Navbar />
            {/* <div className="w-full h-[76px] flex justify-between items-center px-6 sm:px-8 md:px-[102px] py-6 bg-[#FFFFFF]">
                <h1 className="w-auto h-auto font-inter font-medium text-lg sm:text-xl md:text-2xl flex items-center">
                    Find Job
                </h1>
                <div className="w-auto h-auto flex gap-2 text-sm sm:text-base">
                    <span className="font-inter font-normal text-[#767F8C]">
                        Feed / Job
                    </span>
                    <span className="font-inter font-normal text-[#767F8C]">/</span>
                    <span className="font-inter font-normal text-[#767F8C]">
                        Find job
                    </span>
                </div>
            </div> */}

            {/* Job Details Section */}
            <div className="w-full min-h-[88vh] flex justify-center items-center mt-6">
                <div className="container mx-8 px-8 bg-white shadow-md rounded-lg w-full p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            {/* <Image src={fb} alt="Velstar" width={90} height={90} /> */}
                            <div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                                    {job.jobTitle}
                                </h1>
                                <p className="font-medium mt-1 text-sm sm:text-base">
                                    at {job.company}{" "}
                                    <span className="bg-[#08a12c] text-[12px] font-semibold p-[2px] text-[#fff] rounded-sm uppercase">
                                        {job.jobType}
                                    </span>{" "}
                                    {/* <span className="bg-[#ffeded] text-[12px] font-semibold p-[2px] text-[#e05151] px-2 rounded-full">
                                    Featured
                                </span> */}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            {/* <div className="w-10 h-10 bg-[#ffe3ef] justify-center items-center flex rounded-md">
                            <FaRegBookmark className="text-[#a35284]" />
                        </div> */}
                            <Link href={`/jobform/${job.id}`}>
                                <button className="mt-4 md:mt-0 bg-[#a35284] text-white py-2 px-4 rounded-md text-xs sm:text-sm">
                                    Apply Now →
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 mt-6">
                        <div className="w-full lg:w-2/3">
                            {/* Job Description */}
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                    Job Description
                                </h2>
                                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                                    {job.description}
                                </p>
                            </div>

                            {/* Requirements */}
                            <div className="mt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                    Requirements
                                </h2>
                                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                                    {job.requirements}
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="mt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                    Skills
                                </h2>
                                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2 text-sm sm:text-base">
                                    {job.skills.map((skill) => (
                                        <li key={skill} >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Benefits */}
                            <div className="mt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                    Benefits
                                </h2>
                                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                                    {job.benefits}
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="bg-[#ffffff] shadow-md p-6 rounded-md mt-6 lg:mt-0">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-sm sm:text-base font-semibold">
                                        <p className="text-[#08a12c]">Salary {job.salaryCurrency}</p>
                                        <p className="text-[#a35284] text-lg">{job.salaryAmount}</p>
                                        <p className="text-[#76808c]">{job.salaryType} salary</p>
                                    </div>
                                    <span className="w-[2px] h-[100px] border-[1px] border-[#E4E5E8]"></span>
                                    <div className="text-sm sm:text-base font-semibold">
                                        <IoLocationOutline className="text-[#a35284] text-[1.8rem] mb-2" />
                                        <p className="text-[#76808c]">Job Location</p>
                                        <p className="font-semibold">{job.location}</p>
                                    </div>
                                </div>

                                <div className="bg-[#faf2f5] rounded-md p-4 mb-4">
                                    <h1 className="font-bold mb-2 text-sm sm:text-base">
                                        Job Overview
                                    </h1>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col items-center">
                                            <MdOutlineCalendarToday className="text-[#a35284] text-[1.8rem]" />
                                            <p className="text-[#76808c] text-xs sm:text-sm">
                                                Job Posted
                                            </p>
                                            <p className="font-semibold">{formatCreatedDate(job.createdAt)}</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <IoMdStopwatch className="text-[#a35284] text-[1.8rem]" />
                                            <p className="text-[#76808c] text-xs sm:text-sm">
                                                Expires In
                                            </p>
                                            <p className="font-semibold">{formatExpirationDate(job.expirationDate)}</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <LuLayers className="text-[#a35284] text-[1.8rem]" />
                                            <p className="text-[#76808c] text-xs sm:text-sm">
                                                Job Level
                                            </p>
                                            <p className="font-semibold">{job.jobLevel} Level</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <MdWorkOutline className="text-[#a35284] text-[1.8rem]" />
                                            <p className="text-[#76808c] text-xs sm:text-sm">
                                                Workplace
                                            </p>
                                            <p className="font-semibold">{job.workplaceType}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Share Job Section */}
                                {/* <div className="flex justify-center gap-2 mt-6">
                                <div className="flex justify-center items-center bg-[#faf2f5] p-2 rounded-sm">
                                    <RiLinkM className="text-[1.4rem] text-[#a35285]" />
                                    <p className="text-[1.2rem] text-[#a35285]">Copy Links</p>
                                </div>
                                <div className="flex justify-center items-center bg-[#faf2f5] p-1 rounded-sm">
                                    <IoLogoLinkedin className="text-[1.3rem] text-[#a35285]" />
                                </div>
                                <div className="flex justify-center items-center bg-[#a35285] rounded-sm">
                                    <TiSocialFacebookCircular className="text-[1.8rem] text-[#ffffff]" />
                                </div>
                                <div className="flex justify-center items-center bg-[#faf2f5] p-1 rounded-sm">
                                    <FaXTwitter className="text-[1.3rem] text-[#a35285]" />
                                </div>
                                <div className="flex justify-center items-center bg-[#faf2f5] p-1 rounded-sm">
                                    <HiOutlineMail className="text-[1.3rem] text-[#a35285]" />
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="mt-6 w-full py-10 shadow-lg bg-[#ffffff] rounded-lg">
                <div className="mt-6 w-full py-10 shadow-lg bg-[#ffffff] rounded-lg">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex justify-between">
                            <h1 className="w-full font-inter font-medium text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[48px] text-[#191F33] mx-4 sm:mx-6">
                                Related Jobs
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mx-4 sm:mx-6">
                            <JobCard
                                title="Fashion Designer"
                                type="Part-time"
                                salary="$20,000 - $25,000"
                                company="Company Name"
                                location="Dhaka, Bangladesh"
                                bgColor="bg-custom-gradient"
                            />
                            <JobCard
                                title="Fashion Designer"
                                type="FULL-TIME"
                                salary="$20,000 - $25,000"
                                company="Company Name"
                                location="Dhaka, Bangladesh"
                                bgColor="bg-custom-gradient"
                            />
                            <JobCard
                                title="Fashion Designer"
                                type="INTERNSHIP"
                                salary="$20,000 - $25,000"
                                company="Company Name"
                                location="Dhaka, Bangladesh"
                                bgColor="bg-custom-gradient-2"
                            />
                            <JobCard
                                title="Fashion Designer"
                                type="Part-time"
                                salary="$20,000 - $25,000"
                                company="Company Name"
                                location="Dhaka, Bangladesh"
                                bgColor="bg-custom-gradient"
                            />
                            <JobCard
                                title="Fashion Designer"
                                type="FULL-TIME"
                                salary="$20,000 - $25,000"
                                company="Company Name"
                                location="Dhaka, Bangladesh"
                                bgColor="bg-custom-gradient"
                            />
                            <JobCard
                                title="Fashion Designer"
                                type="INTERNSHIP"
                                salary="$20,000 - $25,000"
                                company="Company Name"
                                location="Dhaka, Bangladesh"
                                bgColor="bg-custom-gradient-2"
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
