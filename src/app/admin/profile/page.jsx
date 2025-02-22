import { requireAdmin } from "@/lib/auth";
import ProfileWrapper from "./ProfileWrapper"

export const metadata = {
    title: "Admin Profile",
    description: "Admin profile for update the admin profile",
};

export default async function AdminProfilePage() {
    let admin;
    try {
        admin = await requireAdmin();
    } catch (error) {
        console.error("Failed to fetch admin data:", error);
        return <div>Error loading admin data</div>;
    }

    return (
        <ProfileWrapper admin={admin} />
    );
}
