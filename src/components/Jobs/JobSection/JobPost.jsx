"use client";

import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding, HiOutlineTrash, HiOutlineFlag, HiOutlineInformationCircle } from "react-icons/hi";
import { FaEllipsisH } from "react-icons/fa";
import dynamic from "next/dynamic";
const DeleteJobDialog = dynamic(() => import("./DeleteJobDialog"), { ssr: false });
const ReportJobModal = dynamic(() => import("./ReportJobModal"), { ssr: false });
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
        <div className="relative w-full h-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-800 space-y-4 sm:space-y-0 sm:space-x-6 transition-colors">
            {/* Image and Text Section */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="flex flex-col space-y-2">
                    <p className="font-bold text-[16px] sm:text-[18px] leading-tight text-gray-900 dark:text-white transition-colors">{job.jobTitle}</p>
                    <div className="flex gap-6 items-center text-sm text-gray-600 dark:text-gray-400 transition-colors">
                        <div className="flex items-center gap-1">
                            <HiOutlineOfficeBuilding className="text-[#a45286] text-lg" />
                            <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <IoLocationOutline className="text-[#fc3fb4] text-lg" />
                            <span className="text-gray-800 dark:text-gray-300 transition-colors">{job.location}</span>
                        </div>
                    </div>
                    <span className="text-[12px] sm:text-[14px] leading-[20px] mt-2 w-full sm:w-[350px] text-gray-700 dark:text-gray-400 transition-colors">
                        {job.description.length > maxDescriptionLength ? `${job.description.slice(0, maxDescriptionLength)}...` : job.description}
                    </span>
                </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-end items-start sm:justify-center w-full sm:w-auto">
                {/* More Options Menu */}
                <div className="relative">
                    <FaEllipsisH className="text-gray-700 dark:text-gray-400 cursor-pointer w-6 h-6 hover:text-[#fc3fb4] transition-colors" onClick={toggleMenu} />
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-[160px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-xl rounded-lg z-10 overflow-hidden transition-colors">
                            {job.userId === user.id && (
                                <button onClick={handleDeleteClick} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                                    <HiOutlineTrash className="text-lg" />
                                    Delete
                                </button>
                            )}
                            <button onClick={handleReportClick} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <HiOutlineFlag className="text-lg" />
                                Report
                            </button>

                            <Link href={`/jobDetails/${job.id}`} prefetch={true} className="block">
                                <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm bg-[#fc3fb4] text-white font-semibold hover:bg-[#e037a1] transition-colors">
                                    <HiOutlineInformationCircle className="text-lg" />
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
