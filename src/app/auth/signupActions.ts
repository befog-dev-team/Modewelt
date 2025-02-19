"use server";

import prisma from "@/lib/prisma";
import { signupSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { Prisma } from "@prisma/client";
import streamServerClient from "@/lib/stream";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP host
  port: 2525, // Mailtrap SMTP port
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Uncomment the code below to use Gmail transporter instead of Mailtrap

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

export async function signUp(
  credentials: SignUpValues // The sign up values
): Promise<{ error: string }> {
  try {
    const { username: rawUsername, email: rawEmail, password } = signupSchema.parse(credentials);

    const username = rawUsername.toLowerCase(); // Convert the username to lowercase
    const email = rawEmail.toLowerCase(); // Convert the email to lowercase

    // Hash the password
    const passwordHash = await hash(password, {
      memoryCost: 19456, // 128MB
      timeCost: 2, // 2 iterations
      outputLen: 32, // 32 bytes
      parallelism: 1, // 1 thread
    });

    // Generate a unique user ID
    const userId = generateIdFromEntropySize(10); // Generate a user id

    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({ where: { username: username.toLowerCase() } });
    if (existingUser) return { error: "Username is already taken" };

    // Check if the email already exists
    const existingEmail = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existingEmail) return { error: "Email is already taken" };

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setDate(tokenExpiry.getDate() + 7); // 7 days expiry time

    // Explicitly typing `tx` as `Prisma.TransactionClient`
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.user.create({ // Create the user in the transaction
        data: { // The user data
          id: userId, // The user id
          username, // The username
          displayName: username, // The display name
          email, // The email
          passwordHash, // The password hash
          phone: "", // The phone number
          isVerified: false, // The user is not verified
        },
      });

      await streamServerClient.upsertUser({ // upsert the user on the stream server
        id: userId, // the user id
        username, // the username
        name: username, // the display name
      });

      await tx.emailVerificationToken.create({
        data: {
          token: verificationToken, // The verification token
          userId, // The user id
          expiresAt: tokenExpiry, // The expiry time
        },
      });
    });

    // Create the email verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${verificationToken}`; // The verification URL

    // Send the verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // The email sender
      to: email, // The email recipient
      subject: "Verify Your Email Address", // The email subject
      html: `
        <h1>Welcome to Our Platform!</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link will expire in 7 days.</p>
      `,
    });

    // Return success message, waiting for email verification
    return { error: "" };
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
}
