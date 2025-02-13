import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        console.log("📡 Fetching projects...");

        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            console.log("❌ Unauthorized: No valid session found");
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("✅ Authenticated User:", user);

        // Ensure the user is authorized to access these projects
        const { userId } = params;
        if (user.id !== userId) {
            console.log("❌ Forbidden: User not authorized to access this data");
            return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        // Fetch projects from the database for the specified user
        const projects = await prisma.project.findMany({
            where: { userId },
            include: { media: true },
            orderBy: { createdAt: "desc" }, // Sort by latest projects
        });

        console.log("✅ Retrieved projects:", projects);

        return Response.json({ success: true, projects }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching projects:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
