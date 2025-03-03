"use client";

import Sidebar from "@/app/ui/dashboard/Setting/sidebar";
import ProfileWrapper from "@/app/admin/profile/ProfileWrapper";

const setting = () => {
  return (
    <div className="max-h-[80vh] overflow-y-auto no-scrollbar bg-[#f3f2f7] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            {/* <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Setting
              </h1>
            </div> */}
          </div>
        </header>
      </div>
      <div>
        <ProfileWrapper />
        {/* <Sidebar/> */}
      </div>
    </div>
  );
};
export default setting;
