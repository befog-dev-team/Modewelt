"use server";

import { validateRequest } from "@/auth"; // Import the validateRequest function from the auth module
import prisma from "@/lib/prisma"; // Import the Prisma client instance
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types"; // Import the getUserDataSelect function from the types module
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/lib/validation"; // Import the updateUserProfileSchema and UpdateUserProfileValues from the validation module

// Define the updateUserProfile function
export async function updateUserProfile(values: UpdateUserProfileValues) {
    try {
        // Validate input using Zod schema
        const validatedValues = updateUserProfileSchema.parse(values);

        // Ensure user is authenticated
        const { user } = await validateRequest();
        if (!user) {
            throw new Error("Unauthorized");
        }

        // Update the user in the database (Stream update is outside the transaction
        // so a Stream failure doesn't roll back the Prisma update)
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: validatedValues,
            select: getUserDataSelect(user.id),
        });

        // Sync display name to Stream — non-blocking, failure is logged but won't 
        // cause the entire profile update to fail
        try {
            await streamServerClient.partialUpdateUser({
                id: user.id,
                set: {
                    name: validatedValues.displayName,
                },
            });
        } catch (streamError) {
            // Stream sync is best-effort; profile is already saved in DB
            console.warn("Stream user sync failed (profile saved successfully):", streamError);
        }

        return updatedUser;
    } catch (error) {
        // Log the real error so it's visible in the server console
        console.error("Profile update error:", (error as Error)?.message ?? error);
        throw new Error("Failed to update profile.");
    }
}
