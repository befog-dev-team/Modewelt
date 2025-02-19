"use client";
import { MdBlockFlipped } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import Card from "./card";
// import page from "../../../../../public/contact/page.png";
// import Vector from "../../../../../public/contact/Vector.png";
// import time from "../../../../../public/contact/time.png";
// import ac from "../../../../../public/contact/ac.png";

export default function Dashboard() {
//   const stats = [
//     { title: "Total Post", value: "40,689", icon: page },
//     { title: "Reported Post", value: "89,000", icon: Vector },
//     { title: "Offensive", value: "2,040", icon: time },
//     { title: "Total Action", value: "2,040", icon: ac },
//   ];

  return (
    <div className="p-2 md:p-8 max-w-7xl mx-auto">
      {/* Stats Section */}
      <div className="flex bg-gray-100">
        <Card/>
      </div>
      {/* Posts Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 font-semibold text-lg">Post</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">User</th>
                <th>User Name</th>
                <th>Post Date</th>
                <th>Comment</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <span>User Name</span>
                  </td>
                  <td>@user</td>
                  <td>12.09.2019 - 12:53 PM</td>
                  <td>abc@gmail.com</td>
                  <td className="space-x-2 text-center">
                    <button className="bg-green-200 text-green-800 border-2 border-green-800 p-2 rounded transition-all hover:bg-green-800 hover:text-white">
                      <FaCheck />
                    </button>
                    <button className="bg-[#ffcccc] text-[#ff1919] border-2 border-[#ff1919] p-2 rounded transition-all hover:bg-[#ff1919] hover:text-white">
                      <RxCross2 />
                    </button>
                    <button className="bg-[#ffe1b5] text-[#ed991a] border-2 border-[#ed991a] p-2 rounded transition-all hover:bg-[#ed991a] hover:text-white">
                      <MdBlockFlipped />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
