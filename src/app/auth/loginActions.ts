"use server";

import { loginSchema, LoginValues } from "@/lib/validation";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function login(
    credentials: LoginValues
): Promise<{ error: string }> {
    try {
        // Parse the login values
        const { email, password } = loginSchema.parse(credentials);
        email.toLowerCase(); // Convert the email to lowercase

        // Find the user by email
        const existingUser = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        });

        // Check if user exists and has a password hash
        if (!existingUser || !existingUser.passwordHash) {
            return { error: "Invalid username or password" };
        }

        // Check if the user is verified
        if (!existingUser.isVerified) {
            return { error: "Please verify your email before logging in." };
        }

        // Verify the password
        const validPassword = await verify(
            existingUser.passwordHash, password, {
            memoryCost: 19456, // 128MB
            timeCost: 2,       // 2 iterations
            outputLen: 32,     // 32 bytes
            parallelism: 1     // 1 thread
        });

        if (!validPassword) {
            return { error: "Invalid username or password" };
        }

        // Create a new session
        const session = await lucia.createSession(existingUser.id, {});

        // Create a new session cookie
        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return { error: "" }; // Successful login
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong. Please try again." };
    }
}
