import { CommentsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast"
import { deleteComment, submitComment } from "./actions";

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitComment,
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["comments", postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  previousCursor: firstPage.previousCursor,
                  comments: [...firstPage.comments, newComment],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Comment created",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to submit comment. Please try again.",
      });
    },
  });

  return mutation;
}

export function useDeleteCommentMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (deletedComment) => {
      const queryKey: QueryKey = ["comments", deletedComment.postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              previousCursor: page.previousCursor,
              comments: page.comments.filter((c) => c.id !== deletedComment.id),
            })),
          };
        },
      );

      toast({
        description: "Comment deleted",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete comment. Please try again.",
      });
    },
  });

  return mutation;
}


//NOT USED YET
// export function useSubmitReplyMutation(commentId: string, parentId: string, userId: string) {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: async ({ content }: { content: string }) => {
//       const res = await fetch(`/api/comments/${commentId}/replies`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit reply");
//       }

//       return res.json();
//     },
//     onSuccess: async (newReply) => {
//       const queryKey: QueryKey = ["comment-replies", commentId];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           const firstPage = oldData?.pages[0];

//           if (firstPage) {
//             return {
//               pageParams: oldData.pageParams,
//               pages: [
//                 {
//                   previousCursor: firstPage.previousCursor,
//                   comments: [...firstPage.comments, newReply], // Add reply to the first page
//                 },
//                 ...oldData.pages.slice(1),
//               ],
//             };
//           }
//         }
//       );

//       queryClient.invalidateQueries({
//         queryKey,
//         predicate(query) {
//           return !query.state.data;
//         },
//       });

//       toast({
//         description: "Reply posted successfully!",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to submit reply. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }