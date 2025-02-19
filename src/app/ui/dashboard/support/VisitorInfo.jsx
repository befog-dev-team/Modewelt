"use client";
import { MdOutlineFileDownload } from "react-icons/md";
import pdf from "../../../../../public/support/pdf.png";
import Image from "next/image";
export default function VisitorInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-6 py-6 bg-gray-100">
      {/* Visitor Information */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-lg text-[#1f2a38] font-semibold">
          Visitor Information
        </h2>
        <div className="mt-4">
          <h3 className="text-sm text-[#1f2a38] font-semibold">
            Basic Details{" "}
            <span className="text-blue-500 float-right cursor-pointer">
              Edit
            </span>
          </h3>
          <div className="mt-2 text-[#707070] text-sm">
            <div className="flex justify-between">
              <p>Email: </p>
              <span className="text-blue-600 cursor-pointer">
                xyz@gmail.com
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Phone: </p>
              <span className="">Unknown</span>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Location: </p>
              <span className="text-blue-600 cursor-pointer">
                India (view on map)
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Local Time: </p>
              <span>10:50 AM (+06:23 GMT)</span>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Language: </p>
              <span className="bg-pink-200 text-[#828282] px-2 py-1 rounded text-xs">
                English
              </span>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#d0d5db] mt-2"></div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-[#1f2a38]">
            Device Information
          </h3>
          <div className="mt-2 text-gray-600 text-sm">
            <div className="mt-2 flex justify-between text-[#8a8a8a]">
              <p>IP: </p>
              <span>127.0.0.1</span>
            </div>
            <div className="mt-2 flex justify-between text-[#8a8a8a]">
              <p>OS: </p>
              <span>iOS MacBook Air</span>
            </div>
            <div className="mt-2 flex justify-between text-[#8a8a8a]">
              <p>Browser: </p>
              <span>Chrome</span>
            </div>
          </div>
        </div>
      </div>

      {/* Files Shared */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-lg font-semibold text-[#000000]">Files Shared</h2>
        <div className="h-[1px] w-full bg-[#d0d5db] my-1"></div>
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={pdf}
                  alt="PDF"
                  className="w-8 h-8"
                  width={32} // Adjust the size as per your requirement
                  height={32} // Adjust the size as per your requirement
                />

                <div>
                  <p className="text-sm text-[#000000] font-medium">Doc.pdf</p>
                  <p className="text-xs text-gray-500">
                    Shared with agent name on 15 Jan
                  </p>
                </div>
              </div>
              <MdOutlineFileDownload className="text-2xl cursor-pointer text-[#a65386] hover:text-[#a65386] transition" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
