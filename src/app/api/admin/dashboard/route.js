import prisma from "@/lib/prisma";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        const dateFilter = {};
        if (from && to) {
            dateFilter.createdAt = {
                gte: new Date(from),
                lte: new Date(to),
            };
        }

        // Fetch new registrations (users created in the selected date range)
        const newRegistrations = await prisma.user.count({
            where: {
                createdAt: dateFilter.createdAt,
            },
        });

        // Count unique companies by grouping jobs by `company`
        const companyCount = await prisma.job.groupBy({
            by: ["company"], // Group by company name
            _count: { company: true },
        });

        // Extract total companies count
        const companies = companyCount.length; // Number of unique companies

        // Fetch total users
        const totalUsers = await prisma.user.count();

        // Fetch active users (users who have logged in recently)
        const activeUsers = await prisma.user.count({
            where: {
                lastLogin: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
            },
        });

        // Calculate inactive users
        const inactiveUsers = totalUsers - activeUsers;

        // For Growth Chart
        const users = await prisma.user.groupBy({
            by: ["createdAt"],
            _count: { _all: true },
            orderBy: { createdAt: "asc" },
            where: {
                createdAt: dateFilter.createdAt,
            },
        });

        const formattedData = users.map((user) => ({
            date: user.createdAt.toISOString().split("T")[0], // Format as YYYY-MM-DD
            count: user._count._all,
        }));

        return Response.json({ newRegistrations, companies, totalUsers, activeUsers, inactiveUsers, formattedData });
    } catch (error) {
        console.error("❌ Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}