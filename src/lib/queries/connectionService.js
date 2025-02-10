import prisma from "@/lib/prisma"; // Assuming you're using Prisma for DB access

export async function getConnections(period) {
    const now = new Date();
    let startDate;

    switch (period) {
        case "today":
            startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
            break;
        case "last-week":
            startDate = new Date(now.setDate(now.getDate() - 7)); // 7 days ago
            break;
        case "last-month":
            startDate = new Date(now.setMonth(now.getMonth() - 1)); // 1 month ago
            break;
        default:
            throw new Error("Invalid period");
    }

    const connections = await prisma.connection.findMany({
        where: {
            createdAt: {
                gte: startDate,
            },
        },
    });

    return connections;
}
