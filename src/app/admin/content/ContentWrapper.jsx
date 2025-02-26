"use client";

import AdminDatePicker from "@/app/ui/common/AdminDatePicker";
import Sidebar from "@/app/ui/dashboard/content/sidebar";

const content = ({ admin }) => {
    return (
        <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
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
                            <AdminDatePicker />
                        </div>
                    </div>
                </header>
                <div>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};
export default content;
