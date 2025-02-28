import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch job activity data from the database
        const jobActivities = await prisma.job.findMany({
            take: 5, // Fetch the last 5 jobs
            orderBy: {
                createdAt: "desc", // Order by creation date, newest first
            },
            select: {
                id: true,
                jobTitle: true,
                company: true,
                createdAt: true,
                applications: { // Fetch count of job applications
                    select: {
                        id: true,
                    },
                },
            },
        });

        // Fetch total jobs per company
        const jobCounts = await prisma.job.groupBy({
            by: ["company"],
            _count: { id: true },
        });

        const jobCountMap = jobCounts.reduce((acc, job) => {
            acc[job.company] = job._count.id;
            return acc;
        }, {});

        // Transform the data into the format expected by the component
        const data = jobActivities.map((job) => ({
            company: job.company,
            jobId: job.id,
            jobName: job.jobTitle,
            num: jobCountMap[job.company] || 1, // Total jobs related to the company
            date: new Date(job.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            }),
            applicants: job.applications.length, // Count of applicants
        }));

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching job activities:", error?.message || error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}