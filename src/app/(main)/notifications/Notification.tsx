import UserAvatar from "@/components/UserAvatar";
import { NotificationData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NotificationType } from "@prisma/client";
// import { NotificationType } from "@prisma/client";
import { Eye, Heart, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

// Notification interface
interface NotificationProps {
    notification: NotificationData;
}

// Notification component
export default function Notification({ notification }: NotificationProps) {
    const notificationTypeMap: Record< // Record type
        NotificationType, // NotificationType enum
        { message: string; icon: JSX.Element; href: string } // Object type
    > = {
        FOLLOW_REQUESTED: {
            message: `requested to follow you`,
            icon: <User2 className="size-7 text-primary" />,
            href: `/network?tab=invitations`,
        },
        FOLLOW_ACCEPTED: {
            message: `accepted your follow request`,
            icon: <User2 className="size-7 text-primary" />,
            href: `/profile/${notification.issuer.username}`,
        },
        COMMENT: {
            message: `commented on your post`,
            icon: <MessageCircle className="size-7 fill-primary text-primary" />,
            href: `/posts/${notification.postId}`,
        },
        LIKE: {
            message: `liked your post`,
            icon: <Heart className="size-7 fill-red-500 text-red-500" />,
            href: `/posts/${notification.postId}`,
        },
        PROFILE_VIEW: {
            message: `viewed your profile`,
            icon: <Eye className="size-7 text-primary" />,
            href: `/profile/${notification.issuer.username}`,
        }
    };

    // Destructure the message, icon, and href from the notificationTypeMap object
    const { message, icon, href } = notificationTypeMap[notification.type];

    return (
        <Link href={href} className="block">
            <article
                className={cn( // cn is a utility function to conditionally join class names
                    "flex gap-3 rounded bg-card p-5 shadow-sm transition-colors hover:bg-primary/5 hover:bg-opacity-10",
                    !notification.read && "bg-card", // If the notification is unread, apply the bg-primary/10 class
                )}
            >
                <div className="my-1">{icon}</div>
                <div className="space-y-3">
                    <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={100} />
                    <div>
                        <span className="font-bold">{notification.issuer.displayName}</span>{" "}
                        <span>{message}</span>
                    </div>
                    {notification.post && (
                        <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
                            {notification.post.content}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}