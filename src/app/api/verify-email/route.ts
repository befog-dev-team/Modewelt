import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { cookies } from "next/headers"; // For cookies management

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token"); // Get the token from the URL

    // If no token is provided
    if (!token) {
        return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    try {
        // Find the token in the database
        const verificationToken = await prisma.emailVerificationToken.findUnique({
            where: { token }, // Find the token
        });

        // If no token found
        if (!verificationToken) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        // Check if the token has expired
        const currentTime = new Date();
        if (verificationToken.expiresAt < currentTime) {
            return NextResponse.json({ error: "Token has expired" }, { status: 400 });
        }

        // Update the user's email verification status
        await prisma.user.update({
            where: { id: verificationToken.userId }, // Update the user
            data: { isVerified: true }, // Set the user as verified
        });

        // Delete the used token
        await prisma.emailVerificationToken.delete({
            where: { token }, // Delete the token
        });

        // Create the session
        const userId = verificationToken.userId; // Get the user id
        const session = await lucia.createSession(userId, {}); // Create the session
        const sessionCookie = lucia.createSessionCookie(session.id); // Create the session cookie

        // Set the session cookie in the response
        (await cookies()).set(
            sessionCookie.name, // Set the session cookie
            sessionCookie.value, // Set the session cookie value
            sessionCookie.attributes // Set the session cookie attributes
        );

        // Redirect the user to home after successful verification
        return NextResponse.redirect(new URL("/", req.url)); // Change to your desired redirect URL
    } catch (error) {
        console.error(error); // Log the error
        return NextResponse.json({ error: "Internal server error" }, { status: 500 }); // Return an internal server error
    }
}
