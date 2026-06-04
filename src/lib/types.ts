import { Prisma } from "@prisma/client"; // Import Prisma client

// Define a lighter user select for feeds and basic components
export function getFeedUserDataSelect(loggedInUserId: string) {
    return {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        profileHeadline: true,
        _count: {
            select: {
                followers: true,
                following: true,
            },
        },
    } satisfies Prisma.UserSelect;
}

// Define the full user select properties for profile pages
export function getUserDataSelect(loggedInUserId: string) {
    return {
        id: true,
        username: true,
        email: true,
        displayName: true,
        phone: true,
        location: true,
        avatarUrl: true,
        backgroundImageUrl: true,
        googleId: true,
        profileHeadline: true,
        profileHeadlineLink: true,
        bio: true,
        totalProfileViews: true,
        totalLikes: true,
        totalComments: true,
        totalShares: true,
        totalFollowers: true,
        totalFollowing: true,
        totalPosts: true,
        totalSearchAppearances: true,
        posts: {
            select: {
                id: true,
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        },
        projects: { // ✅ Add this to fetch user's projects
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                media: {
                    select: {
                        id: true,
                        url: true,
                        type: true,
                    },
                },
            },
        },
        skills: {
            select: {
                id: true,
                title: true,
                endorsements: true, // Number of endorsements
                endorsementsList: {
                    where: {
                        userId: loggedInUserId, // Check if logged-in user has endorsed
                    },
                    select: {
                        userId: true,
                    },
                },
            },
        },
        experiences: {
            select: {
                id: true,
                jobTitle: true,
                company: true,
                location: true,
                duration: true,
                description: true,
                publicId: true,
                imageUrl: true, // Company logo
                createdAt: true,
            },
        },

        educations: {
            select: {
                id: true,
                institution: true,
                degree: true,
                duration: true,
                additionalInfo: true,
                imageUrl: true, // Institution logo
                createdAt: true,
            },
        },

        profileViewedUser: { // Include profileViewedUser
            select: {
                viewer: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                        displayName: true,
                        profileHeadline: true,
                    },
                },
            },
        },
        followers: {
            where: {
                followerId: loggedInUserId,
            },
            select: {
                followerId: true,
            },
        },
        senderRequest: {
            where: {
                senderId: loggedInUserId,
                status: "PENDING",
            },
            select: {
                id: true,
            },
        },
        receiverRequest: {
            where: {
                receiverId: loggedInUserId,
                status: "PENDING",
            },
            select: {
                id: true,
            },
        },
        _count: {
            select: {
                posts: true,
                projects: true,
                skills: true,
                experiences: true, 
                educations: true,
                following: true,
                followers: true,
                senderRequest: true,
                receiverRequest: true,
            },
        },
    } satisfies Prisma.UserSelect;
}

// Define the UserData type
export type UserData = Prisma.UserGetPayload<{
    select: ReturnType<typeof getUserDataSelect>;
}>;

// Define the post data include function
export function getPostDataInclude(loggedInUserId: string) {
    return {
        user: {
            select: getFeedUserDataSelect(loggedInUserId), // Use lighter select for posts in feeds
        },
        attachments: true, // Include attachments
        likes: {
            where: {
                userId: loggedInUserId, // Filter likes by logged-in user's ID
            },
            select: {
                userId: true, // Select userId
            },
        },
        comments: {
            include: getCommentDataInclude(loggedInUserId), // Include comment data
        },
        _count: {
            select: {
                likes: true, // Count likes
                comments: true, // Count comments
            },
        },
    };
}

// Define the PostData type
export type PostData = Prisma.PostGetPayload<{
    include: ReturnType<typeof getPostDataInclude>;
}>;


// Define the PostsPage interface
export interface PostsPage {
    posts: PostData[]; // Array of post data
    nextCursor: string | null; // Cursor for pagination
}

// Define the CommentData type (now supports likes & replies)
export function getCommentDataInclude(loggedInUserId: string) {
    return {
        user: {
            select: getFeedUserDataSelect(loggedInUserId),
        },
        likes: {
            where: {
                userId: loggedInUserId, // Check if logged-in user liked this comment
            },
            select: {
                userId: true,
            },
        },
        _count: {
            select: {
                likes: true, // Count likes on comment
                replies: true, // Count replies
            },
        },
        replies: {
            include: {
                user: {
                    select: getFeedUserDataSelect(loggedInUserId),
                },
                likes: {
                    where: {
                        userId: loggedInUserId,
                    },
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        replies: true,
                    },
                },
            },
            orderBy: { createdAt: "asc" }, // Show replies in chronological order
        },
    } satisfies Prisma.CommentInclude;
}

// Define the CommentData type
export type CommentData = Prisma.CommentGetPayload<{
    include: ReturnType<typeof getCommentDataInclude>;
}>;

// Define the CommentsPage interface
export interface CommentsPage {
    comments: CommentData[];
    previousCursor: string | null;
}

// Define the FollowerInfo interface
export interface FollowerInfo {
    following: number; // Total number of following
    followers: number; // Total number of followers
    followingId: string;
    sentRequests: FollowRequest[]; // Array of follow requests
    receivedRequests: FollowRequest[]; // Array of follow requests
    hasPendingRequest: boolean;
    isFollowedByUser: boolean; // Indicates if the user is followed by the logged-in user
}

// Define the FollowRequest interface
export interface FollowRequest {
    senderId: string;
    action: "CANCEL" | "ACCEPT" | "DECLINE";
    receivedRequests: number;
}

// Define the notifications include properties
export const notificationsInclude = {
    issuer: {
        select: {
            username: true,
            displayName: true,
            avatarUrl: true,
        }
    },
    post: {
        select: {
            content: true,
        }
    }
} satisfies Prisma.NotificationInclude; // This is required to satisfy the Prisma.NotificationInclude type

// Define the NotificationData interface
export interface NotificationCountInfo {
    unreadCount: number; // Number of unread notifications
}

// Define the NotificationData type using Prisma's NotificationGetPayload to infer types from the Prisma schema
export type NotificationData = Prisma.NotificationGetPayload<{
    include: typeof notificationsInclude;
}>;

// Correct the NotificationsPage type to directly include notifications and nextCursor
export interface NotificationsPage {
    notifications: NotificationData[];
    nextCursor: string | null;
}

export type ProjectData = Prisma.ProjectGetPayload<{
    include: {
        media: true;
    };
}>;

export type EducationData = Prisma.EducationGetPayload<{
    include: object;
}>;

export type ExperienceData = Prisma.ExperienceGetPayload<{
    include: object;
}>;

// ✅ Define SkillData type
export type SkillData = Prisma.SkillGetPayload<{
    include: {
        endorsementsList: true;
    };
}>;

// ✅ Define EndorsementData type
export type EndorsementData = Prisma.EndorsementGetPayload<{
    include: {
        user: true;
    };
}>;