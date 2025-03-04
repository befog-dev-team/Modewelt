import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"; // For token verification
import { hash } from "@node-rs/argon2"; // Use Argon2 for password hashing

export async function POST(req) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword || typeof newPassword !== "string" || newPassword.trim().length < 6) {
            return NextResponse.json({ message: "Valid token and password (at least 6 characters) are required" }, { status: 400 });
        }

        // Fetch stored tokens
        const storedTokens = await prisma.emailVerificationToken.findMany({
            where: { expiresAt: { gt: new Date() } }, // Fetch only valid tokens
        });

        if (!storedTokens || storedTokens.length === 0) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        // Find the correct token by verifying with bcrypt
        let storedToken = null;
        for (const t of storedTokens) {
            console.log(`Checking token: ${t.token}`);
            if (t.token && (await bcrypt.compare(token, t.token))) {
                storedToken = t;
                break;
            }
        }

        if (!storedToken) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        // Ensure `storedToken.userId` exists before updating
        if (!storedToken.userId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Hash the new password using Argon2
        const hashedPassword = await hash(newPassword);

        // Update user's password
        await prisma.user.update({
            where: { id: storedToken.userId },
            data: { passwordHash: hashedPassword },
        });

        // Delete the token after use
        await prisma.emailVerificationToken.delete({ where: { id: storedToken.id } });

        return NextResponse.json({ message: "Password reset successfully!" }, { status: 200 });
    } catch (error) {
        console.error("❌ Failed to reset password:", error.message); // FIX: Proper error logging

        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message || "Unknown error",
        }, { status: 500 });
    }
}
