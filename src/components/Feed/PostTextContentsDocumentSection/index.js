"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEllipsisH, FaShareAlt } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import axios from "axios";
import Modal from "../Sharepopup/Model";

const API_BASE_URL = "https://modewelt-backend.onrender.com/api";

const PostCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(10);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(["Great post, very helpful!"]);
  const [newComment, setNewComment] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [token, setToken] = useState(null);

  const postId = "677247db3960307d3c356691"; // Replace with actual post ID

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

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
        setComments(commentResponse.data.comments || []);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId, token]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/likes/likeDislike`,
        { postId, liked: !liked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikeCount(response.data.likeCount);
      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/comments/addComment`,
          { postId, comment: newComment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(response.data.comments || []);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleComments = () => setShowComments(!showComments);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const documentItems = [
    { title: "Fashion guidelines for Illustration designers", fileSize: "324 kb" },
    { title: "Fashion guidelines for Graphic Designer", fileSize: "245 kb" },
  ];

  return (
    <div className="bg-white min-h-fit pb-2 my-4 rounded-[4px]">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <p className="text-sm font-bold text-[#181818]">High rated post from your feed</p>
        <FaEllipsisH
          className="text-[#181818] hover:text-primary cursor-pointer w-[20px] h-[24px]"
          onClick={togglePopup}
        />
        {isPopupOpen && (
          <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 shadow-lg rounded-lg z-10">
            <button className="block px-4 py-2 text-sm hover:bg-gray-100">Report Post</button>
            <button className="block px-4 py-2 text-sm hover:bg-gray-100">Connect</button>
            <button className="block px-4 py-2 text-sm hover:bg-gray-100">Not Interested</button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#F4F4F4] mb-3" />

      {/* User Info */}
      <div className="flex items-center mt-3 px-8">
        <Image src="/assets/feed/profile.png" alt="Profile" width={52} height={52} className="rounded-full" />
        <div>
          <h1 className="text-sm font-bold">Nikhil Gupta</h1>
          <span className="text-xs text-gray-500">Senior Fashion Designer</span>
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-600 mt-4 px-8">
        <p>There are some new guidelines for Fashion Designers</p>
        <div className="mt-3">
          {documentItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-[#FFE3EF] p-4 rounded-lg mb-2">
              <div className="flex">
                <Image width={42} height={42} src="/assets/feed/document.png" alt="Document" />
                <div className="ml-4">
                  <p>{item.title}</p>
                  <span>{item.fileSize}</span>
                </div>
              </div>
              <Image width={24} height={24} src="/assets/feed/download.png" alt="Download" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center px-9 my-4">
        <div className="flex gap-16">
          <div className="flex items-center cursor-pointer" onClick={handleLikeClick}>
            {liked ? <BiSolidLike size={20} className="text-[#a35285]" /> : <BiLike size={20} className="text-[#a35285]" />}
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={toggleComments}>
            <Image src="/assets/feed/comment.png" alt="Comment" width={16} height={16} />
            <span>{comments.length}</span>
          </div>
        </div>
        <div className="flex items-center cursor-pointer" onClick={openModal}>
          <FaShareAlt className="text-primary text-[20px]" />
          <span>SHARE</span>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-8 mt-4 space-y-3">
          {comments.map((comment, index) => (
            <p key={index} className="text-sm text-gray-700 border-b pb-2 bg-white">
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

      {/* Share Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default PostCard;
