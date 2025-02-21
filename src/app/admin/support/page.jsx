"use client";
import Sidebar from "@/app/ui/dashboard/support/sidebar";

const Support = () => {
  return (
    <div className="min-h-screen bg-[#f3f2f7] sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Support & Ticket
              </h1>
            </div>
          </div>
        </header>
      </div>
      <div>
        <Sidebar />
      </div>
      {/* You can add more sections or content here */}
    </div>
  );
};

export default Support;
