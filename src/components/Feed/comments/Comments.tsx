// "use client";

// import { useState } from "react";
// import { CommentData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { useSession } from "@/app/(main)/SessionProvider";
// import Link from "next/link";
// import UserAvatar from "@/components/UserAvatar";
// import { BiLike } from "react-icons/bi";
// import CommentMoreButton from "@/components/Feed/comments/CommentMoreButton";

// interface CommentProps {
//   comment: CommentData;
//   postId: string;
// }

// export default function Comment({ comment }: CommentProps) {
//   const { user } = useSession();
//   const [likes, setLikes] = useState(0);
//   const [showReply, setShowReply] = useState(false);
//   const [newReply, setNewReply] = useState("");
//   const [replies, setReplies] = useState<string[]>([]);

//   const handleLike = () => setLikes(likes + 1);

//   const handleAddReply = () => {
//     if (newReply.trim() !== "") {
//       setReplies([...replies, newReply]);
//       setNewReply("");
//     }
//   };

//   return (
//     <div className="group/comment flex gap-3 py-3 px-4 border-b">
//       <Link href={`/users/${comment.user.username}`}>
//         <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
//       </Link>
//       <div className="flex-1">
//         <div className="flex items-center gap-2 text-sm">
//           <Link href={`/users/${comment.user.username}`} className="font-medium hover:underline">
//             {comment.user.displayName}
//           </Link>
//           <span className="text-muted-foreground text-xs">
//             {formatRelativeDate(comment.createdAt)}
//           </span>
//         </div>
//         <p className="text-sm text-gray-700">{comment.content}</p>
//         <div className="flex space-x-4 mt-2 text-xs font-semibold text-gray-600">
//           <button onClick={handleLike} className="flex items-center space-x-1 hover:text-[#a35285]">
//             <BiLike size={14} />
//             <span>Like {likes > 0 ? `(${likes})` : ""}</span>
//           </button>
//           <button onClick={() => setShowReply(!showReply)} className="hover:text-[#a35285]">Reply</button>
//         </div>
//         {showReply && (
//           <div className="mt-2">
//             <textarea
//               className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#9c4a81] resize-none"
//               placeholder="Write a reply..."
//               value={newReply}
//               onChange={(e) => setNewReply(e.target.value)}
//               rows={1}
//             ></textarea>
//             <button
//               className="mt-1 px-3 py-1 text-white bg-[#bb679c] rounded hover:bg-[#9c4a81]"
//               onClick={handleAddReply}
//             >
//               Reply
//             </button>
//             {replies.map((reply, index) => (
//               <div key={index} className="mt-2 text-sm text-gray-600 border-l pl-2">
//                 {reply}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {comment.user.id === user.id && (
//         <CommentMoreButton
//           comment={comment}
//           className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { CommentData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { useSession } from "@/app/(main)/SessionProvider";
// import Link from "next/link";
// import UserAvatar from "@/components/UserAvatar";
// import { BiLike } from "react-icons/bi";
// import { FaReply } from "react-icons/fa";
// import CommentMoreButton from "@/components/Feed/comments/CommentMoreButton";

// interface CommentProps {
//   comment: CommentData;
//   postId: string;
// }

// export default function Comment({ comment, postId }: CommentProps) {
//   const { user } = useSession();
//   const [likes, setLikes] = useState(comment.likes.length);
//   const [liked, setLiked] = useState(comment.likes.some((like) => like.userId === user?.id));
//   const [showReply, setShowReply] = useState(false);
//   const [newReply, setNewReply] = useState("");
//   const [replies, setReplies] = useState(comment.replies || []);
//   const [loadingReplies, setLoadingReplies] = useState(false);
//   const [expanded, setExpanded] = useState(false); // To toggle replies

//   const handleLike = async () => {
//     const res = await fetch(`/api/comments/${comment.id}/likes`, { method: "POST" });
//     const data = await res.json();
//     if (data.success) {
//       setLiked(data.liked);
//       setLikes(data.liked ? likes + 1 : likes - 1);
//     }
//   };

//   const handleAddReply = async () => {
//     if (newReply.trim()) {
//       const res = await fetch(`/api/comments/${comment.id}/replies`, {
//         method: "POST",
//         body: JSON.stringify({ content: newReply }),
//       });
//       const reply = await res.json();
//       setReplies([...replies, reply]);
//       setNewReply("");
//       setShowReply(false);
//     }
//   };

//   // Fetch nested replies when expanding
//   const fetchReplies = async () => {
//     if (expanded) {
//       setExpanded(false);
//       return;
//     }

//     setLoadingReplies(true);
//     const res = await fetch(`/api/comments/${comment.id}/replies`);
//     const data = await res.json();
//     setReplies(data);
//     setExpanded(true);
//     setLoadingReplies(false);
//   };

//   return (
//     <div className="group/comment flex flex-col gap-3 py-3 px-4 border-b">
//       <div className="flex gap-3">
//         <Link href={`/users/${comment.user.username}`}>
//           <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
//         </Link>
//         <div className="flex-1">
//           <div className="flex items-center gap-2 text-sm">
//             <Link href={`/users/${comment.user.username}`} className="font-medium hover:underline">
//               {comment.user.displayName}
//             </Link>
//             <span className="text-muted-foreground text-xs">{formatRelativeDate(comment.createdAt)}</span>
//           </div>
//           <p className="text-sm text-gray-700">{comment.content}</p>

//           {/* Like & Reply Buttons */}
//           <div className="flex gap-4 mt-2">
//             <button onClick={handleLike} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
//               <BiLike className={liked ? "text-blue-500" : ""} /> {likes}
//             </button>
//             <button onClick={() => setShowReply(!showReply)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
//               <FaReply /> Reply
//             </button>
//             <button onClick={fetchReplies} className="text-sm text-gray-500 hover:text-black">
//               {expanded ? "Hide Replies" : `View Replies (${comment.replies.length})`}
//             </button>
//           </div>

//           {/* Reply Input */}
//           {showReply && (
//             <div className="mt-2">
//               <input
//                 type="text"
//                 value={newReply}
//                 onChange={(e) => setNewReply(e.target.value)}
//                 placeholder="Write a reply..."
//                 className="w-full p-2 border rounded-md"
//               />
//               <button onClick={handleAddReply} className="mt-2 text-sm text-blue-500">
//                 Post Reply
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Replies */}
//       {expanded && (
//         <div className="ml-12 border-l-2 pl-4 mt-2">
//           {loadingReplies ? (
//             <p className="text-sm text-gray-500">Loading replies...</p>
//           ) : (
//             replies.map((reply) => <Comment key={reply.id} comment={{ ...reply, replies: (reply as CommentData).replies || [] }} postId={postId} />)
//           )}
//         </div>
//       )}

//       {/* More Options */}
//       <CommentMoreButton comment={comment} />
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { CommentData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import { BiLike } from "react-icons/bi";
// import { FaReply } from "react-icons/fa";
import CommentMoreButton from "@/components/Feed/comments/CommentMoreButton";

interface CommentProps {
  comment: CommentData;
  postId: string;
  depth?: number; // Track nesting depth
}

export default function Comment({ comment, postId, depth = 0 }: CommentProps) {
  const { user } = useSession();
  const [likes, setLikes] = useState(comment.likes.length);
  const [liked, setLiked] = useState(comment.likes.some((like) => like.userId === user?.id));
  const [showReply, setShowReply] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLike = async () => {
    const res = await fetch(`/api/comments/${comment.id}/likes`, { method: "POST" });
    const data = await res.json();
    if (data.success) {
      setLiked(data.liked);
      setLikes(data.liked ? likes + 1 : likes - 1);
    }
  };

  const handleAddReply = async () => {
    if (newReply.trim()) {
      const res = await fetch(`/api/comments/${comment.id}/replies`, {
        method: "POST",
        body: JSON.stringify({ content: newReply }),
        headers: { "Content-Type": "application/json" },
      });
  
      const reply = await res.json();
  
      if (reply.error) {
        console.error(reply.error);
        return;
      }
  
      // Ensure reply is added as a nested reply and not as a new comment
      setReplies((prevReplies) => [...prevReplies, reply]);
  
      setNewReply("");
      setShowReply(false);
    }
  };
  

  const fetchReplies = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }
    setLoadingReplies(true);
    const res = await fetch(`/api/comments/${comment.id}/replies`);
    const data = await res.json();
    // Only set replies if the fetched replies are not empty
  if (data.length > 0) {
    setReplies(data);
  }
    setExpanded(true);
    setLoadingReplies(false);
  };

  return (
    <div className={`flex flex-col gap-3 py-3 px-4 border-b ${depth > 0 ? "ml-6" : ""}`}>
      <div className="flex gap-3">
        {/* User Avatar */}
        <Link href={`/users/${comment.user.username}`}>
          <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
        </Link>

        <div className="flex-1">
          {/* Username, Timestamp, and More Button */}
          <div className="flex items-center gap-2 text-sm group/comment">
  <Link href={`/users/${comment.user.username}`} className="font-medium text-gray-800 hover:underline">
    {comment.user.displayName}
  </Link>
  <span className="text-gray-500 text-xs">{formatRelativeDate(comment.createdAt)}</span>

  {/* More Button (Delete) - Only visible on hover */}
  {comment.user.id === user?.id && (
    <CommentMoreButton
      comment={comment}
      className="ml-auto opacity-0 transition-opacity group-hover/comment:opacity-100 "
    />
  )}
</div>

          {/* Comment Content */}
          <p className="text-sm text-gray-700">{comment.content}</p>

          {/* Like & Reply Buttons */}
          <div className="flex space-x-4 mt-2 text-xs font-semibold text-gray-600">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:text-[#a35285] ${liked ? "text-[#a35285]" : ""}`}
            >
              <BiLike size={14} />
              <span>Like {likes > 0 ? `(${likes})` : ""}</span>
            </button>
            {/* <button onClick={() => setShowReply(!showReply)} className="hover:text-[#a35285]">
              Reply
            </button> */}
            {comment.replies.length > 0 && (
              <button onClick={fetchReplies} className="hover:text-[#a35285]">
                {expanded ? "Hide Replies" : `View Replies (${comment.replies.length})`}
              </button>
            )}
          </div>

          {/* Reply Input */}
          {showReply && (
            <div className="mt-2">
              <textarea
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#9c4a81] resize-none"
                placeholder="Write a reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows={1}
              ></textarea>
              <button
                className="mt-1 px-3 py-1 text-white bg-[#bb679c] rounded hover:bg-[#9c4a81]"
                onClick={handleAddReply}
              >
                Reply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {expanded && depth < 2 && (
        <div className="mt-2 border-l-2 pl-4 ml-4">
          {loadingReplies ? (
            <p className="text-sm text-gray-500">Loading replies...</p>
          ) : (
            replies.map((reply) => (
              <Comment key={reply.id} comment={{ ...reply, replies: (reply as CommentData).replies || [] }} postId={postId} depth={depth + 1} />
            ))
          )}
        </div>
      )}
    </div>
  );
}





