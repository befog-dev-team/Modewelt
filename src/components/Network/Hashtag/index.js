"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Hashtag() {
    const [hashtags, setHashtags] = useState([]);

    useEffect(() => {
        // Fetch hashtags from the server-side API
        async function fetchHashtags() {
            try {
                const res = await fetch("/api/posts/hashtags");
                const data = await res.json();
                setHashtags(data);
            } catch (error) {
                console.error("Error fetching hashtags:", error);
            }
        }

        fetchHashtags();
    }, []);

    return (
        <div>
            <div>
                {/* Hashtag Heading */}
                <div className="space-x-2 flex items-center">
                    <Image
                        src="/assets/hashtag/hashtag.png"
                        className="max-w-[21px] w-full h-[21px]"
                        height={30}
                        width={30}
                        alt="hashtags icon"
                    />
                    <h2 className="font-[Arial] text-[#A45286] text-[20px] font-[700] uppercase leading-[23px]">
                        Hashtags
                    </h2>
                </div>
                {/* Hashtag Section */}
                <div className="mb-10 mt-6 min-h-[576px] md:min-h-[420px] sm:min-h-[220px] max-w-[843px] w-full bg-[#fff]">
                    <div className="max-w-[843px] w-full flex flex-wrap p-5 items-center mt-4 gap-[0.5rem] rounded-[4px]">
                        {hashtags.map((hashtag) => (
                            <div
                                key={hashtag}
                                className="bg-[#A45286] text-white min-w-[51px] h-[23px] flex justify-center rounded-[4px] items-center py-[4px] px-[14px] text-[12px] font-[Gotham] leading-[13.8px]"
                            >
                                <span className="font-[Arial] font-[700px] text-white text-[12px] leading-[13.8px]">
                                    {hashtag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
