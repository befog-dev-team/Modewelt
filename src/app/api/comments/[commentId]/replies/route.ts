import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
  const { commentId } = (await context.params);
  const { user } = await validateRequest();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();

  if (!content.trim()) return Response.json({ error: "Content cannot be empty" }, { status: 400 });

  try {
    // Find the original comment to determine its postId
    const parentComment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (!parentComment) return Response.json({ error: "Parent comment not found" }, { status: 404 });

    const reply = await prisma.comment.create({
      data: {
        content,
        userId: user.id,
        postId: parentComment.postId, // Inherit the postId from the parent comment
        parentId: commentId, // Set the parentId to establish a nested reply
      },
      include: { user: true, likes: true, replies: true }, // Include necessary relations
    });

    return Response.json(reply);
  } catch (error) {
    console.error(error); // Add error logging
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
  const { commentId } = (await context.params);

  try {
    const replies = await prisma.comment.findMany({
      where: { parentId: commentId },
      include: {
        user: true,
        likes: true,
        replies: { include: { user: true, likes: true } }, // Fetch replies of replies (nested)
      },
      orderBy: { createdAt: "asc" },
    });

    return Response.json(replies);
  } catch (error) {
    console.error(error); // Add error logging
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

//NOT USED YET
// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { NextRequest } from "next/server";

// export async function GET(req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
//   const { commentId } = await context.params;

//   try {
//     const { user } = await validateRequest();

//     if (!user) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const replies = await prisma.comment.findMany({
//       where: { parentId: commentId },
//       include: {
//         user: true,
//         likes: true,
//         replies: { include: { user: true, likes: true } },
//       },
//       orderBy: { createdAt: "asc" },
//     });

//     return Response.json(replies);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
//   const { commentId } = await context.params;
//   const { user } = await validateRequest();

//   if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

//   const { content } = await req.json();

//   if (!content.trim()) return Response.json({ error: "Content cannot be empty" }, { status: 400 });

//   try {
//     const parentComment = await prisma.comment.findUnique({ where: { id: commentId } });

//     if (!parentComment) return Response.json({ error: "Parent comment not found" }, { status: 404 });

//     const reply = await prisma.comment.create({
//       data: {
//         content,
//         userId: user.id,
//         postId: parentComment.postId,
//         parentId: commentId,
//       },
//       include: { user: true, likes: true, replies: true },
//     });

//     return Response.json(reply);
//   } catch (error) {
//     return Response.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

