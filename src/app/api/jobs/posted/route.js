import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function GET(req) {
    try {
        // Get the cursor from the query parameters (for pagination)
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
        const pageSize = 3; // Number of jobs to fetch per page

        // Validate the user
        const { user } = await validateRequest();
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Fetch user's posted jobs with cursor-based pagination
        const jobs = await prisma.job.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: pageSize + 1, // Take one extra record to check for the next cursor
            cursor: cursor ? { id: cursor } : undefined,
            include: { applications: true },
        });

        // Determine next cursor
        const nextCursor = jobs.length > pageSize ? jobs[pageSize].id : null;

        // Return jobs excluding the extra record
        return Response.json({
            jobs: jobs.slice(0, pageSize),
            nextCursor,
        });
    } catch (error) {
        console.error("Error fetching posted jobs:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
