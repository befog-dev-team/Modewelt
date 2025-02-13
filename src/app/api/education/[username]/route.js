import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

// API Route: Get education records by username
export async function GET(req, { params }) {
    try {
        const { user } = await validateRequest();

        if (!params) {
            return Response.json({ error: "Invalid request parameters" }, { status: 400 });
        }

        const username = params?.username || user?.username;
        if (!username) {
            return Response.json({ error: "Username is required" }, { status: 400 });
        }

        console.log("👤 Fetching education records for:", username);

        // Find user by username
        const profileUser = await prisma.user.findUnique({
            where: { username },
        });

        if (!profileUser) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch education records for the user
        const educationRecords = await prisma.education.findMany({
            where: { userId: profileUser.id },
            orderBy: { createdAt: "desc" },
        });

        return Response.json({ success: true, education: educationRecords }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching education records:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
