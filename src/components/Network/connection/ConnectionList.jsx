"use client";

import UserAvatar from "@/components/UserAvatar";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Connection() {
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchConnections = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/connections");
                const data = await res.json();
                setConnections(data.connections || []);
            } catch (error) {
                console.error("Error fetching connections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, []);

    return (
        <div className="connections px-4 sm:px-8 lg:px-12 py-8">
            {loading ? (
                <Loader2 className="animate-spin mx-auto" />
            ) : (
                <div className="space-y-4">
                    {connections.length > 0 ? (
                        connections.map((connection) => (
                            <div
                                key={connection.id}
                                className="w-full bg-white border border-[#E4E4E4] rounded-lg shadow-lg hover:shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-300 ease-in-out"
                            >
                                <div className="flex items-center space-x-4">
                                    <Link href={`/profile/${connection.username}`} prefetch={true}>

                                        <UserAvatar
                                            avatarUrl={connection.avatarUrl}
                                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                                        />
                                    </Link>

                                    <div>
                                        <Link href={`/profile/${connection.username}`} prefetch={true}>
                                            <p className="font-semibold hover:underline text-sm sm:text-base text-[#181818]">
                                                {connection.username}
                                            </p>
                                        </Link>
                                        <p className="text-xs sm:text-sm  text-[#181818] mt-1">
                                            {connection.profileHeadline}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-[3px] h-[42px] bg-[text-[#f26744]] hidden sm:block"></div>

                                <div className="flex-1 text-center sm:text-left">
                                    <p className="text-xs sm:text-sm text-[#181818bb]">
                                        {connection.bio || "No bio available."}
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    <Link href={`/profile/${connection.username}`} prefetch={true}>
                                        <button className="bg-gradient-to-r from-[#c166a0] to-[text-[#f26744]] text-white text-sm font-bold py-1 px-4 rounded transition-transform hover:scale-105">
                                            View Profile
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 text-lg">
                            No connections found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
