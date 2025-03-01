"use client";

import { type Editor } from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
} from "lucide-react";

type Props = {
    editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-center gap-4 w-full border border-gray-300 bg-gray-50">
            <div className="flex justify-start items-center gap-3 flex-wrap">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("bold") ? "bg-[#a35285] text-black" : "text-gray-600"
                        }`}
                >
                    <Bold className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("italic") ? "bg-[#a35285] text-black" : "text-gray-600"
                        }`}
                >
                    <Italic className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleUnderline().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("underline")
                        ? "bg-[#a35285] text-black"
                        : "text-gray-600"
                        }`}
                >
                    <Underline className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("strike") ? "bg-[#a35285] text-black" : "text-gray-600"
                        }`}
                >
                    <Strikethrough className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("heading", { level: 2 })
                        ? "bg-[#a35285] text-black"
                        : "text-gray-600"
                        }`}
                >
                    <Heading2 className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("bulletList")
                        ? "bg-[#a35285] text-black"
                        : "text-gray-600"
                        }`}
                >
                    <List className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleOrderedList().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("orderedList")
                        ? "bg-[#a35285] text-black"
                        : "text-gray-600"
                        }`}
                >
                    <ListOrdered className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBlockquote().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("blockquote")
                        ? "bg-[#a35285] text-gray-600"
                        : "text-black"
                        }`}
                >
                    <Quote className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().setCode().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("code") ? "bg-[#a35285] text-black" : "text-gray-600"
                        }`}
                >
                    <Code className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("undo") ? "bg-[#a35285] text-black" : "text-gray-600"
                        }`}
                >
                    <Undo className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 ${editor.isActive("redo") ? "bg-[#a35285] text-black" : "text-gray-600"
                        }`}
                >
                    <Redo className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Toolbar;