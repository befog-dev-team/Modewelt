import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Fetch only the following connections
        const following = await prisma.follow.findMany({
            where: { followerId: loggedInUser.id },
            include: {
                following: {
                    select: { id: true, username: true, avatarUrl: true, bio: true },
                },
            },
        });

        // Format the following connections
        const connections = following.map((f) => ({
            id: f.following.id,
            username: f.following.username,
            avatarUrl: f.following.avatarUrl,
            bio: f.following.bio,
            type: "following",
        }));

        return new Response(JSON.stringify({ connections }), { status: 200 });
    } catch (error) {
        console.error("Error fetching following connections:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
} 