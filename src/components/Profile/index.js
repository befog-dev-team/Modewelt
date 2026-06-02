"use client";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

function Profile({ user, loggedinUserId }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [aboutText, setAboutText] = useState(
        user?.bio || "No bio available."
    );
    const [newText, setNewText] = useState(aboutText);
    const [expanded, setExpanded] = useState(false);

    const trimmedText = aboutText.slice(0, 100);

    const handleEditClick = () => {
        setNewText(aboutText);
        setIsPopupOpen(true);
    };

    const handleSave = async () => {
        // Implementation for saving bio would go here
        // For now, update local state
        setAboutText(newText);
        setIsPopupOpen(false);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="p-4 flex justify-center items-center">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-lg rounded-lg border dark:border-gray-800 transition-colors">
                <div className="p-4">
                    {/* Title Section */}
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-lg dark:text-gray-100">About</h1>
                        {(loggedinUserId === user?.id || user?.role === "ADMIN") && (
                            <div className="cursor-pointer dark:text-gray-400 dark:hover:text-white transition-colors" onClick={handleEditClick}>
                                <MdEdit className="text-lg" />
                            </div>
                        )}
                    </div>

                    <div className="mt-2 text-gray-600 dark:text-gray-400">
                        <div
                            className={`px-2 mt-2 text-sm leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${expanded ? "max-h-[1000px]" : "max-h-[100px]"
                                }`}
                        >
                            {expanded ? aboutText : trimmedText + "..."}
                        </div>
                        <button
                            className="text-[#fc3fb4] text-sm font-semibold uppercase mt-2"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup Section */}
            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-lg w-full max-w-md border dark:border-gray-800">
                        <h2 className="text-lg font-bold mb-4 dark:text-white">Edit About Section</h2>
                        <textarea
                            className="w-full h-[120px] border dark:border-gray-700 bg-transparent dark:text-white p-2 rounded focus:ring-[#fc3fb4] focus:ring-2"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200 px-4 py-2 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#fc3fb4] text-white px-4 py-2 rounded"
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
