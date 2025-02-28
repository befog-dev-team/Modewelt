import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req, props) {
    const params = await props.params;
    try {
        const reportId = params.id;

        // Check if the report exists
        const existingReport = await prisma.report.findUnique({
            where: { id: reportId },
            include: { post: true }, // Fetch the associated post
        });

        if (!existingReport) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }

        // Delete the post first if it exists
        if (existingReport.post) {
            await prisma.post.delete({ where: { id: existingReport.post.id } });
        }

        // Delete the report itself
        await prisma.report.delete({ where: { id: reportId } });

        // Ensure at least one AdminStats record exists
        const stats = await prisma.adminStats.findFirst();
        if (!stats) {
            await prisma.adminStats.create({ data: { totalActions: 1 } });
        } else {
            // Increment totalActions in AdminStats table
            await prisma.adminStats.updateMany({
                data: { totalActions: { increment: 1 } },
            });
        }

        return NextResponse.json({ message: "Post and report deleted successfully, totalActions incremented" });
    } catch (error) {
        // Ensure error is a valid object
        const errorDetails = error instanceof Error ? {
            message: error.message,
            stack: error.stack,
        } : {
            message: "Unknown error occurred",
            details: error,
        };

        console.error("Error deleting post and report:", error);

        // Return a valid error response
        return NextResponse.json(
            { error: "Internal Server Error", details: errorDetails },
            { status: 500 }
        );
    }
}

export async function PATCH(req, props) {
    const params = await props.params;
    try {
        const reportId = params.id;

        // Check if the report exists
        const existingReport = await prisma.report.findUnique({ where: { id: reportId } });
        if (!existingReport) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }

        // Approving means removing the report from the database
        await prisma.report.delete({ where: { id: reportId } });

        // Ensure at least one AdminStats record exists
        const stats = await prisma.adminStats.findFirst();
        if (!stats) {
            await prisma.adminStats.create({ data: { totalActions: 1 } });
        } else {
            // Increment totalActions in AdminStats table
            await prisma.adminStats.updateMany({
                data: { totalActions: { increment: 1 } },
            });
        }

        return NextResponse.json({ message: "Report approved, removed, and totalActions incremented" });
    } catch (error) {
        console.error("Error approving report:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
