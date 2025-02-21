"use client";

import Sidebar from "@/app/ui/dashboard/sidebar/sidebar";
import Navbar from "@/app/ui/dashboard/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-lg min-h-fit">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow-md">
          <Navbar />
        </div>

        {/* Content */}
        <main className="flex-1 p-4 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
