import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const totalReports = await prisma.report.count();
        const reportedPosts = await prisma.report.count({ where: { postId: { not: null } } });
        const reportedJobs = await prisma.report.count({ where: { jobId: { not: null } } });

        // Fetch totalActions correctly
        const totalActionsData = await prisma.adminStats.aggregate({
            _sum: { totalActions: true }
        });

        // Extract the number (default to 0 if null)
        const totalActions = totalActionsData._sum.totalActions || 0;

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
