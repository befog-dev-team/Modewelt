import React from "react"; // Import the React library
import prisma from "@/lib/prisma"; // Import the Prisma client
import { validateRequest } from "@/auth"; // Import the validateRequest function
import Navbar from "@/components/Navbar";

export default async function NavbarServer() {
    const user = await validateRequest(); // Fetch the logged-in user

    if (!user) return null; // If not logged in, return nothing

    // Count the number of unread notifications
    const unreadNotificationCount = await prisma.notification.count({
        where: { // Where the notification is unread and the recipient is the logged-in user
            recipientId: user.id, // The recipient is the logged-in user
            read: false, // The notification is unread
        },
    });

    return <Navbar unreadNotificationCount={unreadNotificationCount} />;
}
