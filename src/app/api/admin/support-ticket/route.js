import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);

        // Fetch reports with user, post, and media details
        const reports = await prisma.report.findMany({
            include: {
                user: true, // Include user details
                post: true, // Include post details
                media: true, // Include media details
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: "desc" }, // Sort by creation date (newest first)
        });

        const totalReports = await prisma.report.count();

        // Map reports to ticket structure
        const tickets = reports.map((report) => ({
            id: report.id,
            name: report.user?.displayName || "Unknown User",
            username: report.user?.username || "Unknown User",
            email: report.email || report.user?.email || "Unknown Email",
            altEmail: report.altEmail,
            userId: report.userId,
            postId: report.postId,
            jobId: report.jobId,
            avatarUrl: report.user?.avatarUrl,
            time: new Date(report.createdAt).toLocaleString(),
            reason: report.reason,
            message: report.customReason || report.reason || "No details provided",
            labels: report.reason === "Other" ? ["● High Priority"] : ["Open"],
            status: "open",
            media: report.media.map((media) => ({
                id: media.id,
                fileName: media.fileName,
                fileSize: media.fileSize,
                type: media.type,
                url: media.url,
                public_id: media.public_id,
                createdAt: media.createdAt,
            })),
        }));

        return NextResponse.json({ tickets, totalReports });
    } catch (error) {
        console.error("Error fetching support tickets:", error?.message || error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}