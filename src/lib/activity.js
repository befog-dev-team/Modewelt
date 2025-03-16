"use server"; // Ensures this function is treated as a server function

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { validateRequest } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to require admin access and log activity
export const activityRequire = async (action) => {
  const requestHeaders = await headers();
  const referer = requestHeaders.get("referer") || "/feed";

  const { user } = await validateRequest();

  if (user.role !== "ADMIN") {
    console.warn("Unauthorized access attempt. Redirecting to:", referer);
    redirect(referer); // Redirect back to the referring page
  }

  // Log the admin activity
  try {
    await prisma.adminActivity.create({
      data: {
        userId: user.id,
        action,
      },
    });

    console.log("Admin activity logged successfully:", { userId: user.id, action });
  } catch (error) {
    console.error("Failed to log admin activity:", error);
  }

  return user; // Return user data if authorized
};