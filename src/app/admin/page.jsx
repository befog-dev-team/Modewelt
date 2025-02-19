import { requireAdmin } from "@/lib/auth";
import AdminDashboardWrapper from "./AdminDashboardWrapper"

export const metadata = {
    title: "Admin Dashboard",
    description: "Admin dashboard page for managing the app.",
};

export default async function AdminPage() {
    const admin = await requireAdmin();
    console.log("Admin data:", admin);

    return (
        <AdminDashboardWrapper admin={admin} />
    );
}
