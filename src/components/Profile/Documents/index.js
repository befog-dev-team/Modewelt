"use client";
import { useState } from "react";

export default function CommentsSection() {
    const [showAll, setShowAll] = useState(false);

    const comments = [
        { id: 1, name: "Aditya Kumar Kanaujiya", time: "3h", text: "Hey! What's Up?" },
        { id: 2, name: "Aditya Kumar Kanaujiya", time: "3h", text: "Hey! What's Up?" },
        { id: 3, name: "Aditya Kumar Kanaujiya", time: "3h", text: "Hey! What's Up?" },
        { id: 4, name: "Aditya Kumar Kanaujiya", time: "2h", text: "How's it going?" },
        { id: 5, name: "Aditya Kumar Kanaujiya", time: "1h", text: "Nice post!" },
    ];

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="p-4 space-y-4 max-w-3xl mx-auto">
            {/* Render comments, limit to 3 if showAll is false */}
            {comments.slice(0, showAll ? comments.length : 3).map((comment) => (
                <div
                    key={comment.id}
                    className="border-b pb-2 md:pb-4 space-y-1 md:space-y-2"
                >
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                        {comment.name}
                        <span className="text-gray-500 text-xs md:text-sm ml-2">
                            Commented on a post • {comment.time}
                        </span>
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">{comment.text}</p>
                </div>
            ))}

            {/* See All Posts Button */}
            <div className="text-center mt-4">
                <button
                    onClick={toggleShowAll}
                    className="w-full text-[#a35284] font-medium text-sm md:text-base px-4 py-2 rounded transition-all duration-300 hover:bg-[#a35284] hover:text-white"
                >
                    {showAll ? "See Less" : `See All Post (${comments.length})`}
                </button>
            </div>
        </div>
    );
}
