"use client";

import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
// import { Bell } from "lucide-react";
// import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";

// NotificationsButtonProps interface
interface NotificationsButtonProps {
    initialState: NotificationCountInfo;
}

// NotificationsButton component
export default function NotificationsButton({
    initialState, // initialState is the initial state of the notifications
}: NotificationsButtonProps) {
    const { data } = useQuery({ // useQuery to get the unread notification count
        queryKey: ["unread-notification-count"], // queryKey is the key for the query
        queryFn: () => // queryFn is the function to fetch the unread notification count
            kyInstance
                .get("/api/notifications/unread-count") // GET request to /api/notifications/unread-count
                .json<NotificationCountInfo>(), // json<NotificationCountInfo>() is the type of the response
        initialData: initialState, // initialData is the initial state
        // refetchInterval: 60 * 1000, // refetchInterval is the interval to refetch the data (60 seconds)
    });

    return (
        <div className="flex flex-col justify-center items-center relative">
            <IoNotificationsOutline className="h-6 w-6" />
            {!!data.unreadCount && ( // If there are unread notifications, show the unread count
                <span className="absolute -right-1 -top-1 rounded-full bg-primarybtn px-1 text-xs font-medium tabular-nums text-primary-foreground">
                    {formatNumber(data.unreadCount)}
                </span>
            )}
        </div>
    );
}