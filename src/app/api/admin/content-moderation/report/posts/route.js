import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const reportedPosts = await prisma.report.findMany({
            where: { postId: { not: null } }, // Fetch only reports related to posts
            include: {
                user: {
                    select: { id: true, username: true },
                },
                post: {
                    select: { createdAt: true },
                },
            },
            orderBy: { createdAt: "desc" }, // Order by latest reports
        });

        return NextResponse.json(reportedPosts);
    } catch (error) {
        console.error("Error fetching reported posts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
