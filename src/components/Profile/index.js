"use client";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

function Profile() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [aboutText, setAboutText] = useState(
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nobis quo veritatis ullam doloribus, earum cupiditate minima provident officia ex eveniet debitis aliquam mollitia fuga praesentium veniam. Iste, illo delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus velit eligendi dolorum quae expedita."
    );
    const [newText, setNewText] = useState(aboutText);
    const [expanded, setExpanded] = useState(false);

    const trimmedText = aboutText.slice(0, 100);

    const handleEditClick = () => {
        setNewText(aboutText);
        setIsPopupOpen(true);
    };

    const handleSave = () => {
        setAboutText(newText);
        setIsPopupOpen(false);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="p-4 flex justify-center items-center">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg">
                <div className="p-4">
                    {/* Title Section */}
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-lg">About</h1>
                        <div className="cursor-pointer" onClick={handleEditClick}>
                            <MdEdit className="text-lg" />
                        </div>
                    </div>

                    {/* Post Description */}
                    <div className="mt-2 text-gray-600">
                        <div
                            className={`px-2 mt-2 text-sm leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${expanded ? "max-h-[1000px]" : "max-h-[100px]"
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

            {/* Popup Section */}
            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Edit About Section</h2>
                        <textarea
                            className="w-full h-[120px] border p-2 rounded focus:ring-[#A45286] focus:ring-2"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#A45286] text-white px-4 py-2 rounded"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
