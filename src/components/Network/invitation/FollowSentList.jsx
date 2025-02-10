'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar'; // Assuming you have this component

export default function SentRequests({ userId }) {
    const [sentRequests, setSentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRequests() {
            try {
                const response = await fetch(`/api/sent-requests?userId=${userId}`);
                if (!response.ok) throw new Error('Failed to fetch sent requests');
                const data = await response.json();
                setSentRequests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (userId) fetchRequests();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Loader2 className="animate-spin mx-auto" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <>
            {sentRequests.length > 0 ? (
                <div className="space-y-4">
                    {sentRequests.map((request) => (
                        <div
                            key={request.id}
                            className="w-full bg-white border border-[#E4E4E4] rounded-lg shadow-lg hover:shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-300 ease-in-out"
                        >
                            <div className="flex items-center space-x-4">
                                <Link href={`/profile/${request.receiver.username}`}>
                                    <UserAvatar
                                        avatarUrl={request.receiver.avatarUrl}
                                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                                    />
                                </Link>

                                <div>
                                    <Link href={`/profile/${request.receiver.username}`}>
                                        <div className="font-semibold hover:underline text-sm sm:text-base text-[#181818]">
                                            {request.receiver.username}
                                        </div>
                                    </Link>
                                    <div className="text-xs sm:text-sm text-[#181818] mt-1">
                                        {request.receiver.profileHeadline}
                                    </div>
                                </div>
                            </div>

                            <div className="w-[3px] h-[42px] bg-[#A45286] hidden sm:block"></div>

                            <div className="flex-1 text-center sm:text-left">
                                <div className="text-xs sm:text-sm text-[#181818bb]">
                                    {request.receiver.bio || 'No bio available.'}
                                </div>
                            </div>

                            <div className="flex justify-center items-center space-x-2">
                                <Link href={`/profile/${request.receiver.username}`}>
                                    <button className="bg-gradient-to-r from-[#c166a0] to-[#A45286] text-white text-sm font-bold py-1 px-4 rounded transition-transform hover:scale-105">
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Replacing <p> with <div> to avoid the hydration issue
                <div className="text-center text-gray-700 text-sm font-medium mb-4">
                    No Pending Requests Received.
                </div>
            )}
        </>
    );
}
