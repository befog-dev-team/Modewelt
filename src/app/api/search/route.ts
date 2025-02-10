import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q")?.trim() || "";
    const cursor = searchParams.get("cursor");

    const pageSize = 10;

    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Prepare full-text search query
    const searchQuery = q ? q.split(" ").join(" & ") : undefined;

    const posts = await prisma.post.findMany({
      where: searchQuery
        ? {
            OR: [
              { content: { search: searchQuery } },
              { user: { displayName: { search: searchQuery } } },
              { user: { username: { search: searchQuery } } },
            ],
          }
        : {}, // Fetch all posts if no search query
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1, // Fetch an extra item to check for pagination
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    return Response.json({
      posts: posts.slice(0, pageSize),
      nextCursor,
    } as PostsPage);
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}