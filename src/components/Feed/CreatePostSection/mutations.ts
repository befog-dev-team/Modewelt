import { useSession } from "@/app/(main)/SessionProvider"; // useSession hook from the SessionProvider module
import toast  from 'react-hot-toast' // Import the toast function from the react-hot-toast module
import { PostsPage } from "@/lib/types"; // Import the PostsPage type from the types module
import {
    InfiniteData, Query, // Import the InfiniteData type from the react-query module
    useMutation, // Import the useMutation hook from the react-query module
    useQueryClient, // Import the useQueryClient hook from the react-query module
} from "@tanstack/react-query"; // Import the react-query functions from the tanstack module
import { submitPost } from "./actions"; // Import the submitPost function from the actions module

export function useSubmitPostMutation() {

    // useQueryClient hook from the react-query module
    const queryClient = useQueryClient();

    // useSession hook from the SessionProvider module
    const { user } = useSession();

    // useMutation hook from the react-query module
    const mutation = useMutation({ // Create a new mutation
        mutationFn: submitPost, // Set the mutation function to submitPost
        onSuccess: async (newPost) => { // If the mutation is successful
            const queryFilter = { // Create a new query filter
                queryKey: ["post-feed"], // Set the query key to "post-feed"
                predicate(query: Query<InfiniteData<PostsPage, string | null>, Error, InfiniteData<PostsPage, string | null>, readonly unknown[]>) { // Create a new predicate function
                    return ( // Return a boolean value
                        query.queryKey.includes("for-you") || // Check if the query key includes "for-you"
                        (query.queryKey.includes("user-posts") && // Check if the query key includes "user-posts" and
                            query.queryKey.includes(user.id)) // the user ID
                    );
                },
            }

            // Cancel the queries that match the query filter
            await queryClient.cancelQueries(queryFilter);

            // Set the queries data
            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter, // Set the query filter
                (oldData) => { // Create a new function
                    const firstPage = oldData?.pages[0]; // Get the first page of the old data

                    // If the first page exists
                    if (firstPage) {
                        return {
                            pageParams: oldData.pageParams, // Set the page parameters
                            pages: [ // Set the pages
                                {
                                    posts: [{ ...newPost, isLikedByUser: false }, ...firstPage.posts], // Add the new post to the first page with isLikedByUser property
                                    nextCursor: firstPage.nextCursor, // Set the next cursor
                                },
                                ...oldData.pages.slice(1), // Add the remaining pages
                            ],
                        };
                    }
                },
            );

            // Invalidate the queries that match the query filter
            queryClient.invalidateQueries({ // Invalidate the queries
                queryKey: queryFilter.queryKey, // Set the query key
                predicate(query) { // Create a new predicate function
                    return queryFilter.predicate(query as Query<InfiniteData<PostsPage, string | null>, Error, InfiniteData<PostsPage, string | null>, readonly unknown[]>) && !query.state.data; // Return a boolean value based on the query state data and the query filter predicate function 
                },
            });

            toast.success("Post created successfully"); // Display a success toast
        },
        onError(error) {
            console.error(error);
            toast.error("Failed to post. Please try again.")// Display an error toast)
        },
    });

    return mutation;
}