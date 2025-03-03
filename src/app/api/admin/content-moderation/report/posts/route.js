import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
    try {
        // Extract query parameters from request URL
        const { searchParams } = new URL(request.url);
        const from = searchParams.get("from");
        const to = searchParams.get("to");


        if (!from || !to) {
            return NextResponse.json({ error: "Missing date range" }, { status: 400 });
        }

        // Convert dates to ISO format
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999); // Include entire "to" date

        const reportedPosts = await prisma.report.findMany({
            where: {
                postId: { not: null },
                createdAt: {
                    gte: fromDate,
                    lte: toDate,
                },
            },
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
