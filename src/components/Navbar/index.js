"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/Images/logo.svg";
import { SlFeed } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FiBriefcase } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaEllipsisH } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import OtherModal from "../Other/index";
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "../UserAvatar";
import NotificationsButton from "@/app/(main)/notifications/NotificationsButton";
import SearchField from "../SearchField";

function Navbar({ unreadNotificationCount }) {
  const { user } = useSession();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  if (!user) return null;

  const navItems = [
    { href: "/feed", icon: SlFeed, label: "Feed" },
    { href: "/network", icon: GoPeople, label: "Network" },
    { href: "/jobs", icon: FiBriefcase, label: "Jobs" },
    { href: "/chat", icon: IoChatbubbleEllipsesOutline, label: "Messages" },
  ];

  const adminNavItem = { href: "/admin", icon: RiAdminLine, label: "Admin" };

  return (
    <div className="bg-[#dcf59d] w-full h-16 flex flex-col lg:flex-row items-center text-sm text-gray-600 shadow-sm">
      <div className="container mx-auto flex items-center px-2 lg:px-6">
        <Link href="/feed" className="flex flex-col items-center" prefetch>
          <Image src={logo} alt="Company Logo" className="h-10 w-10 lg:mx-10 sm:mx-1" />
        </Link>

        {/* Desktop View */}
        <div className="hidden lg:flex flex-grow items-center space-x-6">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex flex-col items-center relative" prefetch>
              <Icon className={`h-6 w-6 ${pathname === href ? "text-[#fc3fb4]" : "text-gray-600"}`} />
              <span className="text-xs">{label}</span>
              {pathname === href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
            </Link>
          ))}

          <Link
            href="/notifications"
            className={`flex flex-col items-center relative text-gray-600`}
            prefetch
          >
            <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
            <span className="text-xs">Notifications</span>
            {pathname === "/notifications" && (
              <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />
            )}
          </Link>

          {user.role === "ADMIN" && (
            <Link href={adminNavItem.href} className="flex flex-col items-center relative" prefetch>
              <adminNavItem.icon className={`h-6 w-6  text-gray-600`} />
              <span className="text-xs">{adminNavItem.label}</span>
              {pathname === adminNavItem.href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
            </Link>
          )}
        </div>

        <div className="flex flex-grow items-center relative mx-4">
          <SearchField />
        </div>

        <div className="flex items-center space-x-4">
          <Link href={`/profile/${user.username}`} className="flex items-center space-x-2" prefetch>
            <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden">
              <UserAvatar avatarUrl={user.avatarUrl} size={500} />
            </div>
            <div className="hidden md:block">
              <h3 className="text-sm font-semibold">{user.displayName}</h3>
              <p className="text-xs text-gray-500">{user.totalProfileViews} views</p>
            </div>
          </Link>
          <button className="flex flex-col items-center text-sm hover:text-[#fc3fb4]" onClick={toggleModal}>
            <FaEllipsisH className="text-2xl" />
            <span className="hidden md:block">More</span>
          </button>
          <OtherModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
      </div>

      {/* Mobile View */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around items-center py-2 lg:hidden z-10">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex flex-col items-center relative" prefetch>
            <Icon className={`h-6 w-6 ${pathname === href ? "text-[#fc3fb4]" : "text-gray-600"}`} />
            <span className="text-xs">{label}</span>
            {pathname === href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
          </Link>
        ))}

        <Link
          href="/notifications"
          className={`flex flex-col items-center relative text-gray-600`}
          prefetch
        >
          <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
          <span className="text-xs">Notifications</span>
          {pathname === "/notifications" && (
            <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />
          )}
        </Link>

        {user.role === "ADMIN" && (
          <Link href={adminNavItem.href} className="flex flex-col items-center relative" prefetch>
            <adminNavItem.icon className={`h-6 w-6  text-gray-600`} />
            <span className="text-xs">{adminNavItem.label}</span>
            {pathname === adminNavItem.href && <div className="absolute bottom-[-4px] w-full h-1 bg-[#fc3fb4] rounded-full" />}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;