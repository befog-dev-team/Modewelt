import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

// ✅ GET: Get follower info for a user
export async function GET(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    const { userId } = params;

    try {
        const { user: loggedInUser } = await validateRequest();

        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Fetch followers count from Follow table
        const followersCount = await prisma.follow.count({
            where: { followingId: userId },
        });

        const followingCount = await prisma.follow.count({
            where: { followerId: userId },
        });

        // ✅ Check if the user is followed by the logged-in user from Follow table
        const followRecord = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: loggedInUser.id,
                    followingId: userId,
                },
            },
        });

        const isFollowedByUser = !!followRecord;

        // ✅ Check for any pending requests (though with direct follow these shouldn't exist for new follows)
        const pendingRequest = await prisma.followerRequest.findUnique({
            where: {
                senderId_receiverId: {
                    senderId: loggedInUser.id,
                    receiverId: userId,
                },
            },
        });

        const hasPendingRequest = pendingRequest?.status === "PENDING";

        // ✅ Maintain compatibility with existing response structure if needed
        const followRequests = await prisma.followerRequest.findMany({
            where: {
                OR: [
                    { senderId: loggedInUser.id },
                    { receiverId: loggedInUser.id }
                ],
            },
            include: {
                sender: { select: { id: true, username: true, avatarUrl: true } },
                receiver: { select: { id: true, username: true, avatarUrl: true } },
            },
        });

        const sentRequests = followRequests.filter(req => req.senderId === loggedInUser.id);
        const receivedRequests = followRequests.filter(req => req.receiverId === loggedInUser.id);

        return Response.json({
            followers: followersCount,
            following: followingCount,
            isFollowedByUser,
            hasPendingRequest,
            sentRequests,
            receivedRequests
        });

    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// ✅ POST: Send a follow request
export async function POST(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    const { userId } = params;

    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (loggedInUser.id === userId) {
            return Response.json({ error: "You cannot follow yourself" }, { status: 400 });
        }

        // ✅ Check if already following
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: loggedInUser.id,
                    followingId: userId,
                },
            },
        });

        if (existingFollow) {
            return Response.json({ error: "Already following" }, { status: 400 });
        }

        // ✅ Create a new follow relationship immediately
        await prisma.$transaction([
            prisma.followerRequest.upsert({
                where: {
                    senderId_receiverId: {
                        senderId: loggedInUser.id,
                        receiverId: userId,
                    },
                },
                update: { status: "ACCEPTED" },
                create: { senderId: loggedInUser.id, receiverId: userId, status: "ACCEPTED" },
            }),
            prisma.follow.create({
                data: { followerId: loggedInUser.id, followingId: userId },
            }),
            prisma.notification.create({
                data: { issuerId: loggedInUser.id, recipientId: userId, type: "FOLLOW_ACCEPTED", read: false },
            }),
        ]);

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ DELETE: Unfollow a user or cancel a follow request
export async function DELETE(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    const { userId } = params;

    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Delete the follow relationship and request
        await prisma.$transaction([
            prisma.followerRequest.deleteMany({
                where: {
                    senderId: loggedInUser.id,
                    receiverId: userId,
                },
            }),
            prisma.follow.deleteMany({
                where: {
                    followerId: loggedInUser.id,
                    followingId: userId,
                },
            }),
            prisma.notification.deleteMany({
                where: {
                    issuerId: loggedInUser.id,
                    recipientId: userId,
                    type: "FOLLOW_REQUESTED",
                },
            }),
            prisma.notification.deleteMany({
                where: {
                    issuerId: loggedInUser.id,
                    recipientId: userId,
                    type: "FOLLOW_ACCEPTED",
                },
            }),
        ]);

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
