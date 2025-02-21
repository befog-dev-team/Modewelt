import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const currentDate = new Date();
        const last30Days = new Date(currentDate.setDate(currentDate.getDate() - 30));
        const previous30Days = new Date(currentDate.setDate(currentDate.getDate() - 30));

        // Current Period Data
        const newRegistrations = await prisma.user.count({
            where: { createdAt: { gte: last30Days } },
        });

        const totalUsers = await prisma.user.count();

        const activeUsers = await prisma.user.count({
            where: { lastLogin: { gte: last30Days } },
        });

        const deletedAccounts = await prisma.user.count({
            where: { isDeleted: true, createdAt: { gte: last30Days } },
        });

        // Previous Period Data (for trend comparison)
        const previousNewRegistrations = await prisma.user.count({
            where: { createdAt: { gte: previous30Days, lt: last30Days } },
        });

        const previousTotalUsers = totalUsers - newRegistrations;

        const previousActiveUsers = await prisma.user.count({
            where: { lastLogin: { gte: previous30Days, lt: last30Days } },
        });

        const previousDeletedAccounts = await prisma.user.count({
            where: { isDeleted: true, createdAt: { gte: previous30Days, lt: last30Days } },
        });

        // For user chart data -->

        // Fetch user creation dates
        const users = await prisma.user.findMany({
            select: {
                createdAt: true,
            },
        });

        // Define months
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Initialize user count array for each month
        const userCounts = new Array(12).fill(0);

        // Populate userCounts based on createdAt
        users.forEach((user) => {
            const monthIndex = new Date(user.createdAt).getMonth(); // Get month index (0-11)
            userCounts[monthIndex] += 1;
        });

        return Response.json({
            newRegistrations,
            previousNewRegistrations,
            totalUsers,
            previousTotalUsers,
            activeUsers,
            previousActiveUsers,
            deletedAccounts,
            previousDeletedAccounts,
            labels: months, userCounts
        });
    } catch (error) {
        console.error("❌ Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
