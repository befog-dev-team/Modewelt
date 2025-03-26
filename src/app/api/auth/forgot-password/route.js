import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // ✅ Generate a secure reset token using crypto
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10); // Hash it using bcrypt
        const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

        // Save the hashed token to the database
        await prisma.emailVerificationToken.create({
            data: {
                token: hashedToken,
                userId: user.id,
                expiresAt,
            },
        });

        // Email Configuration using Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>Hi ${user.name || ""},</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <p><a href="${resetUrl}" style="color: blue;">Reset Password</a></p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thanks,</p>
                <p>Modeweltjob Team</p>
            `,
        };

        // Send the reset email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
    } catch (error) {
        console.error("Failed to send password reset email", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message || "Unknown error",
        }, { status: 500 });
    }
}
