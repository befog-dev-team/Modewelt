"use client";

import { HexColorPicker } from "react-colorful"; // Import the color picker
import {
    Bold,
    Strikethrough,
    Italic,
    Underline,
    Undo,
    Redo,
} from "lucide-react";
import { AiOutlineFontColors } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import { MdOutlineEmojiEmotions, MdOutlineFilePresent } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

const Toolbar = ({ editor }) => {
    const [isColorPickerOpen, setColorPickerOpen] = useState(false);
    const [isLinkInputOpen, setLinkInputOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [tooltip, setTooltip] = useState({ visible: false, url: "", x: 0, y: 0 });

    // Refs for modals
    const emojiPickerRef = useRef(null);
    const colorPickerRef = useRef(null);
    const linkInputRef = useRef(null);

    // Handle clicks outside the modals
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Close emoji picker if clicked outside
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(e.target) &&
                e.target.id !== "emoji-open"
            ) {
                setShowEmojiPicker(false);
            }

            // Close color picker if clicked outside
            if (
                colorPickerRef.current &&
                !colorPickerRef.current.contains(e.target) &&
                e.target.id !== "color-open"
            ) {
                setColorPickerOpen(false);
            }

            // Close link input if clicked outside
            if (
                linkInputRef.current &&
                !linkInputRef.current.contains(e.target) &&
                e.target.id !== "link-open"
            ) {
                setLinkInputOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Handle mouse move to show tooltip
    useEffect(() => {
        const handleMouseMove = (e) => {
            const linkElement = e.target.closest("a");
            if (linkElement) {
                const { href } = linkElement;
                setTooltip({
                    visible: true,
                    url: href,
                    x: e.clientX,
                    y: e.clientY,
                });
            } else {
                setTooltip({ visible: false, url: "", x: 0, y: 0 });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Toggle emoji picker visibility
    const handleEmojiModal = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    if (!editor) {
        return null;
    }

    // Handle color change
    const handleColorChange = (color) => {
        setSelectedColor(color); // Update the selected color
        editor.chain().focus().setColor(color).run(); // Apply the color to the text
    };

    // Handle link insertion
    const handleLinkInsertion = () => {
        if (linkUrl) {
            // Ensure the link URL includes a protocol
            const fullUrl = linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
                ? linkUrl
                : `https://${linkUrl}`;

            // Apply blue color and underline to the selected text
            editor
                .chain()
                .focus()
                .setColor("#2563eb") // Blue color
                .toggleUnderline() // Underline
                .toggleLink({ href: fullUrl, target: "_blank" }) // Insert link
                .run();
            setLinkInputOpen(false);
            setLinkUrl("");
        }
    };

    // Handle emoji insertion
    const handleEmojiClick = (emoji) => {
        editor.chain().focus().insertContent(emoji.emoji).run();
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("File uploaded:", file.name);
        }
    };

    // Handle clear all content
    const handleClearAll = () => {
        editor.chain().focus().clearContent().run();
    };

    return (
        <>
            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 my-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Left Section - Reply Heading */}
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold text-gray-800">Reply</h1>
                </div>

                {/* Middle Section - Formatting Buttons */}
                <div className="flex items-center gap-2">
                    {/* Bold */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleBold().run();
                        }}
                        title="Bold"
                        className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive("bold") ? "text-[#a35285] bg-gray-100" : "text-gray-500"
                            }`}
                    >
                        <Bold className="w-5 h-5" />
                    </button>

                    {/* Italic */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleItalic().run();
                        }}
                        title="Italic"
                        className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive("italic") ? "text-[#a35285] bg-gray-100" : "text-gray-500"
                            }`}
                    >
                        <Italic className="w-5 h-5" />
                    </button>

                    {/* Underline */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleUnderline().run();
                        }}
                        title="Underline"
                        className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive("underline") ? "text-[#a35285] bg-gray-100" : "text-gray-500"
                            }`}
                    >
                        <Underline className="w-5 h-5" />
                    </button>

                    {/* Strike */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleStrike().run();
                        }}
                        title="Strike"
                        className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive("strike") ? "text-[#a35285] bg-gray-100" : "text-gray-500"
                            }`}
                    >
                        <Strikethrough className="w-5 h-5" />
                    </button>

                    {/* Undo */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().undo().run();
                        }}
                        title="Undo"
                        className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive("undo") ? "text-[#a35285] bg-gray-100" : "text-gray-500"
                            }`}
                    >
                        <Undo className="w-5 h-5" />
                    </button>

                    {/* Redo */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().redo().run();
                        }}
                        title="Redo"
                        className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive("redo") ? "text-[#a35285] bg-gray-100" : "text-gray-500"
                            }`}
                    >
                        <Redo className="w-5 h-5" />
                    </button>

                    {/* Color Picker */}
                    <div className="relative">
                        <button
                            id="color-open"
                            title="Color Picker"
                            onClick={() => setColorPickerOpen(!isColorPickerOpen)}
                            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <AiOutlineFontColors id="color-open" onClick={() => setColorPickerOpen(!isColorPickerOpen)} className="w-5 h-5" />
                        </button>
                        {isColorPickerOpen && (
                            <div
                                ref={colorPickerRef}

                                className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10"
                            >
                                <HexColorPicker
                                    color={selectedColor}
                                    onChange={handleColorChange}
                                />
                            </div>
                        )}
                    </div>

                    {/* Link Input */}
                    <div className="relative">
                        <button
                            id="link-open"
                            title="Insert Link"
                            onClick={() => setLinkInputOpen(!isLinkInputOpen)}
                            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <IoIosLink id="link-open" onClick={() => setLinkInputOpen(!isLinkInputOpen)} className="w-5 h-5" />
                        </button>
                        {isLinkInputOpen && (
                            <div
                                ref={linkInputRef}
                                className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10"
                            >
                                <input
                                    type="text"
                                    placeholder="Enter URL"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    className="p-1 border border-gray-300 rounded-md"
                                />
                                <button
                                    onClick={handleLinkInsertion}
                                    className="mt-2 p-1 bg-[#a35285] text-sm text-white rounded-md"
                                >
                                    Insert Link
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Emoji Picker */}
                    <button
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                        title="Emoji Picker"
                        id="emoji-open"
                        onClick={handleEmojiModal}
                    >
                        <MdOutlineEmojiEmotions
                            id="emoji-open"
                            onClick={handleEmojiModal}
                            className="w-5 h-5"
                        />
                    </button>

                    {/* Render the EmojiPicker component */}
                    {showEmojiPicker && (
                        <div
                            ref={emojiPickerRef}
                            className="absolute z-50"
                            style={{ top: "40%", right: "12%" }}
                        >
                            <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
                        </div>
                    )}

                    {/* File Upload */}
                    <label title="File Upload" className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
                        <MdOutlineFilePresent className="w-5 h-5" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>

                {/* Right Section - Trash Icon */}
                <div>
                    <button
                        onClick={handleClearAll}
                        title="Clear All"
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        <FaTrash className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Tooltip */}
            {tooltip.visible && (
                <div
                    className="fixed bg-black text-white text-sm px-2 py-1 rounded-md"
                    style={{
                        left: `${tooltip.x + 10}px`,
                        top: `${tooltip.y + 10}px`,
                    }}
                >
                    {tooltip.url}
                </div>
            )}
        </>
    );
};

export default Toolbar;