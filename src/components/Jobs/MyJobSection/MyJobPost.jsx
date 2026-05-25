"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatRelativeDate } from "@/lib/utils";
import { FaEllipsisH } from "react-icons/fa";
import DeleteJobDialog from "../JobSection/DeleteJobDialog";

export default function MyJobPost({ job }) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
        <div className="bg-white hover:shadow-md border rounded-lg p-4 sm:p-6 transition-shadow relative">
            {job && (
                <>
                    <div
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => router.push(`/Jobpostdetail/${job.id}`)}
                    >
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
                            <p className="text-sm">{job.company}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                            <p className="text-xs text-gray-400">Posted - {formatRelativeDate(job.createdAt)}</p>
                            <p className={`text-sm font-medium ${jobStatus === "Active" ? "text-green-600" : "text-red-500"}`}>
                                {jobStatus}
                            </p>
                        </div>
                        
                        <div className="relative">
                            <button 
                                onClick={toggleMenu}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FaEllipsisH className="text-gray-500 text-xl" />
                            </button>
                            
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-lg z-50 py-1">
                                    <button 
                                        onClick={handleDeleteClick}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
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
                </>
            )}
        </div>
    );
}
