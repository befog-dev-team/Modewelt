// components/FollowRequestButton.tsx
"use client";

import { useState } from "react";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { useSession } from "@/app/(main)/SessionProvider";
import { Loader2 } from "lucide-react";

interface FollowButtonProps {
    userId: string;
    initialState: FollowerInfo;
}

export default function FollowButton({
    userId,
    initialState,
}: FollowButtonProps) {
    const queryClient = useQueryClient();
    const { data = initialState } = useFollowerInfo(userId, initialState);
    const { user } = useSession();
    const [isProcessing, setIsProcessing] = useState(false);

    const queryKey: QueryKey = ["follower-info", user?.id, userId];

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
        onError: (_, __, context) => {
            if (context?.previousState) {
                queryClient.setQueryData(queryKey, context.previousState);
            }
            setIsProcessing(false);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            queryClient.refetchQueries({ queryKey });
            setIsProcessing(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            setIsProcessing(false);
        },
    });

    const buttonText = data.isFollowedByUser
        ? "Following"
        : data.hasPendingRequest
            ? "Requested"
            : "Follow";

    const buttonStyles = {
        Follow:
            "bg-[#f26744] text-white text-sm w-full px-4 py-2 hover:font-bold rounded flex items-center justify-center",
        Requested:
            "bg-gray-300 text-sm w-full px-4 py-2 hover:font-bold rounded flex items-center justify-center",
        Following:
            "bg-white text-[#B7B7B7] text-sm w-full px-4 py-2 hover:font-bold rounded border border-[#E7E7E7] flex items-center justify-center",
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
