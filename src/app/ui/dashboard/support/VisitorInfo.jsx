"use client";

import { MdOutlineFileDownload } from "react-icons/md";
import { FaFile, FaFileImage, FaFilePdf, FaFileVideo, FaUser, FaBriefcase, FaNewspaper } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VisitorInfo({ ticket }) {
  console.log("Ticket:", ticket);
  const router = useRouter();

  // Destructure the ticket object to get the necessary data
  const {
    email = "Unknown Email",
    altEmail = "No alternative email",
    name = "Unknown User",
    time = "Unknown Time",
    media = [],
    username,
    jobId,
    postId,
  } = ticket || {};

  // Function to handle button clicks
  const handleViewProfile = () => {
    router.push(`/profile/${username}`);
  };

  const handleViewJobPost = () => {
    router.push(`/admin/jobs/${jobId}`);
  };

  const handleViewPost = () => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 pt-6 bg-gray-100">
      {/* Visitor Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-lg text-[#1f2a38] font-semibold mb-4">
          Visitor Information
        </h2>
        <div className="mt-4">
          <h3 className="text-sm text-[#1f2a38] font-semibold mb-2">
            Basic Details
          </h3>
          <div className="mt-2 text-[#707070] text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <p>Email: </p>
              <span className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                {email}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <p>Alternative Email: </p>
              <span>{altEmail}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <p>Name: </p>
              <span>{name}</span>
            </div>
            <div className="flex justify-between py-2">
              <p>Report Time: </p>
              <span>{time}</span>
            </div>
          </div>

          {/* Buttons for View Profile, View Job Post, and View Post */}
          <div className="mt-6 flex flex-col gap-3">
            {/* View Profile Button */}
            {username && (
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
                onClick={handleViewProfile}
              >
                <FaUser className="text-lg" />
                View Profile
              </button>
            )}
            {/* View Job Post Button */}
            {jobId && (
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
                onClick={handleViewJobPost}
              >
                <FaBriefcase className="text-lg" />
                View Job Post
              </button>
            )}

            {/* View Post Button */}
            {postId && (
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-200"
                onClick={handleViewPost}
              >
                <FaNewspaper className="text-lg" />
                View Post
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Files Shared */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-lg font-semibold text-[#000000] mb-4">Files Shared</h2>
        <div className="h-[1px] w-full bg-[#d0d5db] my-1"></div>
        <div className="mt-4 space-y-4">
          {media.map((file, i) => (
            <Attachment
              key={i}
              fileName={file.fileName}
              size={`${Math.round(file.fileSize / 1024)}KB`}
              url={file.url}
              type={file.type}
              createdAt={file.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const Attachment = ({ fileName, size, url, type, createdAt }) => {
  // Get the appropriate icon based on the file type
  const getIcon = (type) => {
    switch (type) {
      case "IMAGE":
        return <FaFileImage className="text-2xl text-blue-500" />;
      case "PDF":
        return <FaFilePdf className="text-2xl text-red-500" />;
      case "VIDEO":
        return <FaFileVideo className="text-2xl text-purple-500" />;
      default:
        return <FaFile className="text-2xl text-gray-500" />;
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
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200">
      <div className="flex items-center gap-3">
        {/* Display the appropriate icon based on file type */}
        <Link href={url} target="_blank" passHref>
          <div className="flex items-center gap-3">
            {getIcon(type)}
            <div>
              <p className="text-sm text-[#000000] font-medium">{fileName}</p>
              <p className="text-xs text-gray-500">
                Shared on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <MdOutlineFileDownload
        onClick={() => downloadFile(url, fileName)}
        className="text-2xl cursor-pointer text-[#a65386] hover:text-[#a65386] transition"
      />
    </div>
  );
};