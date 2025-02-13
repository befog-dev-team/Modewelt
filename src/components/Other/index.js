"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/app/(main)/SessionProvider";
import { useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";
import { Loader2 } from "lucide-react";

function OtherModal({ isModalOpen, closeModal }) {

    const router = useRouter();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false); // Loading state for logout

    const { user } = useSession();
    if (!user) {
        return null;
    }

    const handleLogout = async () => {
        setLoading(true); // Start loading
        try {
            await logout();
            queryClient.clear();
            router.push("/auth"); // Redirect after logout
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            {/* Modal Overlay (Transparent Background) */}
            <div
                className={`${isModalOpen ? 'flex' : 'hidden'
                    } fixed inset-0 bg-black bg-opacity-50 z-40`}
            >
                {/* Profile Content Container */}
                <div className="bg-white rounded-lg shadow-lg p-6 min-w-[342px] max-h-[450px] fixed top-[120px] right-5 z-50">
                    {/* Close Button */}
                    <button
                        type="button"
                        className="absolute -left-11 top-0 bg-white text-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200 hover:text-gray-900"
                        onClick={closeModal}
                    >
                        <IoClose />
                        <span className="sr-only">Close modal</span>
                    </button>

                    {/* Profile Section */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center space-x-4">
                            {/* User Avatar */}
                            <Link href={`/profile/${user.username}`}>
                                <UserAvatar avatarUrl={user.avatarUrl} size={500} className="rounded-full h-20 w-20 object-cover" />
                            </Link>
                            <div className="text-left">
                                <h1 className="text-[16px] font-semibold">{user.displayName}</h1>
                                <span className="text-[12px] text-gray-500">
                                    {user.profileHeadline}
                                </span>
                            </div>
                        </div>

                        {/* View Profile Button */}
                        <button
                            type="button"
                            style={{
                                background: '#f26744',
                            }}
                            className="text-white w-full h-[37px] font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2"
                            onClick={() => {
                                closeModal();
                                router.push(`/profile/${user.username}`);
                            }}
                        >
                            View your profile
                        </button>


                        {/* Settings and Management Section */}
                        <div className="space-y-4 text-left">
                            <div className="space-y-2">
                                {/*
                                 <Link href={"/premium"}>
                                    <p className="text-[11px] cursor-pointer">Premium</p>
                                </Link> 
                                */}
                                {/* <Link href={"/setting"}>
                                    <p className="text-[11px] cursor-pointer">Setting</p>
                                </Link> */}
                                <Link href={"/Help"}>
                                    <p className="text-[11px] cursor-pointer">Help</p>
                                </Link>
                                <Link href={"/Terms&Condition"}>
                                    <p className="text-[11px] cursor-pointer">Terms and Conditions</p>
                                </Link>
                            </div>
                            <hr />
                            <div className="space-y-2">
                                <h1 className="font-medium text-[14px] cursor-pointer">Manage</h1>
                                <div className="space-y-1">
                                    <Link href={"/feed"}>
                                        <p className="text-[11px] cursor-pointer">Posts & Activities</p>
                                    </Link>
                                    <Link href={"/jobs"}>
                                        <p className="text-[11px] cursor-pointer">Job post account</p>
                                    </Link>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleLogout}
                                type="button"
                                disabled={loading} // Disable when loading
                                style={{ background: ' #f26744 ' }}
                                className="text-white w-[111px] h-[32px] text-[12px] font-medium rounded-lg flex items-center justify-center"
                            >
                                {loading ?
                                    (<Loader2 className="mx-auto animate-spin" />)
                                    : "Sign Out"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    );
}

export default OtherModal;
