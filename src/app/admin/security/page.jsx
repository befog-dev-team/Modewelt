import { requireAdmin } from "@/lib/auth";
import SecurityWrapper from "./SecurityWrapper";

export const metadata = {
  title: "Security Logs",
  description: "Security logs page for monitoring user activities.",
};

const Security = async () => {
  let admin;
  try {
    admin = await requireAdmin();
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return <div>Error loading admin data</div>;
  }

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
        {/* Security Wrapper Section */}
        <SecurityWrapper />
      </div>
    </div>
  );
};

export default Security;