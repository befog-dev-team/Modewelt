import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, props) {
    const params = await props.params;
    try {
        const { user } = await validateRequest();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // console.log("👤 Authenticated User:", user);

        // Extract username from the request parameters
        const username = params?.username;

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const skills = await prisma.skill.findMany({
            where: {
                user: { username }, // Assuming 'username' is stored in the user model
            },
            include: {
                user: {
                    select: { id: true, displayName: true, avatarUrl: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, skills }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching skills:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
