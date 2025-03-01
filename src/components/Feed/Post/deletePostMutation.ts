import { PostsPage } from "@/lib/types"; // Import the PostsPage type from the types module
import {
    InfiniteData, // Import the InfiniteData type from the react-query module
    QueryFilters, // Import the QueryFilters type from the react-query module
    useMutation, // Import the useMutation hook from the react-query module
    useQueryClient, // Import the useQueryClient hook from the react-query module
} from "@tanstack/react-query"; // Import the react-query functions from the tanstack module
import { usePathname, useRouter } from "next/navigation"; // Import the usePathname and useRouter hooks from the next/navigation module
import { toast } from "react-hot-toast"; // Import the toast function from the react-toastify module
import { deletePost } from "./deletePostActions"; // Import the deletePost function from the deletePostActions module

// Define the useDeletePostMutation function
export function useDeletePostMutation() { 
    // useQueryClient hook from the react-query module
    const queryClient = useQueryClient(); 

    // useRouter hook from the next/navigation module
    const router = useRouter();
    // usePathname hook from the next/navigation module
    const pathname = usePathname();

    // useMutation hook from the react-query module
    const mutation = useMutation({ // Create a new mutation
        mutationFn: deletePost, // Set the mutation function to deletePost
        onSuccess: async (deletedPost) => { // If the mutation is successful
            const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>, Error, InfiniteData<PostsPage, string | null>, readonly unknown[]> = { queryKey: ["post-feed"] }; // Create a new query filter with the query key set to "post-feed"

            // Cancel the queries that match the query filter
            await queryClient.cancelQueries(queryFilter); 

            // Set the queries data to remove the deleted post
            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>( 
                queryFilter, // Set the query filter
                (oldData) => { // Create a new function
                    if (!oldData) return; // If the old data does not exist, return

                    return {
                        pageParams: oldData.pageParams, // Set the page parameters
                        pages: oldData.pages.map((page) => ({ // Map over the pages
                            nextCursor: page.nextCursor, // Set the next cursor
                            posts: page.posts.filter((p) => p.id !== deletedPost.id), // Filter out the deleted post
                        })),
                    };
                },
            );

            // Invalidate the queries that match the query filter
            toast.success("Post deleted successfully.");

            // Redirect to the user's profile page if the post was deleted from the post detail page
            if (pathname === `/posts/${deletedPost.id}`) { // Check if the pathname is the post detail page
                router.push(`/profile/${deletedPost.user.username}`); // Redirect to the user's profile page
            }
        },
        onError(error) {
            console.error(error);
            toast.error("Failed to delete post. Please try again.") // Display an error toast
        },
    });

    return mutation;
}