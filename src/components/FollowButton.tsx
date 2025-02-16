"use client";

import { useState } from "react";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { useSession } from "@/app/(main)/SessionProvider";
import { Loader2 } from "lucide-react";

interface FollowRequestButtonProps {
    userId: string;
    initialState: FollowerInfo;
}

export default function FollowRequestButton({
    userId,
    initialState,
}: FollowRequestButtonProps) {
    const queryClient = useQueryClient();
    const { data = initialState } = useFollowerInfo(userId, initialState);
    const { user } = useSession();
    const [isProcessing, setIsProcessing] = useState(false);

    const queryKey: QueryKey = ["follower-info", userId];

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            setIsProcessing(true);
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

        // ✅ Optimistic Update
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });

            const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

            // Optimistically update
            queryClient.setQueryData(queryKey, (prev: FollowerInfo | undefined) => {
                if (!prev) return previousState;

                const isFollowing = prev.isFollowedByUser;
                return {
                    ...prev,
                    isFollowedByUser: !isFollowing,
                    hasPendingRequest: isFollowing ? false : !prev.hasPendingRequest,
                    followers: isFollowing ? prev.followers - 1 : prev.followers + 1,
                };
            });

            return { previousState };
        },

        // ✅ Rollback on Error
        onError: (_, __, context) => {
            if (context?.previousState) {
                queryClient.setQueryData(queryKey, context.previousState);
            }
            setIsProcessing(false);
        },

        // ✅ Update on Success
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },

        // ✅ Final State Sync
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            setIsProcessing(false);
        },
    });

    // Button Text
    const buttonText = data.isFollowedByUser
        ? "Following"
        : data.hasPendingRequest
            ? "Requested"
            : "Follow";

    // Button Styles
    const buttonStyles = {
        Follow:
            "bg-[#f26744] text-white text-sm font-bold w-full py-1 px-4 rounded flex items-center justify-center",
        Requested:
            "bg-gray-300 py-1 px-4 text-sm font-semibold rounded flex items-center w-full justify-center",
        Following:
            "bg-white text-[#B7B7B7] text-sm font-bold py-1 px-4 rounded border border-[#E7E7E7] w-full flex items-center justify-center",
    };

    return (
        <button
            className={buttonStyles[buttonText] || buttonStyles.Follow}
            onClick={() => !isProcessing && mutate()}
            disabled={isPending || isProcessing}
        >
            {isPending || isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
                buttonText
            )}
        </button>
    );
}