import { CiSearch } from "react-icons/ci";
import { BiBell } from "react-icons/bi";
import { requireAdmin } from "@/lib/auth";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";

export default async function TopNav() {
  const admin = await requireAdmin();

  return (
    <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
      {/* Search */}
      <div className="flex items-center bg-gray-200 px-3 rounded-lg w-full sm:w-80 lg:w-[34rem]">
        <input
          type="text"
          placeholder="Search here..."
          aria-label="Search input"
          className="bg-gray-200 text-black rounded-lg px-4 py-2 text-sm w-full focus:outline-none placeholder-gray-500"
        />
        <div>
          <CiSearch
            aria-label="Search icon"
            className="text-gray-400 cursor-pointer text-3xl"
          />
        </div>
      </div>

      {/* Profile & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="bg-[#d5e4f5] p-2 rounded-lg text-[#2c9bdb] cursor-pointer flex items-center relative">
          <BiBell />
          <span className="absolute top-[-4px] right-[-4px] bg-[#2c9bdb] text-white text-xs rounded-full px-1">
            3
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-800">Hello,</span>
          <span className="text-sm text-gray-800 font-bold">
            {admin.displayName}
          </span>
          <Link href="/admin/profile">
            <UserAvatar
              avatarUrl={admin.avatarUrl}
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
