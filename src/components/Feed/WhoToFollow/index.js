import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import { getUserDataSelect } from '@/lib/types';
import FollowButton from '../../FollowButton';
import Link from 'next/link';
import UserAvatar from '@/components/UserAvatar';

export default async function WhoToFollow() {
    const { user } = await validateRequest(); // Validate the request and get the user

    if (!user) return null; // If the user is not authenticated, return null

    const { user: loggedInUser } = await validateRequest(); // Get the authenticated user

    if (!loggedInUser) return null; // If the authenticated user is not found, return null

    // Get the users to follow
    const usersToFollow = await prisma.user.findMany({
        where: {
            NOT: {
                id: user.id, // Exclude the authenticated user
            },
            followers: {
                none: {
                    followerId: user.id, // Exclude users that are followed by the authenticated user
                },
            },
        },
        select: getUserDataSelect(user.id), // Pass the user-specific selection logic here
        take: 5,
    });

    return (
        <div className="bg-white min-h-[300px] p-4 mb-3 rounded-[4px]">
            {/* Heading */}
            <p className="font-[600] text-[12px] uppercase leading-[11.48px] font-[Gotham]">Who To Follow</p>

            {/* Divider */}
            <hr className="border-t border-[#F4F4F4] mt-4" />

            {/* Users to follow */}
            <div className="mt-4 flex flex-col gap-6">
                {usersToFollow.map((user) => (
                    <div key={user.id} className="flex items-center justify-between w-full">
                        <Link
                            href={`/profile/${user.username}`}
                            className="flex items-center gap-3 flex-1 min-w-0"
                            prefetch={true}
                        >
                            <UserAvatar avatarUrl={user.avatarUrl} size={500} className="w-[52px] h-[52px] flex-shrink-0" />
                            <div className="flex flex-col flex-1 min-w-0">
                                <p className="font-semibold font-[Gotham] text-[14px] text-[#181818] leading-[17.5px] truncate hover:underline">{user.displayName}</p>
                                <span className="font-[Gotham] text-[10px] leading-[15px] truncate text-gray-500">{user.profileHeadline}</span>
                            </div>
                        </Link>
                        <div className="flex-shrink-0 ml-2">
                            {user.id !== loggedInUser.id && ( // If the user is not the authenticated user show the follow button
                                <FollowButton
                                    userId={user.id}
                                    initialState={{
                                        followers: user._count.followers,
                                        following: user._count.following,
                                        hasPendingRequest: false,
                                        isFollowedByUser: false,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}