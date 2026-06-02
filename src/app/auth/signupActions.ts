"use server";

import prisma from "@/lib/prisma";
import { signupSchema, SignUpValues } from "@/lib/validation";
import { z } from "zod";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { Prisma } from "@prisma/client";
import streamServerClient from "@/lib/stream";
import { getEmailVerificationTemplate } from "@/lib/utils";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function signUp(
  credentials: SignUpValues
): Promise<{ error: string }> {
  console.log("====> SERVER ACTION: signUp started with credentials:", credentials);
  try {
    const { username: rawUsername, email: rawEmail, password, phone } = signupSchema.parse(credentials);

    const username = rawUsername.toLowerCase(); // Convert the username to lowercase
    const email = rawEmail.toLowerCase(); // Convert the email to lowercase

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // Prevent signup if account exists and is deleted
    if (existingUser?.isDeleted) {
      return { error: "This account has been deleted. Please contact support." };
    }

    // Check if the username already exists
    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) return { error: "Username is already taken" };

    if (existingUser) return { error: "Email is already taken" };

    // Hash the password
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Generate a unique user ID
    const userId = generateIdFromEntropySize(10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setDate(tokenExpiry.getDate() + 7); // 7 days expiry time

    // Start database transaction
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.user.create({
        data: {
          id: userId,
          username,
          displayName: username,
          email,
          passwordHash,
          phone,
          isVerified: true, // Auto-verify: email sending is optional
        },
      });

      await tx.emailVerificationToken.create({
        data: {
          token: verificationToken,
          userId,
          expiresAt: tokenExpiry,
        },
      });
    });

    // Try to register the user with Stream Chat outside the transaction
    try {
      if (streamServerClient) {
        await streamServerClient.upsertUser({
          id: userId,
          username,
          name: username,
        });
      }
    } catch (streamError) {
      console.warn("⚠️ Stream Chat upsert skipped/failed (network/timeout):", streamError instanceof Error ? streamError.message : streamError);
    }

    // Try to send a verification email (non-blocking — won't fail signup if unconfigured)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.NEXT_PUBLIC_BASE_URL) {
        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${verificationToken}`;
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Verify Your Email Address",
          html: getEmailVerificationTemplate(verificationUrl),
        });
      } else {
        console.warn("⚠️ Email env vars not set — skipping verification email.");
      }
    } catch (emailError) {
      console.warn("⚠️ Failed to send verification email:", emailError instanceof Error ? emailError.message : emailError);
    }

    return { error: "" };
  } catch (error) {
    console.error("Real signup error details:", error);
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    if (error instanceof Error) {
      if (error.message.includes("is not defined") || error.message.includes("missing")) {
        return { error: "Server configuration error: missing environment variables." };
      }
    }
    return { error: "Something went wrong. Please try again." };
  }
}
