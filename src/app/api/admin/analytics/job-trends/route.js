import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure this is your Prisma instance

export async function GET() {
    try {
        const jobs = await prisma.job.findMany({
            select: {
                id: true,
                jobTitle: true,
                company: true,
                description: true,
                createdAt: true,
                _count: {
                    select: { applications: true }, // Count applications
                },
            },
            orderBy: { applications: { _count: "desc" } }, // Sort by most applications
            take: 7, // Fetch top 7 trending jobs
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error("Failed to fetch trends:", error);
        return NextResponse.json({ error: "Failed to fetch trends" }, { status: 500 });
    }
}
