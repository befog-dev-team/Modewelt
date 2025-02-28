import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);

        const reports = await prisma.report.findMany({
            include: { user: true, post: true, media: true },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: "desc" },
        });

        const totalReports = await prisma.report.count();

        // Map reports to ticket structure
        const tickets = reports.map((report) => ({
            id: report.id,
            name: report.user?.displayName || "Unknown User",
            avatarUrl: report.user?.avatarUrl,
            time: new Date(report.createdAt).toLocaleString(),
            message: report.customReason || report.reason || "No details provided",
            labels: report.reason === "Other" ? ["● High Priority"] : ["Open"],
            status: "open",
        }));

        return NextResponse.json({ tickets, totalReports });
    } catch (error) {
        console.error("Error fetching tickets:", error?.message || error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
