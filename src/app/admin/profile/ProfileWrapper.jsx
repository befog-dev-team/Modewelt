"use client";

import UserAvatar from "@/components/UserAvatar";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast  from "react-hot-toast";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "", phone: "" });

  const { data: admin, isLoading, error } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      const res = await fetch("/api/admin/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
    staleTime: 2000, // 2 seconds
  });

  // Update user state when admin data is available
  useEffect(() => {
    if (admin) {
      setUser({ name: admin.displayName || "", phone: admin.phone || "" });
    }
  }, [admin]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="min-h-screen bg-gray-100">Error: {error.message}</div>;
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post("/api/admin/profile", user);

    if (res.status === 200) {
      toast.success("Profile Updated Successfully!");
      setLoading(false);
    } else {
      toast.error("Error updating profile");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] overflow-y-auto no-scrollbar flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <UserAvatar
              avatarUrl={admin.avatarUrl}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Admin</p>
          <h2 className="text-xl font-semibold mt-1">{admin.displayName}</h2>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            disabled
            className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-200"
          />
        </div>

        <form onSubmit={handleSubmit}>
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
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              {loading ?
                <Loader2 className="w-6 h-6 text-white animate-spin" /> :
                "Submit"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
