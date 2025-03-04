import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch all admin activities
        const activities = await prisma.adminActivity.findMany({
            orderBy: { date: 'asc' },
        });

        return NextResponse.json({ activities }, { status: 200 });
    } catch (error) {
        console.error('Error fetching admin activities:', error);

        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message || "Unknown error",
        }, { status: 500 });
    }
}
