"use client"

import { useSession } from '@/app/(main)/SessionProvider';
import UserAvatar from '@/components/UserAvatar'
import UserBackground from '@/components/UserBackground';
import Link from 'next/link';
import React from 'react'

export default function Index() {
    const { user } = useSession(); // User Session

    // If User is not Logged In
    if (!user) {
        return null; // Return Nothing
    }

    return (
        <div>
            <div className="bg-white dark:bg-gray-900 w-[290px] min-h-[280px] text-center mb-3 rounded-[4px] border dark:border-gray-800 transition-colors">
                <UserBackground
                    backgroundImageUrl={user.backgroundImageUrl || '/assets/feed/cover.png'}
                    alt="Profile Background"
                    width={2000}
                    height={1000}
                    className="w-[290px] h-[120px] mb-4 object-cover"
                />
                <Link href={`/profile/${user.username}`} prefetch={true}>
                    <div className="relative w-[100px] h-[100px] mx-auto">
                        <UserAvatar avatarUrl={user.avatarUrl} size={1000} className="rounded-full border-4 w-[100px] h-[100px] border-white dark:border-gray-800 object-cover -mt-16 transition-all" />
                    </div>
                </Link>
                <div className="mt-1 mb-2 text-[14px] font-[700] font-[Arial] text-gray-900 dark:text-white transition-colors">{user.displayName}</div>
                <p className="text-gray-600 dark:text-gray-400 text-[12px] px-7 h-[45px] text-center font-[400] font-[Arial] leading-[18px] transition-colors">
                    {user.bio}
                </p>
            </div>
        </div>
    )
}
