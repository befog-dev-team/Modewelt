import { requireAdmin } from "@/lib/auth";
import AnalyticsWrapper from "./AnalyticsWrapper"

export const metadata = {
  title: "User Analytics Dashboard",
  description: "User Analytics Dashboard for Admins",
};

export default async function AnalyticsPage() {
  const admin = await requireAdmin();

  return (
    <AnalyticsWrapper admin={admin} />
  );
}
