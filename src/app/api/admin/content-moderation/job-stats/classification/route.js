import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch job classification data from the database
        const jobClassifications = await prisma.job.groupBy({
            by: ['jobTitle'], // Group by job title
            _count: {
                jobTitle: true, // Count the number of jobs for each title
            },
        });

        // Transform the data into the format expected by the PieChart
        const data = jobClassifications.map((job) => ({
            name: job.jobTitle,
            value: job._count.jobTitle,
        }));

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}