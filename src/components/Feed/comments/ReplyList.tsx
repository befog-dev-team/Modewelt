
//NOT USED YET
// "use client";

// import { useState } from "react";
// import { CommentData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { useSession } from "@/app/(main)/SessionProvider";
// import Link from "next/link";
// import UserAvatar from "@/components/UserAvatar";
// import { BiLike } from "react-icons/bi";
// import { FaReply } from "react-icons/fa";
// import CommentMoreButton from "@/components/Feed/comments/CommentMoreButton";

// interface ReplyListProps {
//   commentId: string;
//   replies: CommentData[];
//   depth?: number; // Track nesting depth
// }

// export default function ReplyList({ commentId, replies, depth = 0 }: ReplyListProps) {
//   const { user } = useSession();
//   const [likes, setLikes] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [loadingReplies, setLoadingReplies] = useState(false);
//   const [newReply, setNewReply] = useState("");
//   const [showReply, setShowReply] = useState(false);

//   const handleLike = async (replyId: string) => {
//     const res = await fetch(`/api/comments/${replyId}/likes`, { method: "POST" });
//     const data = await res.json();
//     if (data.success) {
//       setLiked(data.liked);
//       setLikes(data.liked ? likes + 1 : likes - 1);
//     }
//   };

//   const handleAddReply = async (parentId: string) => {
//     if (newReply.trim()) {
//       const res = await fetch(`/api/comments/${parentId}/replies`, {
//         method: "POST",
//         body: JSON.stringify({ content: newReply }),
//         headers: { "Content-Type": "application/json" },
//       });

//       const reply = await res.json();

//       if (reply.error) {
//         console.error(reply.error);
//         return;
//       }

//       setNewReply("");
//       setShowReply(false);
//       // Optionally update the replies list here
//     }
//   };

//   const fetchReplies = async () => {
//     if (expanded) {
//       setExpanded(false);
//       return;
//     }
//     setLoadingReplies(true);
//     const res = await fetch(`/api/comments/${commentId}/replies`);
//     const data = await res.json();
//     // Only set replies if the fetched replies are not empty
//     if (data.length > 0) {
//       setLoadingReplies(false);
//       setExpanded(true);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3 py-3 px-4 border-b">
//       {replies.map((reply) => (
//         <div key={reply.id} className={`flex gap-3 ${depth > 0 ? "ml-6" : ""}`}>
//           <Link href={`/users/${reply.user.username}`}>
//             <UserAvatar avatarUrl={reply.user.avatarUrl} size={40} />
//           </Link>

//           <div className="flex-1">
//             {/* Username, Timestamp, and More Button */}
//             <div className="flex items-center gap-2 text-sm group/comment">
//               <Link href={`/users/${reply.user.username}`} className="font-medium text-gray-800 hover:underline">
//                 {reply.user.displayName}
//               </Link>
//               <span className="text-gray-500 text-xs">{formatRelativeDate(reply.createdAt)}</span>

//               {/* More Button (Delete) - Only visible on hover */}
//               {reply.user.id === user?.id && (
//                 <CommentMoreButton
//                   comment={reply}
//                   className="ml-auto opacity-0 transition-opacity group-hover/comment:opacity-100 "
//                 />
//               )}
//             </div>

//             {/* Comment Content */}
//             <p className="text-sm text-gray-700">{reply.content}</p>

//             {/* Like & Reply Buttons */}
//             <div className="flex space-x-4 mt-2 text-xs font-semibold text-gray-600">
//               <button
//                 onClick={() => handleLike(reply.id)}
//                 className={`flex items-center space-x-1 hover:text-[#a35285] ${liked ? "text-[#a35285]" : ""}`}
//               >
//                 <BiLike size={14} />
//                 <span>Like {likes > 0 ? `(${likes})` : ""}</span>
//               </button>
//               <button onClick={() => setShowReply(!showReply)} className="hover:text-[#a35285]">
//                 Reply
//               </button>
//             </div>

//             {/* Reply Input */}
//             {showReply && (
//               <div className="mt-2">
//                 <textarea
//                   className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#9c4a81] resize-none"
//                   placeholder="Write a reply..."
//                   value={newReply}
//                   onChange={(e) => setNewReply(e.target.value)}
//                   rows={1}
//                 ></textarea>
//                 <button
//                   className="mt-1 px-3 py-1 text-white bg-[#bb679c] rounded hover:bg-[#9c4a81]"
//                   onClick={() => handleAddReply(reply.id)}
//                 >
//                   Reply
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Expand/Collapse Replies */}
//       {replies.length > 0 && (
//         <div className="mt-2">
//           <button onClick={fetchReplies} className="hover:text-[#a35285]">
//             {expanded ? "Hide Replies" : `View Replies (${replies.length})`}
//           </button>
//         </div>
//       )}

//       {/* Loading state */}
//       {loadingReplies && <p className="text-sm text-gray-500">Loading replies...</p>}
//     </div>
//   );
// }
