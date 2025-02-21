"use client";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Toggle from "./button/button";
import Image from "next/image";
import profile from "../../../../../public/navbar/profile.jpg"; // Update with your actual image path

const SecuritySettings = () => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [loginHistory, setLoginHistory] = useState([
    { id: 1, email: "abc@gmail.com", name: "John Doe", avatar: profile },
    { id: 2, email: "user1@example.com", name: "Jane Smith", avatar: profile },
    { id: 3, email: "user2@example.com", name: "Mike Johnson", avatar: profile },
    { id: 4, email: "test@domain.com", name: "Sarah Wilson", avatar: profile },
    { id: 5, email: "demo@mail.com", name: "Alex Brown", avatar: profile },
  ]);

  const handleDeleteUser = (userId) => {
    setLoginHistory(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <div className="max-w-[1014px] bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#000000] mb-4">
        Security Setting
      </h2>

      {/* Two-Factor Authentication */}
      <div className="flex items-center space-x-4 mt-6 gap-6">
        <span className="text-[#4a4a4a]">Two-Factor Authentication</span>
        <Toggle />
      </div>

      {/* Account Locking */}
      <div className="flex items-center space-x-4 mt-6 gap-6">
        <span className="text-[#4a4a4a]">Account Locking</span>
        <Toggle />
      </div>

      {/* Login History */}
      <div className="flex items-center space-x-4 mt-6 gap-6">
        <span className="text-[#4a4a4a]">Login History</span>
        <button
          onClick={() => setShowHistoryModal(true)}
          className="p-2 px-4 rounded-lg border shadow-md text-[#a35285] hover:bg-[#f5f5f5] transition"
        >
          View History
        </button>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="mt-4 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
          Save Changes
        </button>
      </div>

      {/* Login History Modal */}
      {showHistoryModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowHistoryModal(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-[#000000] mb-4">Login History</h3>
            <div className="space-y-4">
              {loginHistory.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="text-[#303940] font-medium">{user.name}</p>
                      <p className="text-[#6b7280] text-sm">{user.email}</p>
                    </div>
                  </div>
                  <button
                    className="text-red-600 hover:text-red-800 text-sm px-3 py-1 rounded-md bg-red-50 hover:bg-red-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;