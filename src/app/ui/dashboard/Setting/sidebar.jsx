"use client";
import GeneralSettings from "./GeneralSettings";
import ProfileSetting from "./ProfileSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import PrivacySettings from "./PrivacySettings";
import ConnectedAccount from "./ConnectedAccounts";
import AppearanceSettings from "./AppearanceSetting";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const pagesContent = {
  // "General Settings": <GeneralSettings />,
  "Profile Settings": <ProfileSetting />,
  "Notification Settings": <NotificationSettings/>,
  "Security Settings": <SecuritySettings/>,
  // "Privacy Settings": <PrivacySettings/>,
  "Connected Accounts": <ConnectedAccount/>,
  "Backup and Data Management": <AppearanceSettings/>,
};

const Sidebar = () => {
  const [active, setActive] = useState(1);
  const [selectedPage, setSelectedPage] = useState("General Settings");

  const menuItems = Object.keys(pagesContent);

  return (
    <div className="flex rounded-xl w-full bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-200 ${
                active === index + 1 ? "text-[#a65386] font-semibold bg-purple-100" : "text-gray-800"
              }`}
              onClick={() => {
                setActive(index + 1);
                setSelectedPage(item);
              }}
            >
              <span>
                {index + 1}. {item}
              </span>
              <FaChevronRight />
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-2/3 bg-white rounded-lg shadow-md ml-6">
        {pagesContent[selectedPage]}
      </div>
    </div>
  );
};

export default Sidebar;
