import { validateRequest } from "@/auth"; // Import the validateRequest function
import prisma from "@/lib/prisma"; // Import the Prisma client
import { getPostDataInclude, PostsPage } from "@/lib/types"; // Import the getPostDataInclude and PostsPage types from the types module
import { NextRequest } from "next/server"; // Import the NextRequest type from the next/server module

// Define the GET function
export async function GET(req: NextRequest) { // Define the GET function with the req parameter
    try {
        // Get the cursor from the query parameters
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined; // cursor is the id of the last post on the page

        // The number of posts to fetch
        const pageSize = 5;

        // Validate the request to ensure the user is logged in
        const { user } = await validateRequest();

        // If the user is not logged in, return an error
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the posts from the users that the current user follows
        const posts = await prisma.post.findMany({
            where: { // Filter the posts by the users that the current user follows
                user: { // Filter the posts by the users that the current user follows
                    followers: { // Filter the posts by the users that the current user follows
                        some: { // Filter the posts by the users that the current user follows
                            followerId: user.id // Filter the posts by the users that the current user follows
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }, // Order the posts by creation date
            take: pageSize + 1, // Fetch one more post than the page size to determine if there are more posts
            cursor: cursor ? { id: cursor } : undefined, // Prisma takes the cursor as an object with the id property
            include: getPostDataInclude(user.id) // Include the user data
        });

        // Determine the next cursor based on the number of posts
        const nextCursor = posts.length > pageSize ? posts[posts.length - 1].id : null; // If there are more posts than the page size, set the next cursor to the id of the last post

        // Return the posts and the next cursor
        const data: PostsPage = {// Create a data object with the posts and the next cursor
            posts: posts.slice(0, pageSize), // Return only the posts up to the page size
            nextCursor, // Return the next cursor
        }

        // Return the data as JSON
        return Response.json(data);

    } catch (error) {
        console.error(error); // Log the error to the console
        return Response.json({ error: 'Internal Server Error' }, { status: 500 }); // Return an internal server error
    }
}