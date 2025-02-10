"use client";
import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { BsFillSendFill } from "react-icons/bs";
import { FaEllipsisH, FaThumbsUp, FaComment, FaShareAlt } from "react-icons/fa";
import Image from "next/image";

const Post = () => {
  // const [commentData, setCommentData] = useState([])
  const [openComment, setOpenComment] = useState(false)


  const handleOpenCloseComment = () => {
    setOpenComment(!openComment)

  }



  return (
    <div className="flex justify-center min-h-screen mt-12 ml-[0.7rem] space-x-8">
      {/* Left Section */}
      <div className="flex  flex-col">
        {/* New Post Section */}
        <div className="bg-white border w-[850px] h-[135px] shadow-lg p-6 my-4">
          <div className="flex items-center space-x-4">
            <p className="text-md font-semibold text-[#181818]">NEW POST</p>
          </div>
          <div className="h-1 w-full mt-4 bg-gray-300 mb-4"></div>
          <div className="mt-4 flex items-center justify-between text-gray-600">
            <input
              type="text"
              placeholder="What's on your mind?"
              className="flex-grow mt-2 p-2 rounded-md focus:outline-none"
            />
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center justify-center rounded-lg cursor-pointer w-10 h-10">
                <GrAttachment className="text-xl" />
              </div>
              <CiImageOn className="text-xl h-10 cursor-pointer" />
              <CiVideoOn className="text-xl h-10 cursor-pointer" />
              <div className="flex items-center justify-center w-10 h-10 bg-[#E188C1] rounded-lg cursor-pointer">
                <BsFillSendFill className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Sort By Section */}
        <div className="flex justify-center items-center my-4">
          <p>
            SORT BY{" "}
            <span className="font-semibold text-[#A45286]">Trending</span>
          </p>
        </div>
        {/* Post Section */}
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="bg-white w-[850px] h-[532px] shadow-lg p-6 my-4"
          >
            <div className="flex justify-between items-center">
              <p className="text-xs">
                <span className="text-[#A45286]">Ted Bell, Annette Nguyen</span>{" "}
                and
                <span className="text-[#A45286]"> Cody Hawkins</span> liked this
              </p>
              <FaEllipsisH className="text-gray-700 hover:text-primary text-[20px]" />
            </div>
            <div className="flex items-center mt-6 space-x-4">
              <Image
                width={250}
                height={160}
                src="/profile.png"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold">Adity Kumar</h1>
                <span>Illustration Designer</span>
              </div>
            </div>

            <div className="mt-4 text-gray-600">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
                placeat aperiam odio sapiente voluptates est...
              </p>
              <div className="mt-4">
                <Image
                  width={250}
                  height={160}
                  src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
                  alt="Post Image"
                  className="object-cover w-full h-60"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-3">
                  <FaThumbsUp className="text-primary text-[20px]" />
                  <span>28</span>
                </div>
                <div className="flex items-center space-x-3" >
                  <FaComment className="text-primary text-[20px] cursor-pointer" onClick={handleOpenCloseComment} />
                  <span>79</span>

                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaShareAlt className="text-primary text-[20px]" />
                <span>SHARE</span>
              </div>
            </div>
          </div>
        ))}

        <div
          key={index}
          className="bg-white w-[850px] h-[402px] shadow-lg p-6 my-4"
        >
          <div className="flex justify-between items-center">
            <p className="text-xs">
              <span className="text-[#A45286]">Ted Bell, Annette Nguyen</span>{" "}
              and
              <span className="text-[#A45286]"> Cody Hawkins</span> liked this
            </p>
            <FaEllipsisH className="text-gray-700 hover:text-primary text-[20px]" />
          </div>
          <div className="flex items-center mt-6 space-x-4">
            <Image
              width={250}
              height={160}
              src="/profile.png"
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
            <div>
              <h1 className="text-xl font-semibold">Aditya Kumar</h1>
              <span>Illustration Designer</span>
            </div>
          </div>

          <div className="mt-4 text-gray-600">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
              placeat aperiam odio sapiente voluptates est...
            </p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-3">
                <FaThumbsUp className="text-primary text-[20px]" />
                <span>28</span>
              </div>
              <div className="flex items-center space-x-3 ">
                <FaComment className="text-primary text-[20px]" />
                <span>79</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaShareAlt className="text-primary text-[20px]" />
              <span>SHARE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="shadow-md mt-5 w-[290px] h-[1400px] ">
        {/* Profile Section */}
        <div className="bg-white w-[290px] h-[280px] text-center p-6 shadow-lg mb-3">
          <Image
            width={250}
            height={160}
            src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
            alt="Cover"
            className="w-full h-[12px] object-cover mb-4"
          />
          <div className="relative w-[100px] h-[100px]">
            <Image
              width={250}
              height={160}
              src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
              alt="Profile"
              className="w-[100px] h-[100px] rounded-full border-4 border-white -mt-12 mx-auto" // Centering the image horizontally
            />
          </div>
          <div className="mt-2 font-bold">Befog website</div>
          <p className="text-gray-600">
            Description Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>

        {/* Write an Article */}
        <div className="flex justify-center p-4 shadow-lg mb-3">
          <button
            className="rounded-md py-2 px-4 w-3/5 font-bold text-white shadow-lg"
            style={{
              background: "linear-gradient(0deg, #A45286 0%, #DC85BC 100%)",
            }}
          >
            Write an article
          </button>
        </div>

        {/* My Groups Section */}
        <div className="bg-white p-4 shadow-lg mb-3">
          <p className="font-bold">My Groups</p>
          <hr className="border-t border-gray-300 mt-2" />
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center p-3 space-x-3">
              <Image
                width={250}
                height={160}
                src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
                alt="Group"
                className="w-12 h-12 rounded-full"
              />
              <p className="font-medium">
                Fashion Designing University, Lucknow
              </p>
            </div>
          ))}
        </div>

        {/* Followed Hashtags Section */}
        <div className="bg-white p-4 shadow-lg mb-3">
          <p className="font-semibold">Followed Hashtags</p>
          <hr className="border-t border-gray-300 mt-2" />
          <div className="flex flex-wrap space-x-2">
            {["#Design", "#Fashion", "#Technology"].map((tag, index) => (
              <button
                key={index}
                className="rounded-md bg-[#FFE3EF] py-2 px-4 text-slate-600 text-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Articles Section */}
        <div className="bg-white p-4 shadow-lg">
          <p className="font-bold">Trending Articles</p>
          <hr className="border-t border-gray-300 mt-2" />
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center p-3 space-x-3">
              <Image
                width={250}
                height={160}
                src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
                alt="Trending Article"
                className="w-16 h-12"
              />
              <p className="font-medium">
                Fashion Designing University, Lucknow
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
