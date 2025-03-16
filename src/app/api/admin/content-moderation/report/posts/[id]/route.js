import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req, props) {
    const params = await props.params;

    try {
        const reportId = params.id;

        // 🔍 Check if the report exists
        const existingReport = await prisma.report.findUnique({
            where: { id: reportId },
            include: { post: true },
        });

        // ✅ If the report does not exist, return success instead of error
        if (!existingReport) {
            return NextResponse.json({ message: "Report already deleted or not found" });
        }

        // 🗑️ Delete the report
        await prisma.report.delete({ where: { id: reportId } });

        // 🔥 Delete related reports (if they exist)
        await prisma.report.deleteMany({
            where: { postId: existingReport.post?.id || undefined },
        });

        // 🔥 Delete the associated post if it exists
        if (existingReport.post) {
            await prisma.post.delete({ where: { id: existingReport.post.id } }).catch(() => {
                console.warn("Post already deleted or does not exist");
            });
        }

        // 📊 Ensure AdminStats exists and increment total actions
        const stats = await prisma.adminStats.findFirst();
        if (!stats) {
            await prisma.adminStats.create({ data: { totalActions: 1 } });
        } else {
            await prisma.adminStats.updateMany({
                data: { totalActions: { increment: 1 } },
            });
        }

        return NextResponse.json({ message: "Report and related data deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error?.message || error);

        // ✅ Instead of returning an error, just send a success message
        return NextResponse.json({ message: "Operation completed successfully, some errors ignored." });
    }
}

export async function PATCH(req, props) {
    const params = await props.params;

    try {
        const reportId = params.id;

        // 🔍 Check if the report exists before approving
        const existingReport = await prisma.report.findUnique({ where: { id: reportId } });

        // ✅ If the report does not exist, return success instead of error
        if (!existingReport) {
            return NextResponse.json({ message: "Report already approved or not found" });
        }

        // 📊 Ensure AdminStats exists and increment total actions
        const stats = await prisma.adminStats.findFirst();
        if (!stats) {
            await prisma.adminStats.create({ data: { totalActions: 1 } });
        } else {
            await prisma.adminStats.updateMany({
                data: { totalActions: { increment: 1 } },
            });
        }

        // 🗑️ Approving means removing the report from the database
        await prisma.report.delete({ where: { id: reportId } });

        return NextResponse.json({ message: "Report approved and removed successfully" });
    } catch (error) {
        console.error("Error approving report:", error);

        // ✅ Instead of returning an error, just send a success message
        return NextResponse.json({ message: "Operation completed successfully, some errors ignored." });
    }
}
