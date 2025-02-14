"use client";

import React, { useState } from "react";
import FollowReceivedList from "../../../components/Network/invitation/FollowReceivedList"
import FollowSentList from "../../../components/Network/invitation/FollowSentList"
import { useSession } from "@/app/(main)/SessionProvider";

export default function Invitation() {
  const [activeTab, setActiveTab] = useState("received");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const { user } = useSession();

  if (!user) return null;

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      {/* Invitation Heading */}
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="font-sans text-[#f26744] text-xl font-bold uppercase">
          Invitations
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 mb-4">
        <button
          className={`w-1/2 py-2 text-sm font-semibold uppercase transition-colors duration-300 ${activeTab === "received"
            ? "bg-[#f26744] text-white"
            : "bg-white text-gray-800"
            }`}
          onClick={() => handleTabChange("received")}
        >
          Received
        </button>
        <button
          className={`w-1/2 py-2 text-sm font-semibold uppercase transition-colors duration-300 ${activeTab === "sent"
            ? "bg-[#f26744] text-white"
            : "bg-white text-gray-800"
            }`}
          onClick={() => handleTabChange("sent")}
        >
          Sent
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "received" && (
          <div className="space-y-4 mt-6">
            {/* Follow Received List */}
            <FollowReceivedList userId={user.id} />
          </div>
        )}

        {activeTab === "sent" && (
          <div>
            <div className="space-y-4 mt-6">
              {/* Follow Sent List */}
              <FollowSentList userId={user.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
