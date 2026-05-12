"use server";

import prisma from "@/lib/prisma";
import { signupSchema, SignUpValues } from "@/lib/validation";
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

    // Start transaction
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.user.create({
        data: {
          id: userId,
          username,
          displayName: username,
          email,
          passwordHash,
          phone,
          isVerified: false,
        },
      });

      await streamServerClient.upsertUser({
        id: userId,
        username,
        name: username,
      });

      await tx.emailVerificationToken.create({
        data: {
          token: verificationToken,
          userId,
          expiresAt: tokenExpiry,
        },
      });
    });

    // Create the email verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${verificationToken}`;

    // Send the verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address",
      html: getEmailVerificationTemplate(verificationUrl),
    });

    return { error: "" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
}
