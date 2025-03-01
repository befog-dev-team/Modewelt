"use client";

import { useState } from "react";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaFilePdf, FaFileImage, FaFileVideo, FaFile } from "react-icons/fa";
import ReplyBox from "./ReplyBox";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";

const SupportTicket = ({ ticket }) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  if (!ticket) {
    return (
      <div className="bg-white min-h-screen flex justify-center items-center text-gray-500 text-2xl">
        Select a ticket to view details.
      </div>
    );
  }

  return (
    <div className="py-6 mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 px-6">
        {ticket.message}
      </h2>
      <div className="flex gap-4 mb-4 mt-2 px-6">
        {ticket.labels.map((label, index) => (
          <span
            key={index}
            className={`text-xs px-2 py-1 rounded-full ${label === "● High Priority"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
              }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="w-full bg-gray-300 h-[1px] mb-4"></div>

      <div className="flex items-center gap-4 mb-4 px-6">
        <UserAvatar
          avatarUrl={ticket.avatarUrl}
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full w-12 h-12"
        />
        <div>
          <p className="font-semibold text-gray-800">{ticket.name}</p>
          <p className="text-gray-500 text-sm">{ticket.time}</p>
        </div>
      </div>

      <p className="mb-4 px-8 text-gray-800">{ticket.message}</p>

      {/* Attachments */}
      {ticket.media.length > 0 && (
        <>
          <p className="text-gray-500 text-sm px-6">
            {ticket.media.length} Attachment{ticket.media.length > 1 ? "s" : ""}
          </p>
          <div className="flex gap-4 mb-4 mt-6 px-6">
            {ticket.media.map((media) => (
              <Attachment
                key={media.id}
                fileName={media.fileName}
                size={`${Math.round(media.fileSize / 1024)}KB`}
                url={media.url}
                type={media.type}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex justify-end px-6 mt-8">
        <button
          className="bg-[#a65386] text-white px-6 py-2 rounded-lg hover:bg-[#a65386] transition"
          onClick={() => setIsReplyOpen((prev) => !prev)}
        >
          Action Ticket
        </button>
      </div>

      {isReplyOpen && <ReplyBox ticket={ticket} />}
    </div>
  );
};

const Attachment = ({ fileName, size, url, type }) => {
  // Get the appropriate icon based on the file type
  const getIcon = (type) => {
    switch (type) {
      case "IMAGE":
        return <FaFileImage className="text-3xl text-blue-500" />;
      case "PDF":
        return <FaFilePdf className="text-3xl text-red-500" />;
      case "VIDEO":
        return <FaFileVideo className="text-3xl text-purple-500" />;
      default:
        return <FaFile className="text-3xl text-gray-500" />;
    }
  };

  // Function to download a file
  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-3 bg-blue-50 border border-gray-300 rounded-lg min-w-[250px] max-w-xs">
        <Link href={url} target="_blank">
          <div className="flex items-center gap-2">
            {getIcon(type)}
            <p className="font-medium text-[#707070] text-sm">{fileName}</p>
            <p className="text-gray-500 text-xs">{size}</p>
          </div>
        </Link>

        <MdOutlineFileDownload
          onClick={(e) => {
            e.stopPropagation();
            downloadFile(url, fileName);
          }}
          className="text-2xl cursor-pointer text-[#a65386] hover:text-[#a65386] transition"
        />
      </div>
    </div>
  );
};

export default SupportTicket;