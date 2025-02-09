import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
    console.log("req", req);
    try {
        // Get the cursor from the query parameters (for pagination)
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
        const pageSize = 10; // Number of jobs to fetch per page

        // Validate the request to ensure the user is logged in
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch the jobs from the database using Prisma
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: "desc" }, // Order jobs by creation date
            take: pageSize + 1, // Take one more job than needed to check for more pages
            cursor: cursor ? { id: cursor } : undefined, // Set the cursor for pagination
        });

        // Determine the next cursor
        const nextCursor = jobs.length > pageSize ? jobs[pageSize].id : null;

        // Prepare the response data
        const data = {
            jobs: jobs.slice(0, pageSize), // Return only the first `pageSize` jobs
            nextCursor, // Return the next cursor
        };

        return Response.json(data); // Return the data as JSON
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
