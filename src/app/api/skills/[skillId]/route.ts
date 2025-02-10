import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ skillId: string }> }) {
    const params = await props.params;
    try {
        const { skillId } = params;

        const skill = await prisma.skill.findUnique({
            where: { id: skillId },
            include: { user: true, endorsementsList: true },
        });

        if (!skill) {
            return NextResponse.json({ error: "Skill not found" }, { status: 404 });
        }

        return NextResponse.json(skill);
    } catch (error) {
        console.error("Error fetching skill:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ skillId: string }> }) {
    const params = await props.params;
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { skillId } = params;

        // Ensure the skill exists and belongs to the user
        const skill = await prisma.skill.findUnique({
            where: { id: skillId, userId: user.id },
        });

        if (!skill) {
            return NextResponse.json({ error: "Skill not found or unauthorized" }, { status: 403 });
        }

        await prisma.skill.delete({
            where: { id: skillId },
        });

        return NextResponse.json({ success: true, message: "Skill deleted" });
    } catch (error) {
        console.error("Error deleting skill:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}