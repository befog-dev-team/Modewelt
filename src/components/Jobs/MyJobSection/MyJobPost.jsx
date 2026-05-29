"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatRelativeDate } from "@/lib/utils";
import { FaEllipsisH } from "react-icons/fa";
import dynamic from "next/dynamic";
const DeleteJobDialog = dynamic(() => import("../JobSection/DeleteJobDialog"), { ssr: false });
const EditJobDialog = dynamic(() => import("./EditJobDialog"), { ssr: false });

export default function MyJobPost({ job }) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setIsDeleteDialogOpen(true);
        setIsMenuOpen(false);
    };

    // Determine job status based on expiration date
    const currentDate = new Date();
    const expirationDate = job.expirationDate ? new Date(job.expirationDate) : null;
    const jobStatus = expirationDate && expirationDate > currentDate ? "Active" : "Expired";

    return (
        <div className="bg-white dark:bg-gray-800 hover:shadow-md border dark:border-gray-700 rounded-lg p-4 sm:p-6 transition-all duration-300 relative">
            {job && (
                <>
                    <div
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => router.push(`/Jobpostdetail/${job.id}`)}
                    >
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white transition-colors">{job.jobTitle}</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">{job.company}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">{job.location}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors">Posted - {formatRelativeDate(job.createdAt)}</p>
                            <p className={`text-sm font-medium mt-1 ${jobStatus === "Active" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                                {jobStatus}
                            </p>
                        </div>
                        
                        <div className="relative">
                            <button 
                                onClick={toggleMenu}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <FaEllipsisH className="text-gray-500 dark:text-gray-400 text-xl" />
                            </button>
                            
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg z-50 py-1 transition-colors">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsEditDialogOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-edit-line text-blue-500"></i>
                                        Edit Job
                                    </button>
                                    <button 
                                        onClick={handleDeleteClick}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                        Delete Job
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <DeleteJobDialog 
                        jobId={job.id} 
                        open={isDeleteDialogOpen} 
                        onClose={() => setIsDeleteDialogOpen(false)} 
                    />

                    <EditJobDialog 
                        job={job} 
                        open={isEditDialogOpen} 
                        onClose={() => setIsEditDialogOpen(false)} 
                    />
                </>
            )}
        </div>
    );
}
