"use client";

import { useRouter } from 'next/navigation';
import { formatRelativeDate } from "@/lib/utils";

export default function MyJobPost({ job }) {
    const router = useRouter();

    // Determine job status based on expiration date
    const currentDate = new Date();
    const expirationDate = job.expirationDate ? new Date(job.expirationDate) : null;
    const jobStatus = expirationDate && expirationDate > currentDate ? "Active" : "Expired";
    return (
        <div className="bg-white max-h-[80vh] overflow-y-auto hover:shadow-md border rounded-lg p-4 sm:p-6">
            {job && (
                <div
                    key={job.id}
                    className="flex items-center gap-4 p-4 border-b last:border-none cursor-pointer"
                    onClick={() => router.push(`/Jobpostdetail/${job.id}`)}
                >
                    {/* <div className="w-16 h-16 bg-gray-300 rounded-md"></div> */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
                        <p className="text-sm">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                        <p className="text-xs text-gray-400">Posted - {formatRelativeDate(job.createdAt)}</p>
                        <p className={`text-sm font-medium ${jobStatus === "Active" ? "text-green-600" : "text-red-500"}`}>
                            {jobStatus}
                        </p>
                    </div>
                    {/* <button className="text-gray-500 hover:text-gray-700">
                        <FaEllipsisH className="text-2xl" />
                    </button> */}
                </div>
            )}
        </div>
    );
}
