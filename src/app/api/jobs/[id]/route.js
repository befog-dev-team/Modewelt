import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, props) {
    const params = await props.params;
    const { id } = params;  // Extract id from params

    if (!id) {
        return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    try {
        const job = await prisma.job.findUnique({
            where: { id },
        });

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200 });
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
