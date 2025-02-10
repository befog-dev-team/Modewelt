import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

// ✅ GET: Get follower info for a user
export async function GET(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    const { userId } = params;
    console.log("User ID:", userId);

    try {
        const { user: loggedInUser } = await validateRequest();

        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Fetch only accepted followers
        const followers = await prisma.followerRequest.count({
            where: { receiverId: userId, status: "ACCEPTED" },
        });

        // ✅ Get all follow requests involving the logged-in user
        const followRequests = await prisma.followerRequest.findMany({
            where: {
                OR: [ // Filter by senderId or receiverId
                    { senderId: loggedInUser.id }, // Requests sent by logged-in user
                    { receiverId: loggedInUser.id } // Requests received by logged-in user
                ],
            },
            include: {
                sender: { select: { id: true, username: true, avatarUrl: true } },
                receiver: { select: { id: true, username: true, avatarUrl: true } },
            },
        });

        // ✅ Check if the user is followed by the logged-in user
        const isFollowedByUser = followRequests.some(
            (req) =>
                req.senderId === loggedInUser.id &&
                req.receiverId === userId && // Check for the specific user
                req.status === "ACCEPTED"
        );

        // ✅ Check if the logged-in user has a pending request
        const hasPendingRequest = followRequests.some(
            (req) =>
                req.senderId === loggedInUser.id &&
                req.receiverId === userId && // Check for the specific user
                req.status === "PENDING"
        );


        // ✅ Get sent requests (sent by the logged-in user)
        const sentRequests = followRequests.filter(req => req.senderId === loggedInUser.id);

        // ✅ Get received requests (received by the logged-in user)
        const receivedRequests = followRequests.filter(req => req.receiverId === loggedInUser.id);

        return Response.json({
            followers,
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

        // ✅ Check if user is already following
        const existingRequest = await prisma.followerRequest.findFirst({
            where: {
                senderId: loggedInUser.id,
                receiverId: userId,
                status: "PENDING"
            },
        });

        // ✅ Check if follow request already sent
        if (existingRequest) {
            return Response.json({ error: "Follow request already sent" }, { status: 400 });
        }

        // ✅ Create a new follow request
        await prisma.$transaction([
            prisma.followerRequest.create({
                data: { senderId: loggedInUser.id, receiverId: userId, status: "PENDING" },
            }),
            prisma.notification.create({
                data: { issuerId: loggedInUser.id, recipientId: userId, type: "FOLLOW_REQUESTED", read: false },
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

        // ✅ Check if user is following OR has a pending request
        const existingFollow = await prisma.followerRequest.findFirst({
            where: {
                senderId: loggedInUser.id,
                receiverId: userId,
            },
        });

        if (!existingFollow) {
            return Response.json({ error: "No follow relationship found" }, { status: 404 });
        }

        // ✅ Delete the follow relationship or cancel request
        await prisma.$transaction([
            prisma.followerRequest.deleteMany({
                where: {
                    senderId: loggedInUser.id,
                    receiverId: userId,
                },
            }),
            prisma.notification.deleteMany({
                where: {
                    issuerId: loggedInUser.id,
                    recipientId: userId,
                    type: "FOLLOW_REQUESTED",
                },
            }),
        ]);

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
