import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
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

        return NextResponse.json({ message: "Post and report deleted successfully" });
    } catch (error) {
        console.error("Error deleting post and report:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        const reportId = params.id;

        // Check if the report exists
        const existingReport = await prisma.report.findUnique({ where: { id: reportId } });
        if (!existingReport) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }

        // Approving means removing the report from the database
        await prisma.report.delete({ where: { id: reportId } });

        return NextResponse.json({ message: "Report approved and removed" });
    } catch (error) {
        console.error("Error approving report:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
