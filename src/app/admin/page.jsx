import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
    const admin = await requireAdmin(); // Pass the current page URL

    return (
        <div>
            <h1>Welcome, Admin {admin.displayName}!</h1>
            <p>This is your admin dashboard.</p>
        </div>
    );
}

export async function generateMetaData (){
    return {
        title: "Admin Dashboard",
        description: "Admin dashboard page for managing the app.",
    };
}