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
            <div className="bg-white w-[290px] min-h-[280px] text-center mb-3 rounded-[4px]">
                <UserBackground
                    backgroundImageUrl={user.backgroundImageUrl || '/assets/feed/cover.png'}
                    alt="Profile Background"
                    width={2000}
                    height={1000}
                    className="w-[290px] h-[120px] mb-4 object-cover"
                />
                <Link href={`/profile/${user.username}`}>
                    <div className="relative w-[100px] h-[100px] mx-auto">
                        <UserAvatar avatarUrl={user.avatarUrl} size={1000} className="rounded-full border-4 w-[100px] h-[100px] border-white object-cover -mt-16" />
                    </div>
                </Link>
                <div className="mt-1 mb-2 text-[14px] font-[700] font-[Arial]">{user.displayName}</div>
                <p className="text-[#181818] text-[12px] px-7 h-[45px] text-center font-[400] font-[Arial] leading-[18px]">
                    {user.bio}
                </p>
            </div>
        </div>
    )
}
