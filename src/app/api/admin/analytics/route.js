import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { subDays, format } from "date-fns";

//  Get active & expired job stats grouped by day
export async function GET() {
    try {
        const today = new Date(); // Get today's date
        const pastWeek = Array.from({ length: 7 }, (_, i) =>
            format(subDays(today, i), "EEE") // Get last 7 days (Sat, Sun, Mon, etc.)
        ).reverse(); // Reverse the order to match the chart

        const jobs = await prisma.job.findMany({ // Fetch all jobs
            select: { createdAt: true, expirationDate: true }, // Select createdAt & expirationDate
        });

        const jobStats = pastWeek.map((day) => ({ // Initialize job stats for each day
            day, // Day of the week
            posted: 0, // Number of jobs posted
            expired: 0, // Number of jobs expired
        }));

        jobs.forEach((job) => { // Iterate over each job
            const postDay = format(job.createdAt, "EEE"); // Get the day the job was posted
            const isExpired = new Date(job.expirationDate) < today; // Check if the job is expired

            jobStats.forEach((stat) => { // Update job stats for each day
                if (stat.day === postDay) { // If the job was posted on this day
                    if (isExpired) { // If the job is expired
                        stat.expired++; // Increment the expired count
                    } else {
                        stat.posted++; // Otherwise, increment the posted count
                    }
                }
            });
        });

        return NextResponse.json(jobStats, { status: 200 }); // Return job stats
    } catch (error) {
        console.error("Failed to fetch job stats:", error); // Log error
        return NextResponse.json({ error: "Failed to fetch job stats" }, { status: 500 }); // Return error
    }
}
