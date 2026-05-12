"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, AlertTriangle } from "lucide-react";

import { useSession } from "../SessionProvider";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import { logout } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Network() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: deleteAccount } = useMutation({
        mutationFn: async () => {
            await axios.delete("/api/users/delete-account");
        },
        onSuccess: () => {
            toast.success("Your account has been deleted.");
            router.push("/"); // Redirect to home after deletion
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete account");
            setLoading(false); // Stop loading if deletion fails
        },
    });

    const { user } = useSession();

    if (!user) {
        return null;
    }

    const handleDeleteAccount = async () => {
        setLoading(true); // Start loading

        try {
            deleteAccount(); // Proceed with account deletion
            await logout(); // Log out first
            queryClient.clear(); // Clear session and cache
        } catch (error) {
            console.error("Logout failed:", error);
            setLoading(false); // Stop loading if logout fails
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }}
            ></div>
            {/* Overlay for readability */}
            <div className="fixed inset-0 bg-white/75 backdrop-blur-[1px] -z-10"></div>

            <div className="flex flex-col md:flex-row relative z-10">
                {/* Left Sidebar */}
                <div className="w-full md:max-w-[300px] md:w-[300px] h-auto md:h-[100vh] bg-white/20 backdrop-blur-sm shadow-md">
                    <div className="px-6 flex items-center space-x-4 py-6">
                        {/* User Avatar */}
                        <Link href={`/profile/${user.username}`} prefetch={true}>
                            <UserAvatar avatarUrl={user.avatarUrl} size={500} className="rounded-full h-10 w-10 object-cover" />
                        </Link>
                        <div className="text-left">
                            <h1 className="text-2xl font-semibold">Setting</h1>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-8 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <AlertTriangle className="w-6 h-6 text-red-500" />
                                        <div>
                                            <h3 className="text-lg font-medium">Delete Account</h3>
                                            <p className="text-sm text-gray-500">
                                                This action is irreversible. All your data will be permanently deleted.
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="destructive" onClick={() => setOpen(true)}>
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span>Are you sure?</span>
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-sm text-gray-500">
                        This action is irreversible. Your account data will be deleted permanently.
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
