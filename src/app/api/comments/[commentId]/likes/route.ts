import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
  const { commentId } = (await context.params);
  const { user } = await validateRequest();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Check if the user has already liked the comment
    const existingLike = await prisma.commentLike.findUnique({
      where: { userId_commentId: { userId: user.id, commentId } },
    });

    if (existingLike) {
      // If already liked, remove the like
      await prisma.commentLike.delete({
        where: { id: existingLike.id },
      });
      return Response.json({ success: true, liked: false });
    }

    // Otherwise, add a new like
    await prisma.commentLike.create({
      data: { userId: user.id, commentId },
    });

    return Response.json({ success: true, liked: true });
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

//     const comment = await prisma.comment.findUnique({
//       where: { id: commentId },
//       select: {
//         likes: {
//           where: { userId: user.id },
//           select: { userId: true },
//         },
//         _count: { select: { likes: true } },
//       },
//     });

//     if (!comment) {
//       return Response.json({ error: "Comment not found" }, { status: 404 });
//     }

//     const data = {
//       likes: comment._count.likes,
//       isLikedByUser: !!comment.likes.length,
//     };

//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
//   const { commentId } = await context.params;

//   try {
//     const { user } = await validateRequest();

//     if (!user) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await prisma.$transaction([
//       prisma.commentLike.upsert({
//         where: { userId_commentId: { userId: user.id, commentId } },
//         create: { userId: user.id, commentId },
//         update: {},
//       }),
//     ]);

//     return new Response();
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
//   const { commentId } = await context.params;

//   try {
//     const { user } = await validateRequest();

//     if (!user) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await prisma.$transaction([
//       prisma.commentLike.deleteMany({
//         where: { userId: user.id, commentId },
//       }),
//     ]);

//     return new Response();
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
