"use server";

import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;

  if (sessionId) {
    await lucia.invalidateSession(sessionId);
  }

  // Create a new session cookie
  const sessionCookie = lucia.createBlankSessionCookie();

  // Set the session cookie
  (await cookies()).set(
    sessionCookie.name, // the session cookie name
    sessionCookie.value, // the session cookie value
    sessionCookie.attributes, // the session cookie attributes
  );

  // Redirect the user to the home page
  return redirect("/");
}
