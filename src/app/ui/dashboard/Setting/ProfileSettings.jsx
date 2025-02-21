"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import profile from "../../../../../public/navbar/profile.jpg";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "Aditya Kumar Kanaujiya",
    email: "adityakanaujiya.ui@gmail.com",
    username: "@aditya-kanaujiya",
    phone: "+91 7459068576",
    password: "********",
    confirmPassword: "********",
  });

  return (
    <div className="max-w-[1014px] bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#000000] mb-4">
        Profile Setting
      </h2>

      <div className="mb-6 flex justify-between items-center">
        <Image
          src={profile}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover shadow-md"
        />
        <button className="text-gray-700 p-2 border border-gray-400 rounded-xl hover:bg-gray-100 transition">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1 space-y-4">
          <div>
            <label className="block text-[#4a4a4a]">Name</label>
            <input
              type="text"
              value={formData.name}
              className="w-full p-2 text-[#4a4a4a] border rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block text-[#4a4a4a]">Email</label>
            <input
              type="email"
              value={formData.email}
              className="w-full p-2 text-[#4a4a4a] border rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block text-[#4a4a4a]">Change Password</label>
            <input
              type="password"
              value={formData.password}
              className="w-full p-2 border text-[#4a4a4a] rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block text-[#4a4a4a]">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              className="w-full p-2 border text-[#4a4a4a] rounded-md bg-gray-100"
              disabled
            />
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <div>
            <label className="block text-[#4a4a4a]">User Name</label>
            <input
              type="text"
              value={formData.username}
              className="w-full p-2 border text-[#4a4a4a] rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block text-[#4a4a4a]">Phone</label>
            <input
              type="text"
              value={formData.phone}
              className="w-full p-2 border text-[#4a4a4a] rounded-md bg-gray-100"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="mt-4 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
