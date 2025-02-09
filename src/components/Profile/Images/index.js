"use client";
import { useState } from 'react';
import Image from "next/image";

export default function Posts() {
    const [showAll, setShowAll] = useState(false);

    // Data for the posts with images
    const posts = [
        { id: 1, title: "Post 1", description: "This is a description for post 1", image: "/assets/profile/a.jpg" },
        { id: 2, title: "Post 2", description: "This is a description for post 2", image: "/assets/profile/a.jpg" },
        { id: 3, title: "Post 3", description: "This is a description for post 3", image: "/assets/profile/a.jpg" },
        { id: 4, title: "Post 4", description: "This is a description for post 4", image: "/assets/profile/a.jpg" },
        { id: 5, title: "Post 5", description: "This is a description for post 5", image: "/assets/profile/a.jpg" },
        { id: 6, title: "Post 6", description: "This is a description for post 6", image: "/assets/profile/a.jpg" },
        { id: 7, title: "Post 7", description: "This is a description for post 7", image: "/assets/profile/a.jpg" },
        { id: 8, title: "Post 8", description: "This is a description for post 8", image: "/assets/profile/a.jpg" },
        // You can add more posts as needed
    ];

    // Toggle to show all posts
    const togglePosts = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.slice(0, showAll ? posts.length : 4).map((post) => (
                    <div key={post.id} className="relative group cursor-pointer">
                        {/* Image Block */}
                        <div className="w-full h-[180px] bg-[#D9D9D9] rounded-lg flex justify-center items-center">
                            <Image
                                src={post.image} // Using path relative to the public folder
                                alt={post.title}
                                width={180}
                                height={180}
                                className="object-cover rounded-lg"
                            />
                        </div>
                        {/* Post Text */}
                        <div className="w-full mt-2">
                            <p className="text-[12px] text-gray-800 font-semibold">{post.title}</p>
                            <p className="text-[10px] text-gray-600">{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* See All Post Button */}
            <hr className="mt-4" />
            <div className="text-center mt-4">
                <button
                    onClick={togglePosts}
                    className="w-full text-[#a35284] font-medium text-sm px-6 py-3 rounded transition-all duration-300 hover:bg-[#a35284] hover:text-white focus:outline-none"
                >
                    {showAll ? "SEE LESS POST" : "SEE ALL POST"}
                </button>
            </div>
        </div>
    );
}
