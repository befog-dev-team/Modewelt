import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { userId, reason, customReason, email, altEmail, postId } = await req.json();

        // Create a new report in the database
        const report = await prisma.report.create({
            data: {
                userId,
                reason,
                customReason,
                email,
                altEmail,
                postId
            }
        });

        return NextResponse.json({ message: "Report submitted successfully", report }, { status: 201 });
    } catch (error) {
        console.error("Error creating report:", error);
        return NextResponse.json({ message: "Failed to submit report" }, { status: 400 });
    }
}
