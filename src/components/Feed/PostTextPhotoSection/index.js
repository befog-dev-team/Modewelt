"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { FaEllipsisH, FaShareAlt } from "react-icons/fa";
import Modal from "../Sharepopup/Model";
import { BiLike, BiSolidLike } from "react-icons/bi";
import toast from "react-hot-toast";

const API_BASE_URL = "https://modewelt-backend.onrender.com/api";
const postId = "678a31ee730784476cde2e38"; // Replace with the actual post ID

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [token, setToken] = useState(null);

  // Fetch token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Fetch post data
  useEffect(() => {
    const fetchPostData = async () => {
      if (!token) return;

      try {
        const [likeResponse, commentResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/likes/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/comments/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setLikeCount(likeResponse.data.likeCount);
        setLiked(likeResponse.data.liked);
        setComment(commentResponse.data.comments || []);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [token]);

  // Like or dislike post
  const handleLikeClick = async () => {
    if (!token) return toast.error("You must be logged in to like posts.");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/likes/likeDislike`,
        { postId, liked: !liked },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLikeCount(response.data.likeCount);
      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error updating like:", error);
      toast.error("Failed to update like. Please try again.");
    }
  };

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/comments/addComment`,
        { postId, comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComment(response.data.comments || []);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleOptions = () => setIsOptionsOpen((prev) => !prev);
  const handleCommentsToggle = () => setShowComments((prev) => !prev);

  return (
    <div className="bg-white mx-auto my-4 rounded-md shadow-md w-full max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <p className="text-xs sm:text-sm md:text-base leading-4">
          <span className="text-[#A45286]">Audrey Alexander</span> commented
          this
        </p>
        <div className="relative">
          <FaEllipsisH
            className="text-[#181818] hover:text-primary cursor-pointer w-[20px] h-[24px]"
            onClick={toggleOptions}
          />
          {isOptionsOpen && (
            <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 shadow-lg rounded-lg z-10">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Report Post
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Connect
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Not Interested
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-3"></div>

      {/* User Info */}
      <div className="flex items-center mt-3 space-x-4 px-4 sm:px-8">
        <Image
          src="/assets/feed/profile.png"
          alt="Profile"
          width={52}
          height={52}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="text-sm sm:text-base font-semibold">Prashant</h1>
          <span className="text-xs sm:text-sm text-gray-500">
            Product Designer at Fashionista
          </span>
        </div>
      </div>

      <div className="mt-1 text-gray-600 px-4 sm:px-8">
        <p className="text-sm sm:text-base">How’s your day going, guys?</p>
      </div>

      <div className="mt-5">
        <Image
          src="/assets/feed/bc.png"
          alt="Post Image"
          width={800}
          height={300}
          className="object-cover mx-auto w-full h-auto rounded"
        />
      </div>

      <div className="w-full h-px bg-gray-200 mt-4 mb-3"></div>

      {/* Stats */}
      <div className="flex justify-between items-center pb-4 px-4 sm:px-8">
        <div className="flex gap-8">
          <div className="flex items-center space-x-2">
            {liked ? (
              <BiSolidLike
                size={20}
                className="cursor-pointer text-[#a35285]"
                onClick={handleLikeClick}
              />
            ) : (
              <BiLike
                size={20}
                className="cursor-pointer text-[#a35285]"
                onClick={handleLikeClick}
              />
            )}
            <span className="text-sm sm:text-base font-semibold">
              {likeCount}
            </span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleCommentsToggle}
          >
            <Image
              src="/assets/feed/comment.png"
              alt="comment"
              width={13}
              height={13}
              className="w-4 h-4"
            />
            <span className="text-sm sm:text-base font-semibold">
              {comment.length}
            </span>
          </div>
        </div>

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={openModal}
        >
          <FaShareAlt className="text-primary text-lg" />
          <span className="text-sm font-semibold text-gray-800">SHARE</span>
        </div>
      </div>

      {showComments && (
        <div className="px-4 sm:px-8 mt-4 space-y-3">
          {comment.map((comment, index) => (
            <p
              key={index}
              className="text-sm sm:text-base text-gray-700 border-b pb-2 bg-white"
            >
              {comment}
            </p>
          ))}
          <div className="flex min-h-fit flex-col sm:flex-row gap-2 pb-4">
            <textarea
              className="w-full p-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-2 focus:ring-[#9c4a81] resize-none"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="1"
              aria-label="Write a comment"
            ></textarea>
            <button
              className="px-4 py-2 text-white bg-[#bb679c] rounded hover:bg-[#9c4a81] focus:outline-none focus:ring-2 focus:ring-[#9c4a81] whitespace-nowrap flex-shrink-0"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Post;
