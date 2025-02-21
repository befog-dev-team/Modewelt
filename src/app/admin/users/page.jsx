import { requireAdmin } from "@/lib/auth";
import UserManagement from "./UserManagement"

export const metadata = {
    title: "User Management Dashboard",
    description: "User Management Dashboard for Admins",
};

export default async function AdminPage() {
    const admin = await requireAdmin();

    return (
        <UserManagement admin={admin} />
    );
}
