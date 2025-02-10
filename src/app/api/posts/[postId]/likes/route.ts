import { validateRequest } from "@/auth"; 
import prisma from "@/lib/prisma"; 
// import { LikeInfo } from "@/lib/types";

// GET: Get the number of likes and whether the post is liked by the logged in user
export async function GET(req: Request, props: { params: Promise<{ postId: string }> }) {
  // Get the postId from the params
  const params = await props.params;

  // Destructure the postId from the params
  const { postId } = params;

  try {
    // Validate the request and get the logged in user
    const { user: loggedInUser } = await validateRequest();

    // If user is not logged in, return 401 Unauthorized
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the post with the given ID
    const post = await prisma.post.findUnique({
      where: { id: postId }, // Find the post with the given ID
      select: { // Select the following fields
        likes: { // Select the likes field
          where: {
            userId: loggedInUser.id, // Find the like with the logged in user's ID
          },
          select: { // Select the following fields
            userId: true, // Select the userId field
          },
        },
        _count: { // Select the _count field
          select: {  // Select the following fields
            likes: true, // Select the likes field
          },
        },
      },
    });

    // If post is not found, return 404 Not Found
    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    // Create a data object with the likes and isLikedByUser fields
    const data = {
      likes: post._count.likes, // Set the likes field to the number of likes
      isLikedByUser: !!post.likes.length, // Set the isLikedByUser field to true if the user has liked the post
    };

    // Return the data object as JSON
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Add a like to a post
export async function POST(req: Request, props: { params: Promise<{ postId: string }> }) {
  // Get the postId from the params
  const params = await props.params;

  // Destructure the postId from the params
  const { postId } = params;

  try {
    // Validate the request and get the logged in user
    const { user: loggedInUser } = await validateRequest();

    // If user is not logged in, return 401 Unauthorized
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the post with the given ID
    const post = await prisma.post.findUnique({
      where: { id: postId }, // Find the post with the given ID
      select: {
        userId: true, // Select the userId field
      },
    });

    // If post is not found, return 404 Not Found
    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    // Add a like to the post
    await prisma.$transaction([
      prisma.like.upsert({ // Upsert the like means create a new like if it doesn't exist, otherwise update the existing like
        where: {
          userId_postId: { // Find the like with the given user ID and post ID
            userId: loggedInUser.id, // Find the like with the logged in user's ID
            postId, // Find the like with the given post ID
          },
        },
        create: { // If the like doesn't exist, create a new like with the following fields
          userId: loggedInUser.id, // Set the userId field to the logged in user's ID
          postId, // Set the postId field to the given post ID
        },
        update: {}, // If the like exists, update the like with the following fields
      }),
      ...(loggedInUser.id !== post.userId // If the logged in user is not the post owner, create a notification
        ? [ // Create a notification with the following fields
          prisma.notification.create({ // Create a new notification
            data: {
              issuerId: loggedInUser.id, // Set the issuerId field to the logged in user's ID
              recipientId: post.userId, // Set the recipientId field to the post owner's ID
              postId, // Set the postId field to the given post ID
              type: "LIKE", // Set the type field to "LIKE"
            },
          }),
        ]
        : []), // If the logged in user is the post owner, return an empty array
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Remove a like from a post
export async function DELETE(req: Request, props: { params: Promise<{ postId: string }> }) {
  // Get the postId from the params
  const params = await props.params;

  // Destructure the postId from the params
  const { postId } = params;

  try {
    // Validate the request and get the logged in user
    const { user: loggedInUser } = await validateRequest();

    // If user is not logged in, return 401 Unauthorized
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the post with the given ID
    const post = await prisma.post.findUnique({ // Find the post with the given ID
      where: { id: postId }, // Find the post with the given ID
      select: { // Select the following fields
        userId: true, // Select the userId field
      },
    });

    // If post is not found, return 404 Not Found
    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    // Remove the like from the post
    await prisma.$transaction([ // Run the following queries in a transaction
      prisma.like.deleteMany({ // Delete the like with the following fields
        where: { // Find the like with the following fields
          userId: loggedInUser.id, // Find the like with the logged in user's ID
          postId, // Find the like with the given post ID
        },
      }),
      prisma.notification.deleteMany({ // Delete the notification with the following fields
        where: { // Find the notification with the following fields
          issuerId: loggedInUser.id, // Find the notification with the logged in user's ID
          recipientId: post.userId, // Find the notification with the post owner's ID
          postId, // Find the notification with the given post ID
          type: "LIKE", // Find the notification with the type "LIKE"
        },
      }),
    ]);

    // Return a success response
    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}