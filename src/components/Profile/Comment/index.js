"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

export default function PdfViewer({ file }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [fileType, setFileType] = useState("");

    const onLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const determineFileType = (file) => {
        if (!file) return "unknown";
        const fileExtension = file.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension)) {
            return "image";
        } else if (fileExtension === "pdf") {
            return "pdf";
        } else {
            return "unknown";
        }
    };

    useEffect(() => {
        const type = determineFileType(file);
        setFileType(type);
        console.log(`File Type: ${type}`);
    }, [file]);

    return (
        <div className="p-4 space-y-4 max-w-3xl mx-auto">
            {/* Card Container */}
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto border border-gray-300 mx-auto rounded-md flex flex-col">
                {/* Header */}
                <div className="bg-gray-600 text-white text-xs md:text-sm font-bold p-2 flex justify-between">
                    <span>{fileType === "pdf" ? "PDF DOCUMENT" : "IMAGE"}</span>
                    <span>{fileType === "pdf" && `${numPages || 0} PAGES`}</span>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex items-center justify-center border border-gray-300 bg-gray-100 h-64 md:h-96">
                    {fileType === "pdf" ? (
                        <Document
                            file={file}
                            onLoadSuccess={onLoadSuccess}
                            className="w-full h-full"
                        >
                            <Page pageNumber={pageNumber} width={400} />
                        </Document>
                    ) : fileType === "image" ? (
                        <Image
                            width={100}
                            height={100}
                            src={file}
                            alt="content"
                            className="max-w-full max-h-full object-contain"
                        />
                    ) : (
                        <div>Unsupported file type</div>
                    )}
                </div>

                {/* Footer */}
                {fileType === "pdf" && numPages && (
                    <div className="p-2 flex items-center justify-between text-xs md:text-sm">
                        <span>
                            Page {pageNumber} of {numPages}
                        </span>
                        <div>
                            <button
                                className="mr-2 px-2 py-1 text-gray-600 focus:outline-none hover:bg-gray-200 rounded"
                                onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
                            >
                                ◀
                            </button>
                            <button
                                className="px-2 py-1 text-gray-600 focus:outline-none hover:bg-gray-200 rounded"
                                onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))}
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                )}

                {/* Bottom Text */}
                <div className="p-2 text-xs md:text-sm text-center text-gray-500">
                    LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.
                </div>
            </div>

            {/* Separator */}
            <hr />

            {/* See All Post Button */}
            <div className="text-center mt-4">
                <button className="w-full text-[#a35284] font-medium text-sm md:text-base px-4 py-2 rounded transition-all duration-300 hover:bg-[#a35284] hover:text-white">
                    SEE ALL POSTS
                </button>
            </div>
        </div>
    );
}
