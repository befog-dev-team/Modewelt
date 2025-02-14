import { useSession } from "@/app/(main)/SessionProvider";
import kyInstance from "@/lib/ky"; // Import kyInstance
import { FollowerInfo } from "@/lib/types"; // Import FollowerInfo type
import { useQuery } from "@tanstack/react-query"; // Import useQuery hook

// Define the useFollowerInfo hook
export default function useFollowerInfo(
  userId: string, // User ID
  initialState: FollowerInfo, // Initial state
) {
  const { user: loggedInUser } = useSession();

  if (!loggedInUser) {
    throw new Error("User must be logged in to use useFollowerInfo");
  }

  const query = useQuery({ // useQuery hook
    queryKey: ["follower-info", userId], // Query key
    queryFn: async () => { // Query function
      const response = await kyInstance.get(`/api/users/${userId}/followers`).json<FollowerInfo>(); // Fetch follower info
      // console.log("API Response for user", userId, response);
      // Normalize the API response
      return {
        followers: response.followers || 0, // Followers count
        following: response.following || 0, // Following count
        isFollowedByUser: response.isFollowedByUser, // Whether the user is followed by the logged-in user
        hasPendingRequest: response.hasPendingRequest, // Whether the logged-in user has a pending request
        sentRequests: response.sentRequests || [], // Array of follow requests
        receivedRequests: response.receivedRequests || [], // Array of follow requests
      };
    },
    initialData: initialState, // Initial data to populate the cache
    staleTime: 5000, // Data is considered stale after 5 seconds
    refetchInterval: 10000, // Refetch every 10 seconds
    // refetchOnWindowFocus: true, // Refetch when user focuses on the tab
  });

  return query; // Return the query object
}