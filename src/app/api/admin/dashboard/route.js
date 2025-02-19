import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch new registrations (users created in the last 30 days)
        const newRegistrations = await prisma.user.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
            },
        });

        // Count unique companies by grouping jobs by `company`
        const companyCount = await prisma.job.groupBy({
            by: ["company"], // Group by company name
            _count: { company: true },
        });

        // Extract total companies count
        const companies = companyCount.length; // Number of unique companies

        // Fetch active users (users who have logged in recently)
        const activeUsers = await prisma.user.count({
            where: {
                lastLogin: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
            },
        });

        // Fetch total users
        const totalUsers = await prisma.user.count();

        return Response.json({ newRegistrations, companies, activeUsers, totalUsers });
    } catch (error) {
        console.error("❌ Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

