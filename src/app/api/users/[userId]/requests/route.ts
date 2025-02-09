import prisma from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const { action, currentUserId } = await req.json();

    if (!userId || !currentUserId || !action) {
        return new Response(JSON.stringify({ error: "Missing required parameters" }), { status: 400 });
    }

    try {
        switch (action) {
            case "ACCEPT": {
                const existingRequest = await prisma.followerRequest.findUnique({
                    where: {
                        senderId_receiverId: {
                            senderId: userId,
                            receiverId: currentUserId,
                        },
                    },
                });

                if (!existingRequest) {
                    return new Response(JSON.stringify({ error: "Follow request not found" }), { status: 404 });
                }

                const updatedRequest = await prisma.followerRequest.update({
                    where: {
                        senderId_receiverId: {
                            senderId: userId,
                            receiverId: currentUserId,
                        },
                    },
                    data: {
                        status: "ACCEPTED",
                    },
                });

                console.log("Updated request:", updatedRequest);

                await prisma.follow.create({
                    data: {
                        followerId: userId,
                        followingId: currentUserId,
                    },
                });

                return new Response(JSON.stringify({ message: "Follow request accepted", updatedRequest }));
            }

            case "DECLINE": {
                await prisma.followerRequest.update({
                    where: {
                        senderId_receiverId: {
                            senderId: userId,
                            receiverId: currentUserId,
                        },
                    },
                    data: {
                        status: "DECLINED",
                    },
                });

                return new Response(JSON.stringify({ message: "Follow request declined" }));
            }

            case "CANCEL": {
                await prisma.followerRequest.delete({
                    where: {
                        senderId_receiverId: {
                            senderId: currentUserId,
                            receiverId: userId,
                        },
                    },
                });

                return new Response(JSON.stringify({ message: "Follow request canceled" }));
            }

            default:
                return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
