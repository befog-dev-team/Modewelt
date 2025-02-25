import { requireAdmin } from "@/lib/auth";
import JobsManagementWrapper from "./JobsManagementWrapper"

export const metadata = {
    title: "Jobs Management",
    description: "Manage all the jobs posted on the platform",
};

export default async function JobsManagementPage() {
    let admin;
    try {
        admin = await requireAdmin();
    } catch (error) {
        console.error("Failed to fetch admin data:", error);
        return <div>Error loading admin data</div>;
    }

    return (
        <JobsManagementWrapper admin={admin} />
    );
}
