"use client";
import { FiCalendar } from "react-icons/fi";
import UserChart from "@/app/ui/dashboard/users/userchart";
import UserDetails from "@/app/ui/dashboard/users/userdetails";
import { IoIosArrowDown } from "react-icons/io";

const User = () => {
  return (
    <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                User Management
              </h1>
              <p className="mt-1 text-gray-600">
                Hi, Samantha. Welcome back to Sedap Admin!
              </p>
            </div>
            {/* Filter Period Section */}
            <div className="mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2">
              <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-[0.5rem] p-2">
                <FiCalendar />
              </div>
              <div>
                <p className="text-gray-600 text-lg">Filter Period</p>
                <p className="text-gray-800 font-sm text-[8px]">
                  17 April 2020 - 21 May 2020
                </p>
              </div>
              <div className="text-[#b9babd] text-2xl">
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Total User Card */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-gray-600 text-sm">Total Users</h2>
            <p className="text-3xl font-bold text-gray-800">40,689</p>
            <p className="text-sm text-green-600 mt-2">
              ▲ 8.5% Up from yesterday
            </p>
          </div>

          {/* Total Active User Card */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-gray-600 text-sm">Total Active Users</h2>
            <p className="text-3xl font-bold text-gray-800">89,000</p>
            <p className="text-sm text-red-600 mt-2">
              ▼ 4.3% Down from yesterday
            </p>
          </div>

          {/* Total Pending Card */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-gray-600 text-sm">Total Pending</h2>
            <p className="text-3xl font-bold text-gray-800">2,040</p>
            <p className="text-sm text-green-600 mt-2">
              ▲ 1.8% Up from yesterday
            </p>
          </div>

          {/* Total New Users Card */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-gray-600 text-sm">Total New Users</h2>
            <p className="text-3xl font-bold text-gray-800">10,293</p>
            <p className="text-sm text-green-600 mt-2">
              ▲ 1.3% Up from past week
            </p>
          </div>

          {/* Total Deleted Accounts Card */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-gray-600 text-sm">Total Deleted Accounts</h2>
            <p className="text-3xl font-bold text-gray-800">10,293</p>
            <p className="text-sm text-green-600 mt-2">
              ▲ 1.3% Up from past week
            </p>
          </div>
        </div>

        {/* User Chart Section */}
        <section className="mt-8">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <UserChart />
          </div>
        </section>

        {/* User Details Section */}
        <section className="mt-8">
          <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
            <UserDetails />
          </div>
        </section>
      </div>
    </div>
  );
};

export default User;
