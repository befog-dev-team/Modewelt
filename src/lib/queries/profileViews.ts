import prisma from "@/lib/prisma";

export async function getTodayProfileViews(userId: string): Promise<number> {
    // Get the start and end of the current day
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Start of the day (00:00:00)

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // End of the day (23:59:59.999)

    // Query the ProfileView table for today's views
    const todayViews = await prisma.profileView.count({
        where: {
            viewedId: userId, // Filter by the viewed user's ID
            createdAt: {
                gte: todayStart, // Greater than or equal to the start of the day
                lte: todayEnd, // Less than or equal to the end of the day
            },
        },
    });

    return todayViews; // Return the number of views
}