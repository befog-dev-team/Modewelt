import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { validateRequest } from "@/auth";

export const requireAdmin = async () => {
    const requestHeaders = await headers();
    const referer = requestHeaders.get("referer") || "/feed"; 

    const { user } = await validateRequest();

    if (!user || user.role !== "ADMIN") {
      console.error("You're not an admin! Redirecting to:", referer);
      redirect(referer); // Redirect back to previous page
    }

    return user; // Return user data if authorized
};
