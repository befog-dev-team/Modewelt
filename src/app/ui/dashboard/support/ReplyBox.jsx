"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color"; 
import UserAvatar from "@/components/UserAvatar";
import Toolbar from "@/components/ToolBar";

export default function ReplyBox({ ticket }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: "Type your reply here...",
        emptyNodeClass:
          'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] before:pointer-events-none',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "h-full w-full p-4 border text-[#1f2a38] focus:outline-none rounded-md",
      },
    },
    content: "",
    immediatelyRender: false,
  });

  return (
    <div className="w-full">
      <div className="mt-4 border shadow-md p-4 bg-white">
        <div className="flex items-center space-x-3 border-b pb-2">
          <UserAvatar
            avatarUrl={ticket?.avatarUrl}
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-[#1f2a38]">
              {ticket?.name || "Unknown User"}
            </h3>
            <p className="text-sm text-gray-500">
              {ticket?.time || "No timestamp"}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <Toolbar editor={editor} content={editor?.getHTML()} />

        {/* Editor Content Area */}
        <EditorContent
          editor={editor}
          className="w-full h-[200px]"
        />

        {/* Actions */}
        <div className="flex justify-end items-center mt-2">
          <button className="bg-[#a35285] text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
