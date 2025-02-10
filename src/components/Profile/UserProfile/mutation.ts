import { PostsPage } from "@/lib/types"; // Import the PostsPage type from the types file
import { useUploadThing } from "@/lib/uploadthing"; // Import the useUploadThing hook from the uploadthing file
import { UpdateUserProfileValues } from "@/lib/validation"; // Import the UpdateUserProfileValues type from the validation file
import {
    InfiniteData, // Import the InfiniteData type from the react-query library
    QueryFilters, // Import the QueryFilters type from the react-query library
    useMutation, // Import the useMutation hook from the react-query library
    useQueryClient, // Import the useQueryClient hook from the react-query library
} from "@tanstack/react-query"; // Import the react-query hooks from the tanstack library
import { useRouter } from "next/navigation"; // Import the useRouter hook from the next/navigation module
import { updateUserProfile } from "./actions"; // Import the updateUserProfile function from the actions file

// Define the useUpdateProfileMutation hook
export function useUpdateProfileMutation() {
    const router = useRouter(); // Get the router object using the useRouter hook
    const queryClient = useQueryClient(); // Get the queryClient object using the useQueryClient hook
    const { startUpload: startAvatarUpload } = useUploadThing("avatar"); // Get the startUpload function for avatar uploads using the useUploadThing hook
    const { startUpload: startBackgroundUpload } = useUploadThing("backgroundImage"); // Get the startUpload function for background uploads using the useUploadThing hook

    const mutation = useMutation({
        mutationFn: async ({ values, avatar, backgroundImage }: { values: UpdateUserProfileValues; avatar?: File; backgroundImage?: File; }) => {
            console.log("Mutation values:", values);

            // Ensure `values` is passed correctly
            const profileUpdate = updateUserProfile(values); // Call the updateUserProfile function with the values
            const avatarUpload = avatar ? startAvatarUpload([avatar]) : null; // Call the startAvatarUpload function with the avatar file if it exists
            const backgroundUpload = backgroundImage ? startBackgroundUpload([backgroundImage]) : null; // Call the startBackgroundUpload function with the background file if it exists

            return Promise.all([profileUpdate, avatarUpload, backgroundUpload]); // Return a Promise that resolves when both profileUpdate and avatarUpload are complete
        },
        onSuccess: async ([updatedUser, uploadResult, backgroundResult]) => { // Define the onSuccess callback function
            // Get the new avatar URL from the upload result or the updated user object
            const newAvatarUrl = uploadResult?.[0]?.serverData?.avatarUrl || updatedUser.avatarUrl;

            // Get the new background URL from the upload result or fallback to existing
            const newBackgroundUrl = backgroundResult?.[0]?.serverData?.backgroundImageUrl || updatedUser.backgroundImageUrl;
            // Define the queryFilter object for the post-feed query
            const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>, Error, InfiniteData<PostsPage, string | null>, readonly unknown[]> = {
                queryKey: ["post-feed"], // Set the query key to "post-feed"
            };

            // Cancel the post-feed query using the query
            await queryClient.cancelQueries(queryFilter);

            // Update the post-feed query data with the updated user data
            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter, // Set the query filter 
                (oldData) => { // If the old data exists
                    if (!oldData) return; // Return if the old data does not exist

                    return {
                        pageParams: oldData.pageParams, // Set the pageParams to the old data pageParams
                        pages: oldData.pages.map((page) => ({ // Map over the old data pages
                            nextCursor: page.nextCursor, // Set the nextCursor to the page nextCursor
                            posts: page.posts.map((post) => { // Map over the page posts
                                if (post.user.id === updatedUser.id) { // If the post user ID matches the updated user ID
                                    return { // Return the updated post object
                                        ...post, // Spread the post object
                                        user: { 
                                            ...updatedUser, // Spread the updated user object
                                            avatarUrl: newAvatarUrl, // Update avatar URL
                                            backgroundImageUrl: newBackgroundUrl, // Update background URL
                                        }, // Spread the updated user object with the new avatar URL
                                    };
                                }
                                return post; // Return the post object if the user ID does not match
                            }),
                        })),
                    };
                },
            );
            router.refresh(); // Refresh the router
        },
        onError(error) {
            console.error("Mutation Error:", error); // Log the mutation error
        },
    });

    return mutation; // Return the mutation object
}
