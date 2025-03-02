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
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { Loader2 } from 'lucide-react';
import toast from "react-hot-toast";

export default function ReplyBox({ ticket }) {
  console.log("ticket", ticket);

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
          "min-h-[200px] w-full p-4 border text-[#1f2a38] focus:outline-none rounded-md",
      },
    },
    content: "",
    immediatelyRender: false,
  });

  // Mutation to send email
  const sendEmailMutation = useMutation({
    mutationFn: async ({ to, subject, html, altEmail }) => {
      const response = await ky.post("/api/admin/support-ticket/send-email", {
        json: { to, subject, html, altEmail },
        timeout: 60000, // 60 seconds
      }).json();
      return response;
    },
    onSuccess: () => {
      toast.success("Email sent successfully!");
      editor.commands.clearContent(); // Clear the editor content after sending the email
    },
    onError: (error) => {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    },
  });

  const handleSendEmail = () => {
    const htmlContent = editor?.getHTML(); // Get the HTML content from the editor
    const subject = `Reply to Support Ticket - ${ticket?.reason || "No Reason Provided"}`; // Email subject
    const to = ticket?.email; // Primary email
    const altEmail = ticket?.altEmail; // Alternative email

    if (!htmlContent) {
      toast.error("Please enter a message before sending.");
      return;
    }

    // Trigger the mutation to send the email
    sendEmailMutation.mutate({ to, subject, html: htmlContent, altEmail });
  };

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
        <EditorContent editor={editor} className="w-full min-h-[200px]" />

        {/* Actions */}
        <div className="flex justify-end items-center mt-2">
          <button
            onClick={handleSendEmail}
            className="bg-[#a35285] text-white px-4 py-2 rounded-lg"
            disabled={sendEmailMutation.isPending}
          >
            {sendEmailMutation.isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}