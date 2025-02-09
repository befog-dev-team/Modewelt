// src/app/api/auth/validate/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Prisma client
import { validateRequest } from "@/auth"; // Your custom validation function

// Export a named handler for the GET method
export async function GET() {
    try {
        // Validate session and get the user
        const { user } = await validateRequest();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Query users to follow, excluding the current user
        const usersToFollow = await prisma.user.findMany({
            where: {
                NOT: { id: user.id }, // Exclude the logged-in user
            },
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                backgroundImageUrl: true,
            },
        });

        return NextResponse.json({ usersToFollow });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
