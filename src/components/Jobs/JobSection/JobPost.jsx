"use client";

import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import DeleteJobDialog from "./DeleteJobDialog";
import ReportJobModal from "./ReportJobModal";
import Link from "next/link";
import { useSession } from "@/app/(main)/SessionProvider";

export default function JobPost({ job }) {
    const { user } = useSession();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleDeleteClick = () => setIsDeleteDialogOpen(true);
    const handleReportClick = () => setIsReportModalOpen(true);

    const maxDescriptionLength = 100;

    return (
        <div className="relative w-full h-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white rounded-lg shadow-lg space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Image and Text Section */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="flex flex-col space-y-2">
                    <p className="font-bold text-[16px] sm:text-[18px] leading-tight">{job.jobTitle}</p>
                    <div className="flex gap-3 text-sm text-gray-600">
                        <span>{job.company}</span>
                        <span className="text-gray-800">{job.location}</span>
                    </div>
                    <span className="text-[12px] sm:text-[14px] leading-[20px] mt-2 w-full sm:w-[350px]">
                        {job.description.length > maxDescriptionLength ? `${job.description.slice(0, maxDescriptionLength)}...` : job.description}
                    </span>
                </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-end items-start sm:justify-center w-full sm:w-auto">
                {/* More Options Menu */}
                <div className="relative">
                    <FaEllipsisH className="text-gray-700 cursor-pointer w-6 h-6" onClick={toggleMenu} />
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                            {job.userId === user.id && (
                                <button onClick={handleDeleteClick} className="block w-full text-left px-4 py-2 text-sm hover:bg-red-500 hover:text-white">
                                    Delete
                                </button>
                            )}
                            <button onClick={handleReportClick} className="block w-full text-left px-4 py-2 text-sm hover:bg-red-500 hover:text-white">
                                Report
                            </button>

                            <Link href={`/jobDetails/${job.id}`} prefetch={true}>
                                <button className="block w-full text-left px-4 py-2 text-sm bg-[#f26744] text-white text-[14px] font-semibold hover:bg-gradient-to-l hover:from-[#a3527e] hover:to-[#c166a0] transition duration-300 ease-in-out hover:text-white">
                                    More Info
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete and Report Modals */}
            <DeleteJobDialog jobId={job.id} open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} />
            <ReportJobModal jobId={job.id} isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
        </div>
    );
}
