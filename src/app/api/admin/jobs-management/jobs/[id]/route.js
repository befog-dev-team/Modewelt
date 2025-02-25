import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, props) {
    const params = await props.params; // Get params from props
    const { id } = params;  // Extract id from params

    if (!id) { // Check if id is not provided
        return NextResponse.json({ error: "Job ID is required" }, { status: 400 }); // Return error response
    }

    try {
        const job = await prisma.job.findUnique({ // Fetch job by id
            where: { id }, // Filter by id
        });

        if (!job) { // Check if job is not found
            return NextResponse.json({ error: "Job not found" }, { status: 404 }); // Return error response
        }
        return NextResponse.json(job, { status: 200 }); // Return job response
    } catch (error) {
        console.error("Error fetching job:", error); // Log error
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); // Return error response
    }
}
