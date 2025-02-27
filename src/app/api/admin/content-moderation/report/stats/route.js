import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const totalReports = await prisma.report.count();
        const reportedPosts = await prisma.report.count({ where: { postId: { not: null } } });
        const reportedJobs = await prisma.report.count({ where: { jobId: { not: null } } });
        const totalActions = Math.floor(totalReports * 0.3); // 30% of total reports

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
