// pages/posts.js
"use client";
import { useState } from "react";
import Image from "next/image";
import profileimg from "../../../../public/assets/profile/backgroundImageBackrgound.png"; // Ensure this path is correct
// import { FaEllipsisH } from "react-icons/fa";

export default function PostsPage() {
    const [posts] = useState([
        {
            id: 1,
            author: "Aditya Kumar Kanaujiya",
            time: "1 week",
            image: profileimg,
            content:
                "Lorem ipsum dolor sit amet, #consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet #rutrum libero sed pharetra.",
        },
        {
            id: 2,
            author: "Aditya Kumar Kanaujiya",
            time: "1 week",
            image: profileimg,
            content:
                "Lorem ipsum dolor sit amet, #consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet #rutrum libero sed pharetra.",
        },
        {
            id: 3,
            author: "Jane Doe",
            time: "2 days",
            image: profileimg,
            content:
                "Excited to share my new project! #innovation #design #technology. Stay tuned for more updates.",
        },
        {
            id: 4,
            author: "John Smith",
            time: "3 days",
            image: profileimg,
            content:
                "Just completed a marathon! #fitness #health #achievement. Feeling accomplished and energized.",
        },
    ]);

    const [visiblePosts, setVisiblePosts] = useState(3);
    const [expandedPosts, setExpandedPosts] = useState([]);

    const toggleExpandPost = (postId) => {
        setExpandedPosts((prev) =>
            prev.includes(postId)
                ? prev.filter((id) => id !== postId)
                : [...prev, postId]
        );
    };

    const toggleSeeAll = () => {
        if (visiblePosts < posts.length) {
            setVisiblePosts(posts.length);
        } else {
            setVisiblePosts(3);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                    {posts.slice(0, visiblePosts).map((post) => (
                        <div
                            key={post.id}
                            className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-800">
                                    {post.author} posted this
                                </h3>
                                <span className="text-xs text-gray-500">{post.time}</span>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <Image
                                    src={post.image}
                                    alt="Post Image"
                                    width={100}
                                    height={70}
                                    className="w-24 h-16 object-cover rounded"
                                />
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {post.content.length > 100 && !expandedPosts.includes(post.id)
                                        ? `${post.content.slice(0, 100)}...`
                                        : post.content.split(" ").map((word, i) =>
                                            word.startsWith("#") ? (
                                                <span key={i} className="text-blue-500">
                                                    {word}{" "}
                                                </span>
                                            ) : (
                                                `${word} `
                                            )
                                        )}
                                </p>
                            </div>

                            <div className="text-right">
                                <span
                                    className="text-[#a35284] cursor-pointer text-sm hover:underline"
                                    onClick={() => toggleExpandPost(post.id)}
                                >
                                    {expandedPosts.includes(post.id) ? "see less" : "...see more"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length > 3 && (
                    <div className="text-center mt-4">
                        <button
                            className="w-full text-[#a35284] font-medium text-sm px-4 py-3 rounded transition-all duration-300 hover:bg-[#a35284] hover:text-white"
                            onClick={toggleSeeAll}
                        >
                            {visiblePosts < posts.length ? "SEE ALL POSTS" : "SEE LESS POSTS"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
