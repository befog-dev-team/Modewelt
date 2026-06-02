import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function GET(req, props) {
    const params = await props.params;
    try {
        const { username } = params;

        const user = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                backgroundImageUrl: true,
                bio: true,
                location: true,
                role: true,
                _count: {
                    select: {
                        posts: true,
                        following: true,
                        followers: true,
                    }
                }
            }
        });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        return Response.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
