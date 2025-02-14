"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/Images/logo.svg";
import { SlFeed } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FiBriefcase } from "react-icons/fi";
import {
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
// import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import OtherModal from "../Other/index";
// import SearchModal from "../Search/index";
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "../UserAvatar";
import NotificationsButton from "@/app/(main)/notifications/NotificationsButton";
import SearchField from "../SearchField";

function Navbar({ unreadNotificationCount }) {
  // const [placeholder, setPlaceholder] = useState("Search"); // Search Bar Placeholder
  const [isModalOpen, setIsModalOpen] = useState(false); // Other Modal
  //  const [searchQuery, setSearchQuery] = useState(""); // Search Query

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Toggle Other Modal

  // Close Modals
  const closeModal = () => {
    setIsModalOpen(false); // Close Other Modal
  };

  // Search Query Handler
  // useEffect(() => {
  //   const handler = setTimeout(() => { // Debounce Search Query 
  //     console.log(searchQuery); // Search Query
  //   }, 300);
  //   return () => {
  //     clearTimeout(handler); // Clear Timeout
  //   };
  // }, [searchQuery]); // Search Query

  const { user } = useSession(); // User Session

  // If User is not Logged In
  if (!user) {
    return null; // Return Nothing
  }

  return (
    <div className="bg-[#a2defa] w-full h-16 flex flex-col lg:flex-row items-center text-sm text-gray-600">
      <div className="container mx-auto flex items-center px-2 lg:px-6">
        {/* Logo */}
        <Link href="/feed" className="flex flex-col items-center" prefetch={true}>
          <Image
            src={logo}
            alt="Company Logo"
            className="h-10 w-10 lg:mx-10 sm:mx-1"
          />
        </Link>
        <div className="hidden lg:flex flex-grow items-center space-x-4 lg:space-x-6">
          <Link href="/feed" className="flex flex-col items-center" prefetch={true}>
            <SlFeed className="h-6 w-6" />
            <span className="text-xs">Feed</span>
          </Link>
          <Link href="/network" className="flex flex-col items-center" prefetch={true}>
            <GoPeople className="h-6 w-6" />
            <span className="text-xs">Network</span>
          </Link>
          <Link href="/jobs" className="flex flex-col items-center" prefetch={true}>
            <FiBriefcase className="h-6 w-6" />
            <span className="text-xs">Jobs</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center" prefetch={true}>
            <IoChatbubbleEllipsesOutline className="h-6 w-6" />
            <span className="text-xs">Messages</span>
          </Link>
          <Link href="/notifications" className="flex flex-col items-center" prefetch={true}>
            <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
          </Link>
          {/* <Link href="/shop" className="flex flex-col items-center">
            <AiOutlineShoppingCart className="h-6 w-6" />
            <span className="text-xs">Cart</span>
          </Link> */}
        </div>

        {/* Search Bar */}
        <div className="flex flex-grow items-center relative mx-4">
          <SearchField />
          {/* <SearchModal isSearchOpen={isSearchOpen} closeModal={closeModal} /> */}
        </div>

        {/* Profile & More Options */}
        <div className="flex items-center space-x-4">
          {/* <Link href="/profile" className="flex items-center space-x-2">
          </Link> */}
          <Link href={`/profile/${user.username}`} className="flex items-center space-x-2" prefetch={true}>
            <div className="w-[3rem] h-[3rem] rounded-[100%] overflow-hidden">
              <UserAvatar avatarUrl={user.avatarUrl} size={500} />
            </div>
            <div className="hidden md:block">
              <h3 className="text-sm font-semibold">{user.displayName}</h3>
              <p className="text-xs text-gray-500">{user.totalProfileViews} views</p>
            </div>
          </Link>

          <button
            className="flex flex-col items-center text-sm text-gray-600 hover:text-[#f26744]"
            onClick={toggleModal}
          >
            <FaEllipsisH className="text-2xl" />
            <span className="hidden md:block">Other</span>
          </button>
          <OtherModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>

      </div>

      {/* Bottom Navbar for Mobile & Tablet */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around items-center py-2 lg:hidden z-10">
        <Link href="/feed" className="flex flex-col items-center" prefetch={true}>
          <SlFeed className="h-6 w-6" />
          <span className="text-xs">Feed</span>
        </Link>
        <Link href="/network" className="flex flex-col items-center" prefetch={true}>
          <GoPeople className="h-6 w-6" />
          <span className="text-xs">People</span>
        </Link>
        <Link href="/jobs" className="flex flex-col items-center" prefetch={true}>
          <FiBriefcase className="h-6 w-6" />
          <span className="text-xs">Jobs</span>
        </Link>
        <Link href="/chat" className="flex flex-col items-center" prefetch={true}>
          <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          <span className="text-xs">Messages</span>
        </Link>
        <Link href="/notifications" className="flex flex-col items-center" prefetch={true}>
          <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
        </Link>
        {/* <Link href="/shop" className="flex flex-col items-center">
          <AiOutlineShoppingCart className="h-6 w-6" />
          <span className="text-xs">Cart</span>
        </Link> */}
      </div>
    </div>
  );
}

export default Navbar;
