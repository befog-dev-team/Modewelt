"use client";
import { useState } from "react";
import Image from "next/image";
import photo from "../../../../../public/navbar/profile.jpg";
import img from "../../../../../public/support/img.png";
import pdf from "../../../../../public/support/pdf.png";
import ReplyBox from "./ReplyBox";
import { MdOutlineFileDownload } from "react-icons/md";

export default function SupportTicket() {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  return (
    <div className="max-w-2xl mx-auto bg-white py-6 shadow-md rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 px-6">
        Help Needed for Subscription Premium
      </h2>
      <div className="flex gap-4 mb-4 mt-2 px-6">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          Open
        </span>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          ● High Priority
        </span>
        <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
          Respond
        </span>
      </div>

      <div className="w-full bg-gray-300 h-[1px] mb-4"></div>

      <div className="flex items-center gap-4 mb-4 px-6">
        <Image
          src={photo}
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full w-12 h-12"
        />
        <div>
          <p className="font-semibold text-gray-800">Full Name</p>
          <p className="text-gray-500 text-sm">15th of Jan, 8 PM</p>
        </div>
      </div>

      <p className="mb-4 px-8 text-gray-800">Hi!</p>
      <p className="text-gray-600 mb-4 px-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <p className="text-gray-500 text-sm px-6">2 Attachments</p>
      <div className="flex gap-4 mb-4 mt-6 px-6">
        <Attachment img={pdf} fileName="doc.pdf" size="23KB" />
        <Attachment img={img} fileName="image.jpg" size="232KB" />
      </div>

      <div className="flex justify-end px-6 mt-8">
        <button
          className="bg-[#a65386] text-white px-6 py-2 rounded-lg hover:bg-[#a65386] transition"
          onClick={() => setIsReplyOpen((prev) => !prev)} // ✅ Toggle logic added
        >
          Action Ticket
        </button>
      </div>

      {isReplyOpen && <ReplyBox />}
    </div>
  );
}

function Attachment({ img, fileName, size }) {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-50 border border-gray-300 rounded-lg min-w-[250px] max-w-xs">
      <div className="flex items-center gap-2">
        <Image src={img} alt={fileName} width={40} height={40} />
        <div>
          <p className="font-medium text-[#707070] text-sm">{fileName}</p>
          <p className="text-gray-500 text-xs">{size}</p>
        </div>
      </div>
      <MdOutlineFileDownload className="text-2xl cursor-pointer text-[#a65386] hover:text-[#a65386] transition" />
    </div>
  );
}
