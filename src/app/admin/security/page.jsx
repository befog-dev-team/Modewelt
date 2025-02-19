"use client";
import Heatmap from "@/app/ui/dashboard/security/Heatmap";
import TableComponent from "@/app/ui/dashboard/security/TableComponent";

const Security = () => {
  return (
    <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Security Logs</h1>
            </div>
          </div>
        </header>

        {/* Heatmap Section */}
        <div className="#f3f2f7 rounded-lg shadow-sm p-4 sm:p-6">
          <Heatmap />
          <TableComponent />
        </div>
      </div>
    </div>
  );
};

export default Security;