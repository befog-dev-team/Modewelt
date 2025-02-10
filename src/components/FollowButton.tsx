"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { useSession } from "@/app/(main)/SessionProvider";
import { useRouter } from "next/navigation";

interface FollowRequestButtonProps {
    userId: string;
    initialState: FollowerInfo;
}

export default function FollowRequestButton({ userId, initialState }: FollowRequestButtonProps) {
    const queryClient = useQueryClient();
    const { data = initialState } = useFollowerInfo(userId, initialState);
    const { user } = useSession();
    const router = useRouter();

    const queryKey: QueryKey = ["follower-info", userId];

    useEffect(() => {
        // Debugging: Log the current state
        console.log("Current state:", data);
    }, [data]);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const currentUserId = user.id;

            if (data.isFollowedByUser) {
                await kyInstance.delete(`/api/users/${userId}/followers`);
            } else if (data.hasPendingRequest) {
                await kyInstance.patch(`/api/users/${userId}/requests`, {
                    json: { action: "CANCEL", currentUserId },
                });
            } else {
                await kyInstance.post(`/api/users/${userId}/followers`, {
                    json: { senderId: currentUserId, receiverId: userId },
                });
            }
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

            queryClient.setQueryData(queryKey, (prev: FollowerInfo) => {
                if (!prev) return previousState;

                if (prev.isFollowedByUser) {
                    return { ...prev, isFollowedByUser: false, hasPendingRequest: false };
                } else if (prev.hasPendingRequest) {
                    return { ...prev, hasPendingRequest: false };
                } else {
                    return { ...prev, hasPendingRequest: true };
                }
            });

            return { previousState };
        },
        onError: (error, _, context) => {
            queryClient.setQueryData(queryKey, context?.previousState);
            console.error(error);
            toast.error(error.message || "Something went wrong. Please try again.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            queryClient.refetchQueries({ queryKey }); // Force immediate refetch
            router.refresh(); // Refresh Next.js route
        },
    });

    const buttonText = data.isFollowedByUser
        ? "Following"
        : data.hasPendingRequest
            ? "Requested"
            : "Follow";

    const buttonStyles = {
        Follow: "bg-gradient-to-r from-[#c166a0] to-[#A45286] text-white text-sm font-bold py-1 px-4 rounded",
        Requested: "bg-gray-300 py-1 px-4 text-sm font-semibold py-1 px-4 rounded",
        Following: "bg-white text-[#B7B7B7] text-sm font-bold py-1 px-4 rounded border-[#E7E7E7] border-[1px]",
    };

    return (
        <button
            className={buttonStyles[buttonText] || "bg-primary text-white text-sm font-semibold py-1 px-4 rounded"}
            onClick={() => mutate()}
        >
            {buttonText}
        </button>
    );
}