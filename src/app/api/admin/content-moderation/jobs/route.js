import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const reportedJobs = await prisma.report.findMany({
            where: { jobId: { not: null } }, // Fetch only reports related to posts
            include: {
                user: {
                    select: { id: true, username: true },
                },
                job: {
                    select: { createdAt: true },
                },
            },
            orderBy: { createdAt: "desc" }, // Order by latest reports
        });

        return NextResponse.json(reportedJobs);
    } catch (error) {
        console.error("Error fetching reported posts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
