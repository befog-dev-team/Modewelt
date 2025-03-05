import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function DELETE() {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { isDeleted: true },
        });

        return NextResponse.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
