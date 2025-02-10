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
        take: 3, // Get the top 3 users
    });

    return (
        <div className="bg-white min-h-[300px] p-4 mb-3 rounded-[4px]">
            {/* Heading */}
            <p className="font-[600] text-[12px] uppercase leading-[11.48px] font-[Gotham]">Who To Follow</p>

            {/* Divider */}
            <hr className="border-t border-[#F4F4F4] mt-4" />

            {/* Users to follow */}
            <div className="w-[227px] h-[198px] mt-2">
                {usersToFollow.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 my-6">
                        <Link
                            href={`/profile/${user.username}`}
                            className="flex items-center gap-3"
                        >
                            <UserAvatar avatarUrl={user.avatarUrl} size={500} className="w-[52px] h-[52px]" />
                            <div>
                                <div className="flex flex-col">
                                    <p className="font-semibold font-[Gotham] text-[14px] text-[#181818] leading-[17.5px] w-[132px] line-clamp-1 break-all hover:underline">{user.displayName}</p>
                                    <span className="font-[Gotham] text-[10px] leading-[15px]">{user.profileHeadline}</span>
                                </div>
                            </div>
                        </Link>
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
                ))}
            </div>
        </div>
    )
}