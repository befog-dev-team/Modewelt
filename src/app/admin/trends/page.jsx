// "use client";
// import { useState } from "react";
// import { FaMale, FaFemale } from "react-icons/fa";
// import PieChartComponent from "@/app/ui/dashboard/trends/PieChartComponent";
// import JobList from "@/app/ui/dashboard/trends/JobList";
// import GenderDistribution from "@/app/ui/dashboard/trends/GenderDistribution";
// import EventsList from "@/app/ui/dashboard/trends/EventsList";
// import Popup from "@/app/ui/dashboard/trends/Popup";

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("Hashtag");
//   const [showPopup, setShowPopup] = useState(false);

//   const togglePopup = () => setShowPopup(!showPopup);

//   const hashtags = [
//     "#FashionDesigner",
//     "#illustration",
//     "#graphicDesigner",
//     "#jobs",
//     "#trendingFashion",
//   ];

//   return (
//     <div className="min-h-screen bg-[#f3f2f7] sm:p-6">
//       <div className="max-w-7xl mx-auto mb-6">
//         {/* Header Section */}
//         <header>
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Fashion Trends
//               </h1>
//             </div>
//           </div>
//         </header>
//       </div>

//       <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
//         {/* Tabs */}
//         <div className="mb-4">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">Content</h2>
//           <div className="flex space-x-2">
//             {["Hashtag", "Viral Post", "Video & Carousel"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 border rounded ${
//                   activeTab === tab
//                     ? "bg-[#ffffff] text-black"
//                     : "bg-gray-100 text-black"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Hashtag Section */}
//         {activeTab === "Hashtag" && (
//           <div className="bg-pink-100 p-4 rounded flex flex-wrap gap-2">
//             {hashtags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1 bg-white border rounded text-purple-700"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {activeTab === "Viral Post" && (
//           <div className="bg-pink-100 p-4 rounded flex flex-wrap gap-2">

//           </div>
//         )}

//         {activeTab === "Video & Carousel" && (
//           <div className="bg-pink-100 p-4 rounded flex flex-wrap gap-2">

//           </div>
//         )}

//         {/* Industry & Job Market */}
//         <div className="mt-8">
//           <h2 className="text-xl text-gray-800 font-semibold">
//             Industry & Job Market
//           </h2>
//           <div className="flex mt-4 gap-2">
//             {/* Hiring Trends */}
//             <div className="bg-white w-1/3 p-6 rounded-xl shadow-md">
//               <h3 className="font-semibold text-gray-800 text-lg">
//                 Hiring Trends
//               </h3>
//               <PieChartComponent />
//             </div>

//             {/* Company Growth */}
//             <div className="bg-white w-2/3 p-6 rounded-xl shadow-md">
//               <h3 className="font-semibold text-gray-800 text-lg mb-4">
//                 Company Growth
//               </h3>
//               <JobList />
//             </div>
//           </div>
//         </div>

//         {/* Gender Distribution & Events */}
//         <div className="grid md:grid-cols-2 gap-6 mt-8">
//           {/* Gender Distribution */}
//           <div className="py-6 rounded">
//             <h3 className="font-semibold text-[#222229] text-lg">
//               Categorizes
//             </h3>
//             <div className="flex justify-center items-center mt-4">
//               <GenderDistribution />
//             </div>
//           </div>

//           {/* Events */}
//           <div className="p-6 rounded">
//             <h3 className="font-semibold text-lg flex justify-between">
//               <span className="text-[#222229]">Current Events</span>
//               <button onClick={togglePopup} className="text-blue-600">
//                 Add Events
//               </button>
//             </h3>
//             <EventsList />
//           </div>
//         </div>
//       </div>

//       {/* Popup */}
//       <Popup isOpen={showPopup} onClose={togglePopup} />
//     </div>
//   );
// }

export default function Dashboard() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#f3f2f7] p-4 sm:p-6">
        <h1 className="font-extrabold text-4xl text-black text-center">
          empty
        </h1>
      </div>
    </div>
  );
}
