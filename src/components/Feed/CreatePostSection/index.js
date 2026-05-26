"use client"

import React, { useEffect, useRef, useState } from "react"; // React imports
import { EditorContent, useEditor } from "@tiptap/react"; // Tiptap imports
import StarterKit from "@tiptap/starter-kit"; // Tiptap starter kit
import Placeholder from "@tiptap/extension-placeholder"; // Tiptap placeholder extension
import './styles.css'; // Component styles
import { BsFillSendFill } from "react-icons/bs"; // React icons
import { PiLinkSimpleBold } from "react-icons/pi"; // React icons
import { AiOutlinePicture } from "react-icons/ai"; // React icons
import { PiVideoBold } from "react-icons/pi"; // React icons
import { IoClose } from "react-icons/io5"; // React icons
import { IoMdCloseCircleOutline } from "react-icons/io"; // React icons
import Image from "next/image"; // Next image
import { useSubmitPostMutation } from "./mutations"; // Submit post mutation
import { Loader2 } from "lucide-react"; // Loader
import useMediaUpload from "./useMediaUpload"; // Media upload hook
import { useDropzone } from "@uploadthing/react"; // Dropzone
import { cn } from "@/lib/utils"; // Utils
import toast from "react-hot-toast";

// CreatePostSection component
export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedFiles, setSelectedFiles] = useState([]); // Selected files

  const fileInputRef = useRef(null); // File input ref
  const mutation = useSubmitPostMutation(); // Submit post mutation

  // Media Upload
  const {
    startUpload, // Start upload
    attachments, // Attachments
    isUploading, // Uploading state
    // uploadProgress, // Upload progress
    removeAttachment, // Remove attachment
    reset: resetMediaUploads // Reset media uploads
  } = useMediaUpload() // Media upload hook

  // Handle keydown event
  const handleKeyDown = (e) => {
    if (e.key === "Escape") { // If the key is Escape
      setIsModalOpen(false); // Close the modal
    }
  };

  // Listen for keydown event
  useEffect(() => {
    if (isModalOpen) { // If modal is open
      window.addEventListener("keydown", handleKeyDown); // Add event listener
    }
    return () => window.removeEventListener("keydown", handleKeyDown); // Remove event listener
  }, [isModalOpen]);

  // Editor instance
  const editor = useEditor({
    extensions: [
      StarterKit, // Essential editing features 
      Placeholder.configure({ // Placeholder extension
        placeholder: "What's on your mind?", // Placeholder text
        emptyNodeClass: // Placeholder classes
          'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] before:pointer-events-none',
      }),
    ],
    content: "", // Initial content
    immediatelyRender: false // Do not render the editor immediately
  });

  // Get the editor content
  const input = editor?.getText({
    blockSeparator: "\n", // Block separator is used to separate blocks of text in the editor content. Eg. new line
  }) || ""; // Get editor content or empty string

  // handle modal toggle
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal state
  };

  // Handle file change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const totalFiles = files.length + selectedFiles.length; // Calculate total files if these are added

    if (totalFiles > 3) {
      toast.error("You can only upload up to 3 files."); // Show alert
      e.target.value = ""; // Clear the input
      return; // Exit the function
    }

    // Add selected files to the state
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Start upload
    startUpload(files);
  };

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ // Get root props, input props and isDragActive from dropzone
    onDrop: (files) => {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Add files to selected files
      startUpload(files); // Start upload
    },
    noClick: true, // Disable input triggering inside Dropzone
  })

  // Get input props from dropzone
  const { ...rootProps } = getRootProps()

  // Remove file
  const removeFile = (index) => {
    const attachment = attachments[index];
    if (attachment) {
      removeAttachment(attachment.file.name);
    }
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle onSubmit
  const onSubmit = async () => {
    if (!input.trim() && selectedFiles.length === 0) {
      toast.error("Please provide some content to post, either text or media.");
      return;
    }

    try {
      // Start upload
      mutation.mutate(
        {
          content: input.trim(),// Get the content
          mediaIds: attachments.map((a) => a.mediaId).filter(Boolean), // Get media IDs and filter out any falsy values
        },
        {
          onSuccess: () => {
            editor?.commands?.clearContent(); // Clear editor content
            resetMediaUploads(); // Reset media uploads
            setSelectedFiles([]); // Clear selected files
            setIsModalOpen(false); // Close the modal
          },
        }
      );
    } catch (error) {
      console.error("Error during submission:", error); // Log error
    }
  };

  return (
    <div className="sm:min-w-[95%] md:w-[100%] w-full mx-auto">
      <div className="bg-white dark:bg-gray-900 p-2 sm:p-4 lg:p-8 my-4 rounded-[4px] border dark:border-gray-800 transition-colors">
        <div className="flex items-center space-x-4">
          <p className="text-xs sm:text-sm lg:text-base pl-3 font-semibold font-[Gotham] text-gray-900 dark:text-gray-300 uppercase">
            NEW POST
          </p>
        </div>
        <hr className="w-full h-[1px] mx-auto mt-4 bg-gray-200 dark:bg-gray-800 mb-4 border-none" />
        <div className="flex flex-col px-2 text-sm sm:text-base lg:text-lg">
          {/* Editor */}
          <EditorContent editor={editor} />
          <div className="flex space-x-2 md:space-x-4 items-center mt-4">
            <div>
              <div
                className="cursor-pointer rounded-full justify-center"
                onClick={handleModalToggle}
              >
                <PiLinkSimpleBold
                  size={20}
                  className="text-[#e3e3e3] hover:text-gray-500"
                />
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                  <div className="bg-white dark:bg-gray-900 w-[90%] sm:w-[394px] md:w-[550px] max-w-full rounded-lg shadow-lg p-6 relative border dark:border-gray-800 transition-colors">
                    {/* Close button */}
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 w-[24px] h-[24px]"
                      onClick={handleModalToggle}
                      aria-label="Close"
                    >
                      <IoClose />
                    </button>
                    {/* Modal content */}
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                      Media Upload
                    </h2>
                    {/* Uploading description info */}
                    <p className="text-sm text-gray-500 mb-6">
                      Add your documents here, and you can upload up to 3 files max.
                    </p>
                    <div
                      {...rootProps}
                      className={cn("border-2 border-pink-300 rounded-lg p-4 flex flex-col items-center", isDragActive && "border-4 border-dashed")}
                    >
                      <Image
                        width={100}
                        height={100}
                        src="/assets/feed/upload.png"
                        alt="upload-icon"
                        className="mb-4 w-[42px] h-[42px]"
                      />
                      <p className="text-sm text-gray-500 mb-4 text-center">
                        Drag your file(s) to start uploading
                      </p>

                      {/* File Input trigger */}
                      <label
                        htmlFor="file-upload"
                        className={`${isUploading ? "cursor-not-allowed" : " cursor-pointer"} text-[#A45286] px-4 py-2 rounded-md text-sm border border-[#A45286] hover:bg-[#A45286] hover:text-white transition`}
                      >
                        Browse files
                      </label>

                      <input
                        {...getInputProps()}
                        id="file-upload"
                        type="file"
                        accept="image/*, video/*, application/pdf"
                        multiple
                        disabled={isUploading}
                        ref={fileInputRef}
                        className={`hidden ${isUploading ? "cursor-not-allowed" : ""}`}
                        onChange={handleFileChange} // This will only trigger when the file explorer is used
                      />
                    </div>
                    {/* Upload progress */}
                    <div className="mt-4">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md mb-2"
                        >
                          <div className="flex items-center">
                            {file.type.startsWith("image/") ? (
                              <Image
                                height={100}
                                width={100}
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-8 h-8 rounded-md mr-2"
                              />
                            ) : (
                              <Image
                                height={100}
                                width={100}
                                src="/assets/feed/zip.png"
                                alt="zip-icon"
                                className="w-8 h-8 rounded-md mr-2"
                              />
                            )}
                            <div>
                              <p className="text-xs sm:text-sm text-gray-700 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-red-600"
                            onClick={() => removeFile(index)}
                            aria-label="Remove file"
                          >
                            <IoMdCloseCircleOutline />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-6 space-x-2">
                      <button
                        className="text-gray-500 bg-gray-100 px-3 py-2 rounded-md text-xs sm:text-sm hover:bg-gray-200 transition"
                        onClick={handleModalToggle}
                      >
                        Cancel
                      </button>
                      <button
                        className={cn("bg-[#fc3fb4] text-white px-3 py-2 w-[4.2rem] h-[2.2rem] rounded-md text-xs sm:text-sm transition", isUploading || selectedFiles.length === 0 && "opacity-50 disabled:cursor-not-allowed disabled")}
                        disabled={mutation.isPending || isUploading || selectedFiles.length === 0} // Disable button if uploading or no files selected
                        onClick={onSubmit}
                      >
                        {mutation.isPending ? ( // If mutation is pending
                          <span>
                            <Loader2 className="mx-auto animate-spin" />
                          </span>
                        ) : isUploading ? ( // If uploading
                          <span>
                            <Loader2 className="mx-auto animate-spin" />
                          </span>
                        ) : (
                          <span>Upload</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="cursor-pointer rounded-full justify-center"
              onClick={handleModalToggle}
            >
              <AiOutlinePicture
                size={20}
                className="text-[#e3e3e3] hover:text-gray-500"
              />
            </div>
            {/* Video Post Button */}
            <div
              className="cursor-pointer rounded-full justify-center"
              onClick={handleModalToggle}
            >
              <PiVideoBold
                size={20}
                className="text-[#e3e3e3] hover:text-gray-500"
              />
            </div>
            {/* Post Submit Button */}
            <button
              className={`flex cursor-pointer justify-center items-center w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] bg-[#fc3fb4] text-white rounded-sm ${isUploading || input.trim() === ''
                ? 'disabled:bg-[#fc3fb4] disabled:cursor-not-allowed disabled:text-white disabled:opacity-50'
                : ''
                } transition`}
              disabled={mutation.isPending || isUploading || !input.trim()} // Disable button if uploading or no input if there is blank spaces
              onClick={onSubmit}
            >
              {mutation.isPending ? ( // If mutation is pending
                <span>
                  <Loader2 className="mx-auto animate-spin" />
                </span>
              ) : isUploading ? ( // If uploading
                <span>
                  <Loader2 className="mx-auto animate-spin" />
                </span>
              ) : (
                <BsFillSendFill size={16} /> // Send icon
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
