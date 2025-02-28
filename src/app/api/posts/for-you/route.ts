import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Get the cursor from the query parameters
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined; // cursor is the id of the last post on the page

        // The number of posts to fetch
        const pageSize = 3;

        // Validate the request to ensure the user is logged in
        const { user } = await validateRequest();

        // If the user is not logged in, return an error
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch the posts
        const posts = await prisma.post.findMany({
            include: getPostDataInclude(user.id), // Include the post data
            orderBy: { createdAt: "desc" }, // Order the posts by creation date
            take: pageSize + 1, // Fetch one more post than the page size to determine if there are more posts
            cursor: cursor ? { id: cursor } : undefined, // Prisma takes the cursor as an object with the id property
        });

        // Determine the next cursor
        const nextCursor = posts.length > pageSize ? posts[pageSize].id : null; // If there are more posts than the page size, set the next cursor to the id of the next post

        // // Return the posts and the next cursor
        const data: PostsPage = { // Create a data object with the posts and the next cursor
            posts: posts.slice(0, pageSize), // Return only the posts up to the page size, we have to remove the last post because we fetched one more post than the page size
            nextCursor, // Return the next cursor
        };

        // Return the data
        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}