import { requireAdmin } from "@/lib/auth";
import ContentWrapper from "./ContentWrapper"

export const metadata = {
  title: "Content Moderation Dashboard",
  description: "Content Moderation Dashboard for Admins",
};

export default async function ContentModerationPage() {
  let admin;
  try {
    admin = await requireAdmin();
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return <div>Error loading admin data</div>;
  }

  return (
    <ContentWrapper admin={admin} />
  );
}
