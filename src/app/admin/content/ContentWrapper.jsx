"use client";

import AdminDatePicker from "@/app/ui/common/AdminDatePicker";
import { useEffect, useState } from "react";
import { LuBriefcaseBusiness } from "react-icons/lu";
import Post from "@/app/ui/dashboard/content/post";
import Job from "@/app/ui/dashboard/content/Job";
import JobStats from "@/app/ui/dashboard/content/JobStats";
import { BsPostcard } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MdQueryStats } from "react-icons/md";
import { subDays } from "date-fns";
import axios from "axios";

const content = ({ admin }) => {
    // Default: Last 30 days
    const [dateRange, setDateRange] = useState({
        from: subDays(new Date(), 30),
        to: new Date(),
    });

    const [selectedContent, setSelectedContent] = useState("Post");

    // Fetch report stats
    const { data: reportStats, isLoading: isReportStatsLoading, error: errorReportStats, refetch: refetchStats } = useQuery({
        queryKey: ["report-stats"],
        queryFn: async () => {
            if (!dateRange?.from || !dateRange?.to) return {}; // Prevents returning `null`
            const params = {
                from: dateRange.from.toISOString().split("T")[0],
                to: dateRange.to.toISOString().split("T")[0],
            };
            const res = await axios.get("/api/admin/content-moderation/report/stats", { params });
            return res.data ?? {}; // Ensures an empty object instead of `null`
        },
        enabled: false, // Fetch only when triggered
    });

    const { data: reportPosts, isLoading: isReportPosts, error: errorReportPosts, refetch: refetchPosts } = useQuery({
        queryKey: ["reported-posts"],
        queryFn: async () => {
            if (!dateRange?.from || !dateRange?.to) return {}; // Prevents returning `null`
            const params = {
                from: dateRange.from.toISOString().split("T")[0],
                to: dateRange.to.toISOString().split("T")[0],
            };
            const res = await axios.get("/api/admin/content-moderation/report/posts", { params });
            return res.data ?? {}; // Ensures an empty object instead of `null`
        },
        enabled: false, // Fetch only when triggered
    });

    const { data: reportJobs, isLoading: isReportJobs, error: errorReportJobs, refetch: refetchJobs } = useQuery({
        queryKey: ["reported-jobs"],
        queryFn: async () => {
            if (!dateRange?.from || !dateRange?.to) return {}; // Prevents returning `null`
            const params = {
                from: dateRange.from.toISOString().split("T")[0],
                to: dateRange.to.toISOString().split("T")[0],
            };
            const res = await axios.get("/api/admin/content-moderation/report/jobs", { params });
            return res.data ?? {}; // Ensures an empty object instead of `null`
        },
        enabled: false, // Fetch only when triggered
    });

    // Fetch data initially when the component mounts
    useEffect(() => {
        refetchStats();
        refetchPosts();
        refetchJobs();
    }, []);

    // Trigger API call only when the filter button is clicked
    const handleFilterClick = () => {
        if (dateRange?.from && dateRange?.to) {
            refetchStats();
            refetchPosts();
            refetchJobs();
        }
    };

    // Loading state
    if (isReportStatsLoading || isReportPosts || isReportJobs) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader2 className="text-[#f26744] size-10 animate-spin" />
            </div>
        );
    }

    // Error state
    if (errorReportStats || errorReportPosts || errorReportJobs) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-600">
                Error: {errorReportStats?.message || errorReportPosts?.message}
            </div>
        );
    }

    // Dynamic Content Stats (From API)
    const contentStats = {
        "Post": reportStats?.reportedPosts || 0,
        "Job": reportStats?.reportedJobs || 0,
        "Job Stats": "",
    };

    // const moderationActions = [
    //   "Approve Content",
    //   "Reject/Remove Content",
    //   "Edit Content",
    //   "Warn Uploader",
    //   "Suspend Uploader",
    // ];

    return (
        <div className="min-h-[75vh] bg-[#f3f2f7] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Content Moderation
                            </h1>
                            <p className="mt-1 text-gray-600">
                                Hi {admin.displayName || admin.username}, Welcome back to Modeweltjob Admin Panel!
                            </p>
                        </div>
                        {/* Filter Period Section */}
                        <div className="relative">
                            <AdminDatePicker
                                date={dateRange}
                                onDateChange={setDateRange}
                                onFilterClick={handleFilterClick}
                            />
                        </div>
                    </div>
                </header>

                <div className="flex flex-col sm:flex-row">
                    {/* Sidebar */}
                    <div className="bg-white shadow-lg p-4 rounded-lg w-full h-screen sm:w-60">
                        {/* Date Selector */}
                        {/* <button className="bg-[#a85287] text-white py-2 px-4 rounded w-full mb-4">
                          Date
                        </button> */}

                        {/* Type of Content */}
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-700 mb-2">Type of Content</h2>
                            <ul>
                                {Object.entries(contentStats).map(([type, count]) => (
                                    <li
                                        key={type}
                                        onClick={() => setSelectedContent(type)}
                                        className={`flex justify-between items-center px-4 py-2 cursor-pointer rounded-lg mb-2 ${selectedContent === type
                                            ? "bg-[#f2e6ee] text-[#a85287]"
                                            : "hover:bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {type === "Post" && <span><BsPostcard /></span>}
                                            {type === "Job" && <span><LuBriefcaseBusiness /></span>}
                                            {type === "Job Stats" && <span><MdQueryStats /></span>}
                                            {type}
                                        </span>
                                        <span>{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Moderation Actions */}
                        {/* <div>
                          <h2 className="font-semibold text-gray-700 mb-2">Moderation Action</h2>
                          <ul>
                            {moderationActions.map((action) => (
                              <li
                                key={action}
                                className="flex items-center text-[12px] gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer"
                              >
                                <span>👤</span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div> */}
                    </div>

                    {/* Main Content Section */}
                    {reportStats && reportPosts && reportJobs && (
                        <div className="flex-1 bg-gray-100 max-h-screen overflow-y-auto no-scrollbar">
                            {selectedContent === "Post" && (
                                <div>
                                    <Post reportStats={reportStats} reportPosts={reportPosts} />
                                </div>
                            )}
                            {selectedContent === "Job" && (
                                <div>
                                    <Job reportStats={reportStats} reportJobs={reportJobs} />
                                </div>
                            )}
                            {selectedContent === "Job Stats" && (
                                <div>
                                    <JobStats />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default content;
