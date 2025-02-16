import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

// API Route: Get experience records by username
export async function GET(req, props) {
    const params = await props.params;
    try {
        const { user } = await validateRequest();

        if (!params) {
            return Response.json({ error: "Invalid request parameters" }, { status: 400 });
        }

        const username = params?.username || user?.username;
        if (!username) {
            return Response.json({ error: "Username is required" }, { status: 400 });
        }

        // Find user by username
        const profileUser = await prisma.user.findUnique({
            where: { username },
        });

        if (!profileUser) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch experiences for the user
        const experiences = await prisma.experience.findMany({
            where: { userId: profileUser.id },
            orderBy: { createdAt: "desc" },
        });

        return Response.json({ success: true, experiences }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching experiences:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
