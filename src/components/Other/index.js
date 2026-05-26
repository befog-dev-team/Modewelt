"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/app/(main)/SessionProvider";
import { useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function OtherModal({ isModalOpen, closeModal }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // Logout confirmation state

    const { user } = useSession();
    if (!user) {
        return null;
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            logout(); // Fire the session invalidation in the background
            queryClient.clear();
            window.location.href = "/"; // Instant hard redirect
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
            setLogoutDialogOpen(false); // Close dialog after action
        }
    };

    return (
        <div>
            {/* Modal Overlay */}
            <div className={`${isModalOpen ? "flex" : "hidden"} fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all`}>
                {/* Profile Content */}
                <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg shadow-xl p-6 min-w-[342px] max-h-[450px] fixed top-[120px] right-5 z-50 transition-all">
                    {/* Close Button */}
                    <button
                        type="button"
                        className="absolute -left-11 top-0 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all"
                        onClick={closeModal}
                    >
                        <IoClose />
                        <span className="sr-only">Close modal</span>
                    </button>

                    {/* Profile Section */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center space-x-4">
                            {/* User Avatar */}
                            <Link href={`/profile/${user.username}`} prefetch={true}>
                                <UserAvatar avatarUrl={user.avatarUrl} size={500} className="rounded-full h-20 w-20 object-cover" />
                            </Link>
                            <div className="text-left">
                                <h1 className="text-[16px] font-semibold text-gray-900 dark:text-white transition-colors">{user.displayName}</h1>
                                <span className="text-[12px] text-gray-500 dark:text-gray-400">{user.profileHeadline}</span>
                            </div>
                        </div>

                        {/* View Profile Button */}
                        <button
                            type="button"
                            style={{ background: "#fc3fb4" }}
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
                                <Link href={"/setting"} onClick={closeModal}>
                                    <p className="text-[11px] cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#fc3fb4] transition-colors">Setting</p>
                                </Link>
                                <Link href={"/Help"} prefetch={true} onClick={closeModal}>
                                    <p className="text-[11px] cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#fc3fb4] transition-colors">Help</p>
                                </Link>
                                <Link href={"/Terms&Condition"} prefetch={true} onClick={closeModal}>
                                    <p className="text-[11px] cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#fc3fb4] transition-colors">Terms and Conditions</p>
                                </Link>
                            </div>
                            <hr className="dark:border-gray-800" />
                            <div className="space-y-2">
                                <h1 className="font-medium text-[14px] cursor-pointer text-gray-900 dark:text-white transition-colors">Manage</h1>
                                <div className="space-y-1">
                                    <Link href={"/feed"} prefetch={true} onClick={closeModal}>
                                        <p className="text-[11px] cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#fc3fb4] transition-colors">Posts & Activities</p>
                                    </Link>
                                    <Link href={"/jobs"} prefetch={true} onClick={closeModal}>
                                        <p className="text-[11px] cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#fc3fb4] transition-colors">Job post account</p>
                                    </Link>
                                </div>
                            </div>
                            <hr className="dark:border-gray-800" />
                        </div>

                        {/* Logout Button with Confirmation Dialog */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setLogoutDialogOpen(true)}
                                type="button"
                                disabled={loading}
                                style={{ background: "#fc3fb4" }}
                                className="text-white w-[111px] h-[32px] text-[12px] font-medium rounded-lg flex items-center justify-center"
                            >
                                {loading ? <Loader2 className="mx-auto animate-spin" /> : "Sign Out"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span>Confirm Logout</span>
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-sm text-gray-500">
                        Are you sure you want to log out? You will need to sign in again to access your account.
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setLogoutDialogOpen(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Sign Out"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
