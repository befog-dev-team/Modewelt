"use client";
import React, { useState } from "react";
// import { MdEdit } from "react-icons/md";

function Profile() {
    // const [isPopupOpen, setIsPopupOpen] = useState(false);
    // const [aboutText, setAboutText] = useState(
    //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nobis quo veritatis ullam doloribus, earum cupiditate minima provident officia ex eveniet debitis aliquam mollitia fuga praesentium veniam. Iste, illo delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus velit eligendi dolorum quae expedita."
    // );
    // const [newText, setNewText] = useState(aboutText);
    const [expanded, setExpanded] = useState(false);

    const trimmedText = aboutText.slice(0, 100);


    return (
        <div className="py-4 flex justify-center items-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <div className="p-4">
                    {/* Title Section */}
                    {/* Post Description */}
                    <div className="mt-2 text-gray-600">
                        <div
                            className={`px-2 mt-2 text-sm leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${
                                expanded ? "max-h-[1000px]" : "max-h-[100px]"
                            }`}
                        >
                            {expanded ? aboutText : trimmedText + "..."}
                        </div>
                        <button
                            className="text-[#A45286] text-sm font-semibold uppercase mt-2"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
