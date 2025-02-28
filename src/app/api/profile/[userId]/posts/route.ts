import { validateRequest } from "@/auth"; // validateRequest is a function that checks if the request is authenticated
import prisma from "@/lib/prisma"; // prisma is a database client
import { getPostDataInclude, PostsPage } from "@/lib/types"; // getPostDataInclude is a function that returns an object with the properties to include in a post object, PostsPage is an interface
import { NextRequest } from "next/server";

// GET is a function that handles GET requests to the route
export async function GET(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params; // params is an object with the userId property

    // userId is a string
    const { userId } = params;

    try {
        // cursor is a string or undefined 
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

        // pageSize is a number 
        const pageSize = 3;

        // validateRequest is a function that checks if the request is authenticated
        const { user } = await validateRequest();

        // if user is undefined, return an error response
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // posts is an array of post objects
        const posts = await prisma.post.findMany({ // prisma.post.findMany is a function that returns an array of post objects
            where: { userId }, // where is an object with the userId property
            include: getPostDataInclude(user.id), // include is an object with the properties to include in a post object
            orderBy: { createdAt: "desc" }, // orderBy is an object with the createdAt property
            take: pageSize + 1, // take is a number
            cursor: cursor ? { id: cursor } : undefined, // cursor is an object with the id property or undefined
        });

        // nextCursor is a string or null 
        const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

        // data is an object with the posts and nextCursor properties
        const data: PostsPage = {
            posts: posts.slice(0, pageSize), // posts is an array of post objects
            nextCursor, // nextCursor is a string or null
        };

        // return a JSON response with the data object
        return Response.json(data);
    } catch (error) {
        console.error(error); // log the error to the console
        return Response.json({ error: "Internal server error" }, { status: 500 }); // return an error response
    }
}