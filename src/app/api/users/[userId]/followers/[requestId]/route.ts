import { validateRequest } from "@/auth"; // Import the validateRequest function from the auth module
import prisma from "@/lib/prisma"; // Import the Prisma client instance

// PATCH: Accept or decline a follow request
export async function PATCH(req: Request, props: { params: Promise<{ userId: string; requestId: string }> }) {
    const params = await props.params;
    const { requestId } = params;

    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();
        const action = body.action; // "ACCEPT" or "DECLINE"

        if (!["ACCEPT", "DECLINE"].includes(action)) {
            return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
        }

        const request = await prisma.followerRequest.findUnique({
            where: { id: requestId },
        });

        console.log("Request:", request);

        if (!request || request.receiverId !== loggedInUser.id) {
            return new Response(JSON.stringify({ error: "Request not found or unauthorized" }), { status: 404 });
        }

        if (action === "ACCEPT") {
            console.log("Accepting request...");
            // ✅ Update request status to 'ACCEPTED'
            await prisma.followerRequest.update({
                where: { id: requestId },
                data: { status: "ACCEPTED" },
            });

            // ✅ Add follow relationship
            await prisma.follow.create({
                data: {
                    followerId: request.senderId,
                    followingId: request.receiverId,
                },
            });

            await prisma.notification.create({
                data: {
                    issuerId: loggedInUser.id,
                    recipientId: request.senderId,
                    type: "FOLLOW_ACCEPTED",
                    read: false
                },
            });
            console.log("Request accepted!");
        } else if (action === "DECLINE") {
            // ✅ Update request status to 'DECLINED'
            await prisma.followerRequest.update({
                where: { id: requestId },
                data: { status: "DECLINED" },
            });

            // Delete the request after updating status
            await prisma.followerRequest.delete({
                where: { id: requestId },
            });
        }

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error("Error in PATCH request:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}