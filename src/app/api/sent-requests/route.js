import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle GET requests
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    try {
        const sentRequests = await prisma.followerRequest.findMany({
            where: {
                senderId: userId,
            },
            include: {
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                        profileHeadline: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(sentRequests, { status: 200 });
    } catch (error) {
        console.error('Error fetching sent requests:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching sent requests.' },
            { status: 500 }
        );
    }
}
