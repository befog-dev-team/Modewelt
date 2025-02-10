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
        const validatedValues = updateUserProfileSchema.parse(values); // Parse the values using the updateUserProfileSchema

        // Ensure user is authenticated
        const { user } = await validateRequest();
        if (!user) { // If the user does not exist
            throw new Error("Unauthorized"); // Throw an unauthorized error
        }

        // Update the user in the database
        const updatedUser = await prisma.$transaction(async (tx) => {
            // Update the user in the database
            const updatedUser = await tx.user.update({ // update the user in the database
                where: { id: user.id }, // find the user by id
                data: validatedValues, // set the user's data to the validated values
                select: getUserDataSelect(user.id), // select the user's data
            });

            // Update the user on the Stream server
            await streamServerClient.partialUpdateUser({ // update the user on the stream server
                id: user.id, // find the user by id
                set: { // set the user's name
                    name: validatedValues.displayName  // set the user's display name to the validated values
                }
            })
            return updatedUser; // return the updated user
        });

        return updatedUser; // Return the updated user
    } catch (error) {
        console.error("Profile update error:", error);
        throw new Error("Failed to update profile.");
    }
}
