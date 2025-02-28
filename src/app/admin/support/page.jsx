import { requireAdmin } from "@/lib/auth";
import Sidebar from "@/app/ui/dashboard/support/sidebar";

export const metadata = {
  title: "Support & Ticket",
  description: "Support and ticket page for managing the app.",
};

const Support = async () => {
  let admin;
  try {
    admin = await requireAdmin();
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return <div>Error loading admin data</div>;
  }

  return (
    <div className="min-h-screen bg-[#f3f2f7] sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mx-4">
                Support & Ticket
              </h1>
            </div>
          </div>
        </header>
      </div>
      {/* Sidebar Section */}
      <Sidebar />
    </div>
  );
};

export default Support;
