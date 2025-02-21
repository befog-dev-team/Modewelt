import { requireAdmin } from "@/lib/auth";
import ProfileWrapper from "./ProfileWrapper"

export const metadata = {
    title: "Admin Profile",
    description: "Admin profile for update the admin profile",
};

export default async function AdminPage() {
    const admin = await requireAdmin();

    return (
        <ProfileWrapper admin={admin} />
    );
}
