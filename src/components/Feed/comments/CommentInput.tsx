import { PostData } from "@/lib/types";
import { Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useSubmitCommentMutation } from "./mutations";

interface CommentInputProps {
  post: PostData;
}

export default function CommentInput({ post }: CommentInputProps) {
  const [input, setInput] = useState("");

  const mutation = useSubmitCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-3 py-2 px-4 border-b" onSubmit={onSubmit}>
      <Input 
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#9c4a81] focus:border-transparent placeholder:text-gray-500"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={!input.trim() || mutation.isPending}
        className="hover:text-[#fcf9fb] bg-[#a65687] hover:bg-[#8c4a74] text-white disabled:bg-[#d6a6c4] disabled:opacity-50 transition-colors duration-200 rounded-lg shadow-md"
      >
        {!mutation.isPending ? (
          <SendHorizonal />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </form>
  );
}