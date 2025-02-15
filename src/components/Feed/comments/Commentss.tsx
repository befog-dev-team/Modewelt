import kyInstance from "@/lib/ky";
import { CommentsPage, PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import Comment from "./Comments";
import CommentInput from "./CommentInput";

interface CommentsProps {
  post: PostData;
}

export default function Comments({ post }: CommentsProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/posts/${post.id}/comments`,
            pageParam ? { searchParams: { cursor: pageParam } } : {}
          )
          .json<CommentsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="space-y-3 ">
      {/* Comment input */}
      <CommentInput  post={post} />
      
      {/* Load previous comments button */}
      {hasNextPage && (
        <Button
          variant="link"
          className="mx-auto block text-[#a35285] hover:text-[#9c4a81]"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comments
        </Button>
      )}
      
      {/* Loading spinner */}
      {status === "pending" && <Loader2 className="mx-auto animate-spin text-[#f26744]" />}
      
      {/* No comments message */}
      {status === "success" && !comments.length && (
        <p className="text-center text-muted-foreground">No comments yet.</p>
      )}
      
      {/* Error message */}
      {status === "error" && (
        <p className="text-center text-destructive">
          An error occurred while loading comments.
        </p>
      )}

      {/* Comments section */}
      <div className="divide-y divide-[#e1d9d9]">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={post.id} />
        ))}
      </div>
    </div>
  );
}
