"use server"

import { loginSchema, LoginValues } from "@/lib/validation"
import { verify } from "@node-rs/argon2"
import { lucia } from "@/auth"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma"

export async function login(
    credentials: LoginValues
): Promise<{ error: string }> {
    try {
        // Parse the login values
        const { email, password } = loginSchema.parse(credentials);
        email.toLowerCase(); // Convert the email to lowercase

        // Find the user by email
        const existingEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        });

        // If the user does not exist or does not have a password hash
        if (!existingEmail || !existingEmail.passwordHash) {
            return {
                error: "Invalid username or password" // Return an error
            };
        }

        // Verify the password
        const validPassword = await verify(existingEmail.passwordHash, password, {
            memoryCost: 19456, // 128MB
            timeCost: 2, // 2 iterations
            outputLen: 32, // 32 bytes
            parallelism: 1 // 1 thread
        });

        // If the password is invalid
        if (!validPassword) {
            return {
                error: "Invalid username or password"
            };
        }

        // Create a new session
        const session = await lucia.createSession(existingEmail.id, {});

        // Create a new session cookie
        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set( // Set the session cookie
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        // Redirect the user to the home page
        return { error: "" }; // Should not reach here, as the redirect happens before.
    } catch (error) {
        // Handle any errors during the login process
        console.error(error);
        return {
            error: "Something went wrong. Please try again."
        };
    }
}
