"use client";

import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Aditya Kumar Kanaujiya",
    email: "abc@gmail.com",
    phone: "+91 0000 000000",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updated Profile:", user);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <Image
              src="/profile.jpg" // Replace with your image path
              alt="Profile"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Admin</p>
          <h2 className="text-xl font-semibold mt-1">{user.name}</h2>
        </div>

        {/* Input Fields */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
