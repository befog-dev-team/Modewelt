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

        // Fetch total reports within the date range
        const totalReports = await prisma.report.count({
            where: {
                createdAt: {
                    gte: fromDate,
                    lte: toDate,
                },
            },
        });

        // Fetch reported posts count
        const reportedPosts = await prisma.report.count({
            where: {
                postId: { not: null },
                createdAt: { gte: fromDate, lte: toDate },
            },
        });

        // Fetch reported jobs count
        const reportedJobs = await prisma.report.count({
            where: {
                jobId: { not: null },
                createdAt: { gte: fromDate, lte: toDate },
            },
        });

        // Fetch total moderation actions taken
        const adminStats = await prisma.adminStats.findFirst();
        const totalActions = adminStats?.totalActions || 0;

        return NextResponse.json({
            totalReports,
            reportedPosts,
            reportedJobs,
            totalActions,
        });
    } catch (error) {
        console.error("Error fetching report stats:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
