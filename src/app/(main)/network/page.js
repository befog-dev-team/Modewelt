import { redirect } from 'next/navigation';
import { validateRequest } from '@/auth';
import NetworkClientWrapper from './NetworkClientWrapper';
import prisma from '@/lib/prisma';

export const metadata = {
    title: "Network",
    description: "Network page for the showing network",
};

export default async function NetworkPage() {
    const { user } = await validateRequest();
    
    if (!user) {
        redirect("/auth");
    }

    const users = await prisma.user.findMany({
        where: {
            NOT: { id: user.id }, // Exclude the logged-in user
        },
        select: {
            id: true,
            username: true,
            avatarUrl: true,
            backgroundImageUrl: true,
        },
    });

    return (
        <div>
            <NetworkClientWrapper users={users} />
        </div>
    );
}
