import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Fetch all skills
export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            include: {
                user: {
                    select: { id: true, displayName: true, avatarUrl: true },
                },
            },
        });

        return NextResponse.json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Create a new skill
export async function POST(req) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title } = await req.json();
        if (!title) {
            return NextResponse.json({ error: "Skill title is required" }, { status: 400 });
        }

        const newSkill = await prisma.skill.create({
            data: {
                userId: user.id,
                title,
                endorsements: 0,
            },
        });

        return NextResponse.json({ success: true, skill: newSkill });
    } catch (error) {
        console.error("Error creating skill:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
