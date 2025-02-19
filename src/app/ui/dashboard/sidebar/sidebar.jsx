"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import logo from "../../../../../public/sidebar/logo.svg";
import { GoHome } from "react-icons/go";
import { PiTextAlignLeftBold } from "react-icons/pi";
import { MdOutlineContactPage } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { BsCup } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { MdOutlineChat } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // State to track active item

  const handleClick = (index) => {
    setActiveIndex(index); // Set the clicked item as active
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-white shadow-lg h-screen p-4 w-60 transition-transform z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image src={logo} alt="Logo" width={200} height={90} className="hidden md:block" />
        </div>

        {/* Menu Items */}
        <ul className="space-y-3">
          {[
            { label: "Dashboard", icon: <GoHome />, path: "/admin" },
            { label: "User Management", icon: <PiTextAlignLeftBold />, path: "/admin/users" },
            { label: "Content Moderation", icon: <MdOutlineContactPage />, path: "/admin/content" },
            { label: "Jobs Management", icon: <IoPeopleOutline />, path: "/admin/jobs" },
            { label: "Analytics & Reports", icon: <TbDeviceDesktopAnalytics />, path: "/admin/analytics" },
            { label: "Subscription Management", icon: <BsCup />, path: "/admin/subscription" },
            { label: "Support & Tickets", icon: <BiEdit />, path: "/admin/support" },
            { label: "Settings", icon: <IoSettingsOutline />, path: "/admin/setting" },
            { label: "Security Logs", icon: <FiCalendar />, path: "/admin/security" },
            { label: "Fashion Trends", icon: <MdOutlineChat />, path: "/admin/trends" },
            { label: "Logout Admin", icon: <HiOutlineLogout />, path: "/admin/logout" },
          ].map((menu, index) => (
            <li key={index}>
              <Link href={menu.path} prefetch={true}>
                <div
                  className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer font-medium text-sm transition ${activeIndex === index
                      ? "text-[#b35b95] bg-[#ead6ff]" // Active item styles
                      : "text-gray-700 hover:bg-purple-100" // Non-active item styles
                    }`}
                  onClick={() => handleClick(index)} // Set clicked item as active
                >
                  <span className="text-base">{menu.icon}</span>
                  <span className="hidden md:block">{menu.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-purple-700 text-white p-2 rounded-md md:hidden text-sm shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <FaBars className="text-lg" />
      </button>
    </>
  );
};

export default Sidebar;
