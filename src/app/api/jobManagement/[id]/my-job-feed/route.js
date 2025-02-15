import { validateRequest } from "@/auth"; // Auth check
import prisma from "@/lib/prisma"; // Database client

// GET route for user's job feed
export async function GET(req, props) {
    const params = await props.params;
    const { userId } = params;

    try {
        // Get cursor for pagination
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
        const pageSize = 5;

        // Validate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch user's job feed
        const jobs = await prisma.job.findMany({
            where: {
                userId, // Filter by userId
            },
            orderBy: {
                createdAt: "desc",
            },
            take: pageSize + 1, // Pagination
            cursor: cursor ? { id: cursor } : undefined,
        });

        // Determine next cursor
        const nextCursor = jobs.length > pageSize ? jobs[pageSize].id : null;

        // Format data response
        const data = {
            jobs: jobs.slice(0, pageSize),
            nextCursor,
        };

        return Response.json(data);
    } catch (error) {
        console.error("Error fetching user job feed:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
