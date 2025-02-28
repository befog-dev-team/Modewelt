import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const recentJobs = await prisma.job.findMany({
            take: 5, // Fetch the last 5 jobs
            orderBy: {
                createdAt: 'desc', // Order by creation date, newest first
            },
            select: {
                id: true,
                jobTitle: true,
                company: true,
                companyPic: true,
                location: true,
                jobType: true,
                createdAt: true,
            },
        });

        return NextResponse.json(recentJobs);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}
