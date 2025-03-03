import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        // Convert provided dates to Date objects
        const fromDate = from ? new Date(from) : null;
        const toDate = to ? new Date(to) : null;

        // Create independent date references
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const previous30Days = new Date();
        previous30Days.setDate(today.getDate() - 60);

        // Apply date filter if provided
        const dateFilter = fromDate && toDate ? { createdAt: { gte: fromDate, lte: toDate } } : {};

        // 📌 **Current Period Stats**
        const newRegistrations = await prisma.user.count({
            where: from && to ? dateFilter : { createdAt: { gte: last30Days } },
        });

        const totalUsers = await prisma.user.count();

        const activeUsers = await prisma.user.count({
            where: { lastLogin: { gte: last30Days } },
        });

        const deletedAccounts = await prisma.user.count({
            where: { isDeleted: true, createdAt: { gte: last30Days } },
        });

        // 📌 **Previous Period Stats**
        const previousNewRegistrations = await prisma.user.count({
            where: { createdAt: { gte: previous30Days, lt: last30Days } },
        });

        const previousTotalUsers = Math.max(totalUsers - newRegistrations, 0);

        const previousActiveUsers = await prisma.user.count({
            where: { lastLogin: { gte: previous30Days, lt: last30Days } },
        });

        const previousDeletedAccounts = await prisma.user.count({
            where: { isDeleted: true, createdAt: { gte: previous30Days, lt: last30Days } },
        });

        // 📌 **User Registrations Per Month for Chart**
        const users = await prisma.user.findMany({
            select: { createdAt: true },
        });

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const userCounts = new Array(12).fill(0);
        users.forEach((user) => {
            const monthIndex = new Date(user.createdAt).getMonth();
            userCounts[monthIndex] += 1;
        });

        return NextResponse.json({
            newRegistrations,
            previousNewRegistrations,
            totalUsers,
            previousTotalUsers,
            activeUsers,
            previousActiveUsers,
            deletedAccounts,
            previousDeletedAccounts,
            labels: months,
            userCounts
        });
    } catch (error) {
        console.error("❌ Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
