"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineFileUpload, MdEditSquare } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import vector from "../../../../public/assets/profile/Vector.png";
import EditProfile from "@/components/Profile/EditProfile";
import UserBackground from "@/components/UserBackground";
import UserAvatar from "@/components/UserAvatar";
import { formatNumber } from "@/lib/utils";
import FollowButton from "@/components/FollowButton"

export default function UserProfile({ user, loggedinUserId, followerInfo }) {
    const [isEditProfileVisible, setIsEditProfileVisible] = useState(false); // State to toggle the Edit Profile modal

    // Function to toggle the Edit Profile modal
    const toggleEditProfile = () => {
        setIsEditProfileVisible(!isEditProfileVisible); // Toggle the state
    };

    // Function to close the modal after update
    const closeModal = () => {
        setIsEditProfileVisible(false); // Close the modal
    };

    return (
        <div className="h-auto bg-gray-100 flex items-center justify-center">
            <div className="md:min-w-[850px] max-w-[850px] w-full shadow-lg rounded-lg">
                {/* Background Image */}
                <div className="relative w-full h-[180px]">
                    {/* User Profile Backgound */}
                    <UserBackground
                        backgroundImageUrl={user.backgroundImageUrl}
                        alt="Profile Background"
                        width={500}
                        height={500}
                        className="w-full h-[180px] object-fill"
                    />

                    {/* Action Buttons */}
                    <div className="absolute inset-x-2 top-2 flex justify-between">
                        {/* Upload Icon */}
                        <div
                            className="p-2 bg-white bg-opacity-90 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-transform"
                            aria-label="Upload Icon"
                            tabIndex={0}
                        >
                            <MdOutlineFileUpload
                                className="text-gray-600 text-xl"
                                aria-hidden="true"
                            />
                        </div>

                        {/* Edit Profile Button */}
                        {user.id === loggedinUserId ? ( // Check if the user is the logged in user
                            <div>
                                <div
                                    onClick={toggleEditProfile}
                                    className="flex items-center bg-white bg-opacity-90 px-4 py-2 rounded-md shadow-lg space-x-2 cursor-pointer hover:scale-105 transition-transform"
                                    role="button"
                                    aria-label="Edit Profile"
                                    tabIndex={0}
                                >
                                    <MdEditSquare className="text-gray-600 text-xl" />
                                    <p className="text-gray-800 font-medium text-sm">Edit Profile</p>
                                </div>
                            </div>
                        ) : (
                            <div className="mr-4 mt-2 scale-125 rounded-md border border-black">
                                <FollowButton userId={user.id} initialState={followerInfo} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Details */}
                <div className="relative mt-1 px-4 pb-4">
                    <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
                        {/* Profile Image */}
                        <div className="-mt-4 bg-gray-200 rounded-full border-[5px] border-white overflow-hidden">
                            <UserAvatar
                                avatarUrl={user.avatarUrl}
                                alt="User Profile"
                                width={5000}
                                height={5000}
                                className="object-cover h-[170px] w-[170px]"
                            />
                        </div>

                        {/* User Information */}
                        <div className="text-center md:text-left mt-4 md:mt-0 flex-1">
                            <h1 className="text-2xl font-bold">{user.displayName}</h1>
                            <h2 className="text-lg">@{user.username}</h2>
                            {user.location &&
                                <div className="flex items-center justify-center md:justify-start mt-2 space-x-2">
                                    <Image
                                        src={vector}
                                        alt="Location Icon"
                                        width={13}
                                        height={13}
                                    />
                                    <p className="text-gray-700">{user.location}</p>
                                </div>
                            }

                            {user.bio && (
                                <p className="text-gray-600 mt-2">
                                    {user.bio}
                                </p>
                            )}

                            {/* Buttons */}
                            <div className="mt-6 flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                                <div className="w-full flex justify-center items-center md:w-[170px] h-[32px] bg-gradient-to-b from-[#FFA1AF] to-[#A45286] text-white rounded-md">
                                    {formatNumber(user._count.posts)} Posts
                                </div>
                                <div className="w-full flex justify-center items-center md:w-[170px] h-[32px] bg-white text-[#A45286] border-[2px] border-[#A45286] rounded-md">
                                    {formatNumber(user._count.following)} Connections
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conditional Rendering of EditProfile Popup */}
                {isEditProfileVisible && ( // Check if the Edit Profile modal is visible
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                        onClick={toggleEditProfile}
                    >
                        <div
                            className="relative max-w-[600px] w-[90vw] bg-white p-6 rounded-lg shadow-lg h-[98vh] overflow-y-auto no-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                            <EditProfile user={user} closeModal={closeModal} />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleEditProfile();
                                }}
                                className="absolute top-3 right-3 text-xl text-gray-600 hover:text-gray-800"
                            >
                                <RxCross2 />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};