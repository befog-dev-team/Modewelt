import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    // Convert provided dates to Date objects
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    try {
        const jobs = await prisma.job.findMany({
            where: {
                createdAt: {
                    gte: fromDate,
                    lte: toDate,
                },
            },
            orderBy: { createdAt: "asc" }, // Fetch oldest to newest jobs
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}
