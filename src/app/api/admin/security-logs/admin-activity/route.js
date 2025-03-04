import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch admin activity data from the database
    const adminActivities = await prisma.adminActivity.findMany({
      include: {
        user: true, // Include related user data
      },
    });

    // Format the data for the table
    const formattedData = adminActivities.map((activity) => ({
      id: activity.id,
      date: activity.date.toLocaleString(), // Format date
      user: activity.user.username, // Use the username from the related user
      event: activity.action, // Use the action as the event
      source: 'Admin Dashboard', // Static source (you can customize this)
      ip: '127.0.0.1', // Static IP (you can customize this)
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching admin activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin activities' },
      { status: 500 }
    );
  }
}