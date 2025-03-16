import { activityRequire } from "@/lib/activity";
import AdminDashboardWrapper from "./AdminDashboardWrapper"

export const metadata = {
    title: "Admin Dashboard",
    description: "Admin dashboard page for managing the app.",
};

export default async function AdminPage() {
    let admin;
    try {
        await activityRequire("ACCESS");
    } catch (error) {
        console.error("Failed to fetch admin data:", error);
        return <div>Error loading admin data</div>;
    }

    return (
        <AdminDashboardWrapper admin={admin} />
    );
}
