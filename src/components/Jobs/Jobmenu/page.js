"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function JobMenu() {
  const router = useRouter();

  const menuItems = [
    {
      icon: "ri-file-add-line",
      text: "Post Job",
      action: () => router.push("/postJob"),
      color: "text-blue-500",
    },
    {
      icon: "ri-briefcase-line",
      text: "Manage Your Jobs",
      action: () => router.push("/jobManagement"),
      color: "text-purple-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border dark:border-gray-700">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <li className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                <button
                onClick={item.action}
                className="flex items-center w-full p-2 space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                aria-label={item.text}
              >
                <i className={`${item.icon} ${item.color} text-xl`} />
                <span className="font-semibold text-gray-700 dark:text-gray-300">{item.text}</span>
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}