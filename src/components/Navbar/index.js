"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SlFeed } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FiBriefcase } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaEllipsisH } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const OtherModal = dynamic(() => import("../Other/index"), { ssr: false });
const SearchField = dynamic(() => import("../SearchField"), { ssr: false });
const NotificationsButton = dynamic(() => import("@/app/(main)/notifications/NotificationsButton"), { ssr: false });
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "../UserAvatar";

function Navbar({ unreadNotificationCount }) {
  const { user } = useSession();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!user) return null;

  const navItems = [
    { href: "/feed", icon: SlFeed, label: "Feed" },
    { href: "/network", icon: GoPeople, label: "Network" },
    { href: "/jobs", icon: FiBriefcase, label: "Jobs" },
  ];



  const adminNavItem = { href: "/admin", icon: RiAdminLine, label: "Admin" };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md w-full h-16 flex items-center text-sm text-gray-600 shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-2 lg:px-6 w-full">
          <Link href="/feed" className="flex items-center space-x-3 flex-shrink-0 hover:opacity-90 transition-opacity" prefetch={true}>
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#fc3fb4] to-[#0062ff] rounded-xl blur-md opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative w-9 h-9 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm border border-black/5 transform transition-transform duration-300">
                <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="nav-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fc3fb4" />
                      <stop offset="100%" stopColor="#0062ff" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8 28V12L14 20L20 12L26 20L32 12V28"
                    stroke="url(#nav-logo-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="hidden sm:flex flex-col -space-y-1">
              <span className="text-lg font-black text-[#1e293b] dark:text-white tracking-tighter uppercase">Modewelt</span>
              <span className="text-[8px] font-bold text-[#fc3fb4] tracking-[0.2em] uppercase opacity-80">Fashion World</span>
            </div>
          </Link>

          {/* Desktop View */}
          <div className="hidden lg:flex flex-grow items-center space-x-6 ml-8 lg:ml-14">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} 
                className={`flex flex-col items-center relative ${pathname === href ? "text-[#fc3fb4]" : "text-gray-600 dark:text-gray-300 hover:text-[#fc3fb4]"}`} 
                prefetch={true}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs">{label}</span>
                {pathname === href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
              </Link>
            ))}

            <Link
              href="/notifications"
              className={`flex flex-col items-center relative text-gray-600 dark:text-gray-300`}
              prefetch={true}
            >
              <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
              <span className="text-xs">Notifications</span>
              {pathname === "/notifications" && (
                <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />
              )}
            </Link>

            {user.role === "ADMIN" && (
              <Link href={adminNavItem.href} className="flex flex-col items-center relative" prefetch={true}>
                <adminNavItem.icon className={`h-6 w-6 text-gray-600 dark:text-gray-300`} />
                <span className="text-xs">{adminNavItem.label}</span>
                {pathname === adminNavItem.href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
              </Link>
            )}
          </div>

          <div className="flex-1 max-w-[240px] sm:max-w-xs md:max-w-md mx-1 sm:mx-2 lg:mx-4 flex items-center relative min-w-0">
            <SearchField />
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
            <Link href={`/profile/${user.username}`} className="flex items-center space-x-2 flex-shrink-0" prefetch={true}>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden flex-shrink-0">
                <UserAvatar avatarUrl={user.avatarUrl} size={500} />
              </div>
              <div className="hidden md:block">
                <h3 className="text-sm font-semibold dark:text-white">{user.displayName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.totalProfileViews} views</p>
              </div>
            </Link>

            <button className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-300 hover:text-[#fc3fb4] flex-shrink-0" onClick={toggleModal}>
              <FaEllipsisH className="text-xl lg:text-2xl" />
              <span className="hidden md:block">More</span>
            </button>
            {isModalOpen && <OtherModal isModalOpen={isModalOpen} closeModal={closeModal} />}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 dark:text-white border-t border-gray-300 dark:border-gray-800 flex justify-around items-center py-2 lg:hidden z-10 transition-colors duration-300">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} 
            className={`flex flex-col items-center relative ${pathname === href ? "text-[#fc3fb4]" : "text-gray-600 dark:text-gray-300"}`} 
            prefetch
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs">{label}</span>
            {pathname === href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
          </Link>
        ))}

        <Link
          href="/notifications"
          className={`flex flex-col items-center relative text-gray-600 dark:text-gray-300`}
          prefetch
        >
          <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
          <span className="text-xs">Notifications</span>
          {pathname === "/notifications" && (
            <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />
          )}
        </Link>

        {user.role === "ADMIN" && (
          <Link href={adminNavItem.href} className="flex flex-col items-center relative" prefetch={true}>
            <adminNavItem.icon className={`h-6 w-6 text-gray-600 dark:text-gray-300`} />
            <span className="text-xs">{adminNavItem.label}</span>
            {pathname === adminNavItem.href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;