// hooks/useFollowerInfo.ts
import { useSession } from "@/app/(main)/SessionProvider";
import kyInstance from "@/lib/ky";
import { FollowerInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initialState: FollowerInfo,
) {
  const { user: loggedInUser } = useSession();

  if (!loggedInUser) {
    throw new Error("User must be logged in to use useFollowerInfo");
  }

  const query = useQuery({
    queryKey: ["follower-info", loggedInUser.id, userId],
    queryFn: async () => {
      const response = await kyInstance.get(`/api/users/${userId}/followers`).json<FollowerInfo>();
      return {
        followers: response.followers ?? 0,
        following: response.following ?? 0,
        isFollowedByUser: response.isFollowedByUser ?? false,
        hasPendingRequest: response.hasPendingRequest ?? false,
        sentRequests: response.sentRequests ?? [],
        receivedRequests: response.receivedRequests ?? [],
      };
    },
    initialData: initialState,
    staleTime: 1, // Immediate stale
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    enabled: !!loggedInUser && !!userId,
  });

  return query;
}
