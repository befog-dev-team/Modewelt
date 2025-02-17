import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma"; // Import the Prisma client
import { getPostDataInclude } from "@/lib/types";
import { notFound, redirect } from "next/navigation";
import { cache, Suspense } from 'react'
import Post from "@/components/Feed/Post"
import { Loader2 } from "lucide-react";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import Navbar from "@/components/Navbar";
import FollowButton from "@/components/FollowButton";

// getPost is a function that gets a post with the given ID and the user who posted it.
const getPost = cache(async (postId, loggedInUserId) => {
  // Get the post with the given ID, including the user who posted it
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  // If the post does not exist, return a 404 error
  if (!post) notFound();

  // Return the post
  return post;
});

//  generateMetadata is a function that returns the metadata for the page. Make sure generateMetadata spells correctly
export async function generateMetadata(props) {
  const params = await props.params;

  const { postId } = params;

  // Validate the request to ensure the user is authenticated
  const { user } = await validateRequest();

  // If the user is not authenticated, return an empty object
  if (!user) {
    redirect("/auth");
  };

  // Get the post with the given ID and the user who posted it
  const post = await getPost(postId, user.id);

  // Return the title of the post as the page title 50 characters long and if exceeded, add an ellipsis
  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
  };
}

// Import the Post component
export default async function Page(props) {
  const params = await props.params;

  const { postId } = params;

  // Validate the request to ensure the user is authenticated
  const { user } = await validateRequest();

  // If the user is not authenticated, return a message indicating that the user is not authorized to view the page
  if (!user) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  if(!user){
    redirect("/auth");
  }

  // Get the post with the given ID and the user who posted it
  const post = await getPost(postId, user.id);

  return (
    <div>
      <Navbar />
      <main className="flex w-full justify-center min-w-0 gap-5">
        <div className="space-y-5 w-[50vw]">
          <Post post={post} />
        </div>
        <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
          <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
            <UserInfoSidebar user={post.user} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// UserInfoSidebar component
async function UserInfoSidebar({ user }) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return null;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">About this user</div>
      <div>
        <Link
          href={`/profile/${user.username}`}
          className="flex items-center gap-3"
        >
          <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
          <div>
            <p className="line-clamp-1 break-all font-semibold hover:underline">
              {user.displayName}
            </p>
            <p className="line-clamp-1 break-all text-muted-foreground">
              @{user.username}
            </p>
          </div>
        </Link>
      </div>
      <div className="line-clamp-6 whitespace-pre-line break-words text-foreground">
        {user.bio}
      </div>
      {user.id !== loggedInUser.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === loggedInUser.id,
            ),
          }}
        />
      )}
    </div>
  );
}