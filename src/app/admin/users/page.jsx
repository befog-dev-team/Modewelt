import { requireAdmin } from "@/lib/auth";
import UserManagement from "./UserManagement"

export const metadata = {
    title: "User Management Dashboard",
    description: "User Management Dashboard for Admins",
};

export default async function UserManagementPage() {
    let admin;
    try {
        admin = await requireAdmin();
    } catch (error) {
        console.error("Failed to fetch admin data:", error);
        return <div>Error loading admin data</div>;
    }

    return (
        <UserManagement admin={admin} />
    );
}
