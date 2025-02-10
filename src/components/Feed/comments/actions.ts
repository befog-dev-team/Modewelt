"use server";

import { validateRequest } from "@/auth"; // Import the validateRequest function from the auth module
import prisma from "@/lib/prisma"; // Import the Prisma client instance
import { getCommentDataInclude, PostData } from "@/lib/types"; // Import the getCommentDataInclude and PostData types
import { createCommentSchema } from "@/lib/validation"; // Import the createCommentSchema validation schema

// POST: Submit a comment on a post
export async function submitComment({
  post, // The post to comment on
  content, // The content of the comment
}: {
  post: PostData; // The post to comment on
  content: string; // The content of the comment
}) {
  // Validate the request
  const { user } = await validateRequest();

  // If the user is not logged in, throw an error
  if (!user) throw new Error("Unauthorized");

  // Validate the content of the comment
  const { content: contentValidated } = createCommentSchema.parse({ content });

  // Create a new comment with the validated content
  const [newComment] = await prisma.$transaction([ // Use a transaction to create the comment and notification
    prisma.comment.create({ // Create a new comment with the following fields
      data: { // Set the following fields
        content: contentValidated, // Set the content field to the validated content
        postId: post.id, // Set the postId field to the post ID
        userId: user.id, // Set the userId field to the user ID
      },
      include: getCommentDataInclude(user.id), // Include the comment data with the user ID
    }),
    ...(post.user.id !== user.id // If the post owner is not the user, create a notification
      ? [
        prisma.notification.create({ // Create a new notification with the following fields
          data: { // Set the following fields
            issuerId: user.id, // Set the issuerId field to the user ID
            recipientId: post.user.id, // Set the recipientId field to the post owner's ID
            postId: post.id, // Set the postId field to the post ID
            type: "COMMENT", // Set the type field to "COMMENT"
          },
        }),
      ]
      : []), // If the post owner is the user, do not create a notification
  ]);

  // Return the new comment
  return newComment;
}

// DELETE: Delete a comment
export async function deleteComment(id: string) {
  // Validate the request
  const { user } = await validateRequest();

  // If the user is not logged in, throw an error
  if (!user) throw new Error("Unauthorized");

  // Find the comment with the given ID
  const comment = await prisma.comment.findUnique({ // Find the comment with the given ID
    where: { id }, // Find the comment with the given ID
  });

  // If the comment is not found, throw an error
  if (!comment) throw new Error("Comment not found");

  // If the user is not the owner of the comment, throw an
  if (comment.userId !== user.id) throw new Error("Unauthorized");

  // Delete the comment
  const deletedComment = await prisma.comment.delete({
    where: { id }, // Delete the comment with the given ID
    include: getCommentDataInclude(user.id), // Include the comment data with the user ID
  });

  // Return the deleted comment
  return deletedComment;
}


//NOT USED YET
// export async function submitReply({
//   post,
//   commentId,
//   content,
// }: {
//   post: PostData;
//   commentId: string;
//   content: string;
// }) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const { content: contentValidated } = createCommentSchema.parse({ content });

//   const newReply = await prisma.comment.create({
//     data: {
//       content: contentValidated,
//       parentId: commentId,
//       userId: user.id,
//       postId: post.id,
//     },
//     include: getCommentDataInclude(user.id),
//   });

//   return newReply;
// }

// export async function deleteReply(id: string) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const reply = await prisma.comment.findUnique({
//     where: { id },
//   });

//   if (!reply) throw new Error("Reply not found");

//   if (reply.userId !== user.id) throw new Error("Unauthorized");

//   const deletedReply = await prisma.comment.delete({
//     where: { id },
//     include: getCommentDataInclude(user.id),
//   });

//   return deletedReply;
// }
