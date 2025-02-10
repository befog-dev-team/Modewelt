import { validateRequest } from "@/auth"; // Import the validateRequest function
import prisma from "@/lib/prisma"; // Import the Prisma client
import { getUserDataSelect } from "@/lib/types"; // Import the getUserDataSelect function
import { notFound } from "next/navigation"; // Import the notFound function
import { cache } from "react"; // Import the cache function
import UserProfileWrappper from "@/components/Profile/UserProfileWrappper"; // Import the UserProfileWrappper component

// Define a cache function to cache the getUser function
const getUser = cache(async (username, loggedInUserId) => {
    const user = await prisma.user.findFirst({ // Find the first user
        where: { // Find the user where the username matches
            username: { // The username field
                equals: username, // Find the user by username
                mode: "insensitive", // Case-insensitive search
            },
        },
        select: getUserDataSelect(loggedInUserId), // Select the user data with the getUserDataSelect function
    });

    if (!user) notFound(); // If the user doesn't exist, return a 404 error

    // Check if the logged-in user is NOT the profile owner
    if (loggedInUserId !== user.id) {
        // Check if the profile view already exists
        const existingProfileView = await prisma.profileView.findFirst({ // Find the first profile view
            where: {
                viewerId: loggedInUserId, // The viewer ID
                viewedId: user.id, // The viewed ID
            },
        });

        // If the profile view doesn't exist, create a new one
        if (!existingProfileView) {
            await prisma.profileView.create({
                data: {
                    viewerId: loggedInUserId, // The viewer ID
                    viewedId: user.id, // The viewed ID
                },
            });

            // Only increment profile views if the logged-in user is NOT the profile owner
            await prisma.user.update({
                where: { id: user.id }, // Update the user
                data: { totalProfileViews: { increment: 1 } }, // Increment the total profile views by 1
            });

            // Send a notification to the profile owner
            await prisma.notification.create({
                data: {
                    issuerId: loggedInUserId, // Set the issuerId field to the logged in user's ID
                    recipientId: user.id, // Set the recipientId field to the post owner's ID
                    type: 'PROFILE_VIEW', // Set the type field to 'PROFILE_VIEW'
                    read: false, // Set the read field to false
                },
            });
        }
    }

    // Calculate total likes and comments received by the user's posts
    const totalLikesReceived = user.posts.reduce( // Reduce the posts array
        (sum, post) => sum + post._count.likes, // Sum the likes count
        0
    );

    const totalCommentsReceived = user.posts.reduce(
        (sum, post) => sum + post._count.comments, // Sum the comments count
        0
    );

    // Update the user's total likes and comments
    await prisma.user.update({
        where: { id: user.id }, // Update the user
        data: { // Update the user data
            totalLikes: totalLikesReceived, // Set the totalLikes field to the totalLikesReceived value
            totalComments: totalCommentsReceived, // Set the totalComments field to the totalCommentsReceived
        },
    });

    // Return the user with stats
    const userWithStats = {
        ...user, // Spread the user data
        totalLikesReceived, // Add the totalLikesReceived field
        totalCommentsReceived, // Add the totalCommentsReceived field
        visitors: user.profileViewedUser.map((profileView) => profileView.viewer), // Extract the visitor data
    };

    return userWithStats; // Return the user with stats
});

// Define a function to generate the metadata
export async function generateMetadata(props) {
    const params = await props.params // Destructure params from props
    const { username } = params; // Destructure username from params

    const { user: loggedInUser } = await validateRequest(); // Validate the request

    if (!loggedInUser) return {}; // If the user is not logged in, return an empty object

    const user = await getUser(username, loggedInUser.id); // Fetch the user

    // Return the metadata
    return {
        title: `@${user.username}`, // The title is the user's username
    };
}

// Define the Page component
export default async function Page(props) {
    const params = await props.params;
    const { username } = params; // Destructure username from params

    const { user: loggedInUser } = await validateRequest(); // Validate the request

    if (!loggedInUser) {
        // If the user is not logged in
        return (
            <p className="text-destructive">
                You&apos;re not authorized to view this page.
            </p>
        );
    }

    // Fetch the user
    const user = await getUser(username, loggedInUser.id);

    return (
        <div>
            <UserProfileWrappper
                user={user}
                loggedinUserId={loggedInUser.id}
                totalLikesReceived={user.totalLikesReceived}
                totalCommentsReceived={user.totalCommentsReceived}
                visitors={user.visitors}
            />
        </div>
    );
}