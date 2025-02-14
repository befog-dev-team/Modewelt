"use client"; // Use the client-side API

import { PostData } from "@/lib/types"; // Import PostData type
import Image from "next/image"; // Import Image component
import { FaEllipsisH } from "react-icons/fa"; // Import icons
// import { BiLike } from "react-icons/bi"; // Import icons
import Modal from "../Sharepopup/Model"; // Import Modal component
import { useState } from "react"; // Import useState hook
import UserAvatar from "@/components/UserAvatar"; // Import UserAvatar component
import Link from "next/link"; // Import Link component
import { cn, formatRelativeDate } from "@/lib/utils"; // Import formatRelativeDate function
import { useSession } from "@/app/(main)/SessionProvider"; // Import useSession hook
import DeletePostDialog from "./DeletePostDialog"; // Import DeletePostDialog component
import { Media } from "@prisma/client";
import { filesize } from "filesize"; // Import filesize function
import { MessageSquare } from "lucide-react";
import Commentss from "@/components/Feed/comments/Commentss";
import LikeButton from "./LikeButton";
import FollowButton from "@/components/FollowButton";
import ShareButton from './ShareButton';

// PostProps interface
interface PostProps {
  post: PostData; // Post data
}

// Post component
export default function Post({ post }: PostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [expanded, setExpanded] = useState(false); // Expanded state
  const [showComments, setShowComments] = useState(false); // Show comments state
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state

  // Get the current user from the session
  const { user } = useSession();

  // Toggle popup
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // text trimming
  const text = `${post.content}`
  const trimmedText = text.substring(0, 340);

  // For Open Delete Post Dialog 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle Delete Click
  const handleDeleteClick = () => {
    setIsDialogOpen(true); // Open the dialog when the "Delete" button is clicked
  };

  // Handle Close Dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div className="bg-white mx-auto my-4 rounded-md shadow-md w-full max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <Link
          href={`/posts/${post.id}`}
          className="block text-sm text-muted-foreground hover:underline"
          suppressHydrationWarning
        >
          <p className="leading-[15px] text-xs font-[Gotham] text-[#181818]">
            Post created by <span className="text-primary">{post.user.displayName}</span> <span className="text-primary">{formatRelativeDate(post.createdAt)}</span>
          </p>
        </Link>
        <div className="relative">
          <FaEllipsisH
            className="text-[#181818] hover:text-primary cursor-pointer w-[20px] h-[24px]"
            onClick={togglePopup}
          />
          {/* Delete Post Button */}
          {isPopupOpen && ( // Display the popup if isPopupOpen is true
            <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 shadow-lg rounded-lg z-10">
              {post.user.id === user.id && ( // Check if the post user ID matches the current user ID
                <button onClick={handleDeleteClick} className="block w-full text-left px-4 py-2 text-sm hover:text-white hover:font-bold hover:bg-red-500">Delete</button>
              )}

              {/* Render DeletePostDialog */}
              <DeletePostDialog
                post={post} // Pass the post data to the DeletePostDialog component
                open={isDialogOpen} // Pass the isDialogOpen state to the DeletePostDialog component
                onClose={handleCloseDialog} // Pass the handleCloseDialog function to the DeletePostDialog component
              />

              {user.id !== post.user.id && (
                <FollowButton
                  userId={post.user.id}
                  initialState={{
                    followers: post.user._count.followers,
                    following: post.user._count.following,
                    hasPendingRequest: false,
                    isFollowedByUser: false,
                    followingId: "",
                    sentRequests: [],
                    receivedRequests: []
                  }}
                />
              )}
              {/* <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Report Post</button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Connect</button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Not Interested</button> */}
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#F4F4F4] mb-3" />

      {/* User Info */}
      <div className="flex items-center mt-3 space-x-4 px-8">
        <Link href={`/profile/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} size={500} />
        </Link>
        <div className="flex flex-col">
          <Link href={`/profile/${post.user.username}`}>
            <h1 className="text-sm font-bold line-clamp-1 break-all hover:underline">{post.user.displayName}</h1>
          </Link>
          <span className="text-xs font-light">{post.user.profileHeadline}</span>
        </div>
      </div>

      {/* Post Description */}
      <div className="mt-1 text-gray-600">
        {post.content.trim() && (
          <div>
            <div
              className={`px-8 mt-4 text-sm transition-all duration-500 ease-in-out overflow-hidden whitespace-pre-line break-words ${expanded ? "max-h-[1000px]" : "max-h-[100px]"
                }`}
            >
              {expanded ? text : trimmedText + "..."}
            </div>
            <button
              className="px-8 my-2 mt-4 text-[#A45286] text-xs font-semibold uppercase cursor-pointer transition-all duration-300"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-5">
        {!!post.attachments.length && (
          <MediaPreviews attachments={post.attachments} />
        )}
      </div>

      <div className="w-full h-[1px] bg-[#F4F4F4] mt-1 mb-3" />

      {/* Stats & Share */}
      <div className="flex justify-between items-center pb-[16px] px-8 mb-4 mt-4">
        <div className="flex gap-12">
          <div className="flex items-center space-x-2">
            <div className="hover:text-[#a35285]">
              <LikeButton postId={post.id} initialState={{
                likes: post._count.likes,
                isLikedByUser: post.likes.some((like) => like.userId === user.id),
              }} />
            </div>
            <div className="hover:text-[#a35285]">
              <CommentButton post={post} onClick={() => setShowComments(!showComments)} />
            </div>
          </div>
        </div>

        {/* Share Button */}
        <ShareButton shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`} />

        {/* <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <FaShareAlt className="text-primary text-lg" />
          <span className="text-sm font-semibold text-gray-800">SHARE</span>
        </div> */}
      </div>

      {/* Comments Section */}
      {showComments && <Commentss post={post} />}

      {/* Share Modal */}
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn( // cn is a utility function to conditionally join class names
        "flex flex-col gap-2 mx-4",
        attachments.length > 1 && "sm:grid sm:grid-cols-1",
      )}
    >
      {attachments.map((m) => (
        <div key={m.id}>
          <MediaPreview media={m} />
        </div>
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  // Add support for image attachments
  if (media.type === "IMAGE") {
    return (
      <Link href={media.url} target="_blank">
        <Image
          src={media.url}
          alt="Attachment"
          width={1000}
          height={1000}
          className="object-cover mx-auto w-500 h-300 rounded border"
        />
      </Link>
    );
  }

  // Add support for video attachments
  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded border"
        />
      </div>
    );
  }

  if (media.type === "PDF") {
    return (
      <div className="flex items-center justify-between bg-[#FFE3EF] p-4 mt-2 rounded mb-2 border">
        <div className="flex">
          <Image width={100} height={100} src="/assets/feed/document.png" alt="Document" className="w-16 h-16" />
          <div className="ml-4">
            <p>{media.fileName}</p>
            <span>{filesize(media.fileSize)}</span>
          </div>
        </div>
        <Link href={media.url} target="_blank">
          <Image width={24} height={24} src="/assets/feed/download.png" alt="Download" />
        </Link>
      </div>
    )
  }

  return <p className="text-destructive flex justify-center items-center text-center">Unsupported media type</p>;
}

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}