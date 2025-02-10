"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import UserAvatar from "../../UserAvatar";

// Component to handle follow requests
const FollowReceivedList = ({ userId }) => {
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [acceptedRequestLoading, setAcceptedRequestLoading] = useState(false);
    const [declinedRequestLoading, setDeclinedRequestLoading] = useState(false);

    useEffect(() => {
        const fetchFollowRequests = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/users/${userId}/followers`);
                const data = await response.json();
                if (response.ok) {
                    // Filter out accepted requests
                    const pendingRequests = data.receivedRequests.filter(
                        (request) => request.status !== "ACCEPTED"
                    );
                    setReceivedRequests(pendingRequests);
                } else {
                    console.error("Failed to fetch follow requests:", data.error);
                }
            } catch (error) {
                console.error("Error fetching follow requests:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowRequests();
    }, [userId]);

    const handleAccept = async (requestId) => {
        setAcceptedRequestLoading(true);
        const updatedRequests = receivedRequests.filter((request) => request.id !== requestId);
        setReceivedRequests(updatedRequests);

        try {
            const response = await fetch(`/api/users/${userId}/followers/${requestId}`, {
                method: "PATCH",
                body: JSON.stringify({ action: "ACCEPT" }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                setReceivedRequests(receivedRequests); // Revert if API fails
                console.error("Failed to accept follow request");
            }
        } catch (error) {
            setReceivedRequests(receivedRequests); // Revert if error
            console.error("Error accepting follow request:", error);
        } finally {
            setAcceptedRequestLoading(false);
        }
    };

    const handleDecline = async (requestId) => {
        setDeclinedRequestLoading(true);
        const updatedRequests = receivedRequests.filter((request) => request.id !== requestId);
        setReceivedRequests(updatedRequests);

        try {
            const response = await fetch(`/api/users/${userId}/followers/${requestId}`, {
                method: "PATCH",
                body: JSON.stringify({ action: "DECLINE" }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                setReceivedRequests(receivedRequests); // Revert if API fails
                console.error("Failed to decline follow request");
            }
        } catch (error) {
            setReceivedRequests(receivedRequests); // Revert if error
            console.error("Error declining follow request:", error);
        } finally {
            setDeclinedRequestLoading(false);
        }
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Loader2 className="animate-spin mx-auto" />
                </div>
            ) : receivedRequests.length > 0 ? (
                <div className="space-y-4">
                    {receivedRequests.map((request) => (
                        <div
                            key={request.id}
                            className="w-full max-w-full mx-auto bg-white border border-[#E4E4E4] rounded-lg shadow-lg hover:shadow-2xl p-4 sm:p-6 flex flex-col items-center sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-300 ease-in-out"
                        >
                            <div className="flex items-center space-x-4">
                                <UserAvatar
                                    avatarUrl={request.sender.avatarUrl}
                                    width={100}
                                    height={100}
                                    className="w-14 h-14 sm:w-[52px] sm:h-[52px] rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-sm sm:text-base">{request.sender.username}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {request.sender.profileHeadline}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    disabled={acceptedRequestLoading || declinedRequestLoading}
                                    className="bg-gradient-to-r from-[#c166a0] to-[#A45286] text-white text-sm font-bold py-1 px-4 rounded"
                                >
                                    {acceptedRequestLoading ? <Loader2 className="animate-spin" /> : "Accept"}
                                </button>

                                <button
                                    onClick={() => handleDecline(request.id)}
                                    disabled={declinedRequestLoading || acceptedRequestLoading}
                                    className="border border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500 text-xs sm:text-sm font-bold py-1 px-4 rounded"
                                >
                                    {declinedRequestLoading ? <Loader2 className="animate-spin" /> : "Decline"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-700 text-sm font-medium mb-4">No Pending Requests Received.</p>
            )}
        </div>
    );
};

export default FollowReceivedList;
