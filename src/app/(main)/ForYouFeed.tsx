"use client";

import Post from "@/components/Feed/Post"; // Import the Post component
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer"; // Import the InfiniteScrollContainer component
import PostsLoadingSkeleton from "@/components/Feed/Post/PostsLoadingSkelton"; // Import the PostsLoadingSkeleton component
import kyInstance from "@/lib/ky"; // Import the ky instance
import { PostsPage } from "@/lib/types"; // Import the PostsPage type
import { useInfiniteQuery } from "@tanstack/react-query"; // Import the useInfiniteQuery hook
import { Loader2 } from "lucide-react"; // Import the Loader2 component

export default function ForYouFeed() {
  const {
    data, // The data from the query
    fetchNextPage, // The function to fetch the next page of posts
    hasNextPage, // Whether there is a next page of posts
    isFetching, // Whether the query is fetching
    isFetchingNextPage, // Whether the next page is fetching
    status, // The status of the query
  } = useInfiniteQuery({ // Use the useInfiniteQuery hook to fetch the posts
    queryKey: ["post-feed", "for-you"], // The query key and the query type
    queryFn: ({ pageParam }) => // The query function that fetches the posts
      kyInstance // Use the ky instance to fetch the posts from the for-you feed endpoint. It gives error automatically like 404, 401, 500 etc. We dont need to handle it manually like we did for the axios and fetch api.
        .get(
          "/api/posts/for-you", // Fetch the posts from the for-you feed endpoint
          pageParam ? { searchParams: { cursor: pageParam } } : {}, // Use the cursor to fetch the next page of posts
        )
        .json<PostsPage>(), // Parse the JSON response
    initialPageParam: null as string | null, // The initial page parameter
    getNextPageParam: (lastPage) => lastPage.nextCursor, // Get the next page parameter
  });

  // The posts from the data
  const posts = data?.pages.flatMap((page) => page.posts) || []; // Flatmap is used to flatten the array of posts. It gives one dimensional data array instead of the two dimensional array. 

  if (status === "pending") { // If the status is pending, show the loading skeleton
    return <PostsLoadingSkeleton />; // Show the PostsLoadingSkeleton component
  }

  if (status === "success" && !posts.length && !hasNextPage) { // If the status is success and there are no posts and no next page
    return ( // Show a message that no one has posted anything yet
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error") { // If the status is error, show an error message
    return ( // Show an error message that an error occurred while loading posts
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5" // Add space between the posts
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()} // Trigger this if we have next page and we are not fetching the data or the next page then call the fetchNextPage function to fetch the next page
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {/* Show a loading spinner when fetching the next page */}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />} 
    </InfiniteScrollContainer>
  );
}