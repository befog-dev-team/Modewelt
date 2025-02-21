import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { validateRequest } from "@/auth";

export const requireAdmin = async () => {
  "use server"; // Ensures this function is treated as a server function

  const requestHeaders = headers(); // `headers` is already async-capable, no need for `await`
  const referer = requestHeaders.get("referer") || "/feed"; 

  const { user } = await validateRequest();

  if (!user || user.role !== "ADMIN") {
    console.warn("Unauthorized access attempt. Redirecting to:", referer);
    redirect(referer); // Redirect back to the referring page
  }

  return user; // Return user data if authorized
};
