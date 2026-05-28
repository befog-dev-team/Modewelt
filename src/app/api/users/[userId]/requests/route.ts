import prisma from "@/lib/prisma";

export async function PATCH(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    const { userId } = params;

    // Validate JSON Parsing
    let body;
    try {
        body = await req.json();
    } catch {
        return new Response(JSON.stringify({ error: "Invalid or empty JSON body" }), { status: 400 });
    }

    const { action, currentUserId } = body;

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

                await prisma.$transaction([
                    prisma.followerRequest.update({
                        where: {
                            senderId_receiverId: {
                                senderId: userId,
                                receiverId: currentUserId,
                            },
                        },
                        data: {
                            status: "ACCEPTED",
                        },
                    }),
                    prisma.follow.upsert({
                        where: {
                            followerId_followingId: {
                                followerId: userId,
                                followingId: currentUserId,
                            },
                        },
                        update: {},
                        create: {
                            followerId: userId,
                            followingId: currentUserId,
                        },
                    }),
                    prisma.notification.create({
                        data: {
                            issuerId: currentUserId,
                            recipientId: userId,
                            type: "FOLLOW_ACCEPTED",
                            read: false,
                        },
                    }),
                ]);

                return new Response(JSON.stringify({ message: "Follow request accepted" }));
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
                await prisma.$transaction([
                    prisma.followerRequest.delete({
                        where: {
                            senderId_receiverId: {
                                senderId: currentUserId,
                                receiverId: userId,
                            },
                        },
                    }),
                    prisma.follow.deleteMany({
                        where: {
                            followerId: currentUserId,
                            followingId: userId,
                        },
                    }),
                ]);

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
