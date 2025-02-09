"use server" // enable server functions

import { validateRequest } from "@/auth" // import the validateRequest function
import prisma from "@/lib/prisma"; // import the Prisma client
import { getPostDataInclude } from "@/lib/types"; // import the getPostDataInclude function

// Define the deletePost function
export async function deletePost(id: string) {
    // validate the request
    const { user } = await validateRequest();

    // throw an error if the user is not found
    if (!user) throw new Error("Unauthorized")

    // find the post by the id
    const post = await prisma.post.findUnique({
        where: { id } // find the post by the id
    })

    // throw an error if the post is not found
    if (!post) throw new Error("Post not found")

    // throw an error if the user is not the author of the post
    if (post.userId !== user.id) throw new Error("Unauthorized")

    // delete the post
    const deletedPost = await prisma.post.delete({
        where: { id }, // delete the post by the id
        include: getPostDataInclude(user.id), // include the post data
    });

    return deletedPost; // return the deleted post
}