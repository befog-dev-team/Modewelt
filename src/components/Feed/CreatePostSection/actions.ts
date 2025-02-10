"use server" // Use the server-side API

import { validateRequest } from "@/auth" // Import the validateRequest function from the auth module
import prisma from "@/lib/prisma" // Import the Prisma client
import { getPostDataInclude } from "@/lib/types" // Import the getPostDataInclude function
import { createPostSchema } from "@/lib/validation" // Import the createPostSchema schema

// Submit a post to the feed
export async function submitPost(input: {
    content: string, // The content of the post
    mediaIds: string[], // The media IDs of the post
}) {
    // Validate the request and get the user
    const { user } = await validateRequest()

    // If the user is not found, throw an error
    if (!user) throw Error("Unauthorized")

    // Parse the input using the createPostSchema schema and get the content and media IDs
    const { content, mediaIds } = createPostSchema.parse(input)

    // Create a new post
    const newPost = await prisma.post.create({ // Create a new post
        data: { // Set the data
            content, // Set the content
            userId: user.id, // Set the user ID
            attachments: { // Set the attachments
                connect: mediaIds.map(id => ({ id })), // connect used to associate the post with the media
            }
        },
        include: getPostDataInclude(user.id), // Include the post data
    });

    return newPost; // Return the new post
}
