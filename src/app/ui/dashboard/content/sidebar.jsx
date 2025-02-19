import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import Post from "./post";
import Comment from "./comment";
import Joblist from "./joblist";
const Sidebar = () => {
  const [selectedContent, setSelectedContent] = useState("Post");

  const contentStats = {
    Post: 1253,
    Comment: 245,
    "Job Listing": 24532,
  };

  const moderationActions = [
    "Approve Content",
    "Reject/Remove Content",
    "Edit Content",
    "Warn Uploader",
    "Suspend Uploader",
  ];

  return (
    <div className="flex flex-col sm:flex-row h-fit">
      {/* Sidebar */}
      <div className="bg-white shadow-lg p-4 rounded-lg w-full sm:w-60">
        {/* Date Selector */}
        <button className="bg-[#a85287] text-white py-2 px-4 rounded w-full mb-4">
          Date
        </button>

        {/* Type of Content */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">Type of Content</h2>
          <ul>
            {Object.entries(contentStats).map(([type, count]) => (
              <li
                key={type}
                onClick={() => setSelectedContent(type)}
                className={`flex justify-between items-center px-4 py-2 cursor-pointer rounded-lg mb-2 ${
                  selectedContent === type
                    ? "bg-[#f2e6ee] text-[#a85287]"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  {type === "Post" && <span><CiMail /></span>}
                  {type === "Comment" && <span><CiStar /></span>}
                  {type === "Job Listing" && <span><LuSend /></span>}
                  {type}
                </span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Moderation Actions */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Moderation Action</h2>
          <ul>
            {moderationActions.map((action) => (
              <li
                key={action}
                className="flex items-center text-[12px] gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer"
              >
                <span>👤</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 bg-gray-100">
        {selectedContent === "Post" && (
          <div>
            <Post/>
          </div>
        )}
        {selectedContent === "Comment" && (
          <div>
            <Comment/>
          </div>
        )}
        {selectedContent === "Job Listing" && (
          <div>
            <Joblist/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
