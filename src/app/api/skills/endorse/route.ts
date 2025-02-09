import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { skillId } = await req.json();
        if (!skillId) {
            return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
        }

        // Fetch skill to ensure it exists
        const skill = await prisma.skill.findUnique({
            where: { id: skillId },
        });

        if (!skill) {
            return NextResponse.json({ error: "Skill not found" }, { status: 404 });
        }

        // Prevent self-endorsement
        if (skill.userId === user.id) {
            return NextResponse.json({ error: "You cannot endorse your own skill" }, { status: 403 });
        }

        // Check if the user has already endorsed the skill
        const existingEndorsement = await prisma.endorsement.findFirst({
            where: {
                skillId,
                userId: user.id,
            },
        });

        if (existingEndorsement) {
            // Remove the endorsement
            await prisma.endorsement.delete({
                where: { id: existingEndorsement.id },
            });

            // Decrease endorsement count
            await prisma.skill.update({
                where: { id: skillId },
                data: {
                    endorsements: { decrement: 1 },
                },
            });

            return NextResponse.json({ success: true, message: "Endorsement removed", endorsed: false });
        } else {
            // Add new endorsement
            await prisma.endorsement.create({
                data: {
                    skillId,
                    userId: user.id,
                },
            });

            // Increase endorsement count
            await prisma.skill.update({
                where: { id: skillId },
                data: {
                    endorsements: { increment: 1 },
                },
            });

            return NextResponse.json({ success: true, message: "Skill endorsed", endorsed: true });
        }
    } catch (error) {
        console.error("Error toggling endorsement:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}