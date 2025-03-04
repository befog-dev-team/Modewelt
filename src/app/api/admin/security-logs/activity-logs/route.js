import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, action } = body;

        if (!userId || !action) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Log the admin activity
        await prisma.adminActivity.create({
            data: {
                userId,
                action,
            },
        });

        return NextResponse.json({ message: "Admin activity logged successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error logging admin activity:", error);

        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message || "Unknown error",
        }, { status: 500 });
    }
}
