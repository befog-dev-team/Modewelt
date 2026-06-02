import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import LandingPageClient from "./LandingPageClient";

export default async function LandingPage() {
  // Validate the request to see if the user is authenticated
  const { user } = await validateRequest();

  // If user is authenticated, redirect them directly to their feed dashboard
  if (user) {
    redirect("/feed");
  }

  // Otherwise, render the guest landing page
  return <LandingPageClient />;
}
