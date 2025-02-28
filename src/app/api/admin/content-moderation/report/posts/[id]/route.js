import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req, props) {
    const params = await props.params;
    try {
        const reportId = params.id;

        // Ensure report exists before deleting
        const existingReport = await prisma.report.findUnique({
            where: { id: reportId },
            include: { post: true },
        });

        if (!existingReport) {
            return NextResponse.json({ error: "Report already deleted or not found" }, { status: 404 });
        }

        // Delete the associated post if it exists
        if (existingReport.post) {
            await prisma.post.delete({ where: { id: existingReport.post.id } }).catch(() => {
                console.warn("Post already deleted or does not exist");
            });
        }

        // Ensure at least one AdminStats record exists
        let stats = await prisma.adminStats.findFirst();
        if (!stats) {
            stats = await prisma.adminStats.create({ data: { totalActions: 1 } });
        } else {
            await prisma.adminStats.updateMany({
                data: { totalActions: { increment: 1 } },
            });
        }

        // Delete the report (ensure it still exists before deletion)
        const checkReport = await prisma.report.findUnique({ where: { id: reportId } });
        if (checkReport) {
            await prisma.report.delete({ where: { id: reportId } });
        } else {
            console.warn("Report already deleted before final deletion");
            return NextResponse.json({ error: "Report already deleted" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post and report deleted successfully, totalActions incremented" });
    } catch (error) {
        console.error("Error deleting post and report:", error?.message || error);

        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
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
        // Approving means removing the report from the database
        await prisma.report.delete({ where: { id: reportId } });

        return NextResponse.json({ message: "Report approved, removed, and totalActions incremented" });
    } catch (error) {
        console.error("Error approving report:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
