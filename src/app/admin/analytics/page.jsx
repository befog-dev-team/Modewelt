import { requireAdmin } from "@/lib/auth";
import AnalyticsWrapper from "./AnalyticsWrapper"

export const metadata = {
  title: "User Analytics Dashboard",
  description: "User Analytics Dashboard for Admins",
};

export default async function AnalyticsPage() {
  let admin;
  try {
    admin = await requireAdmin();
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return <div>Error loading admin data</div>;
  }

  return (
    <AnalyticsWrapper admin={admin} />
  );
}
