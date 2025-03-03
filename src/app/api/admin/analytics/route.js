import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { subDays, format } from "date-fns";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        // Convert provided dates to Date objects or default to the last 7 days
        const fromDate = from ? new Date(from) : subDays(new Date(), 7);
        const toDate = to ? new Date(to) : new Date();

        // Generate past days labels dynamically based on range
        const pastDays = Array.from({ length: 7 }, (_, i) =>
            format(subDays(toDate, i), "EEE") // Format days as 'Sat', 'Sun', etc.
        ).reverse();

        // Fetch jobs within the date range
        const jobs = await prisma.job.findMany({
            where: {
                createdAt: {
                    gte: fromDate,
                    lte: toDate,
                },
            },
            select: {
                createdAt: true,
                expirationDate: true,
            },
        });

        // Initialize job stats for each day
        const jobStats = pastDays.map((day) => ({
            day,
            posted: 0,
            expired: 0,
        }));

        jobs.forEach((job) => {
            const postDay = format(job.createdAt, "EEE"); // Get day of posting
            const isExpired = job.expirationDate && new Date(job.expirationDate) < new Date();

            jobStats.forEach((stat) => {
                if (stat.day === postDay) {
                    if (isExpired) {
                        stat.expired++;
                    } else {
                        stat.posted++;
                    }
                }
            });
        });

        return NextResponse.json(jobStats, { status: 200 });
    } catch (error) {
        console.error("❌ Failed to fetch job stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch job stats" },
            { status: 500 }
        );
    }
}
