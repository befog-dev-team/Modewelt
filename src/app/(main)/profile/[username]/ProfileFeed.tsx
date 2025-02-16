"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/Feed/Post";
import PostsLoadingSkeleton from "./ProfilePostLoadingSkelton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface UserPostsProps {
    userId: string;
}

export default function UserPosts({ userId }: UserPostsProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "user-posts", userId],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    `/api/profile/${userId}/posts`,
                    pageParam ? { searchParams: { cursor: pageParam } } : {},
                )
                .json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const posts = data?.pages.flatMap((page) => page.posts) || [];

    if (status === "pending") {
        return (
            <div className="space-y-5 mt-12">
                <PostsLoadingSkeleton />
            </div>
        )
    }

    if (status === "success" && !posts.length && !hasNextPage) {
        return (
            <p className="mt-12 text-center text-muted-foreground">
                This user hasn&apos;t posted anything yet.
            </p>
        );
    }

    if (status === "error") {
        return (
            <p className="mt-12 text-center text-destructive">
                An error occurred while loading posts.
            </p>
        );
    }

    return (
        <InfiniteScrollContainer
            className="space-y-5 mt-12"
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
            {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
        </InfiniteScrollContainer>
    );
}