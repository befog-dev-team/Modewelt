// "use client"; // This needs to be the first line

// import React from 'react';  // Ensure this is the only import for React-related hooks
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { BsFillSendFill } from "react-icons/bs";
// import { PiLinkSimpleBold } from "react-icons/pi";
// import Image from "next/image";

// // Member List Component
// const MemberList = ({ members, selectedMember, onMemberSelect }) => (
//   <ul className="space-y-4 flex-grow overflow-y-auto">
//     {members.map((member, index) => (
//       <li
//         key={index}
//         onClick={() => onMemberSelect(member)}
//         className={`flex items-center p-4 bg-white rounded-lg shadow cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${selectedMember.name === member.name ? "border-l-4 border-[#a35285]" : ""
//           }`}
//       >
//         <div className="relative w-12 h-12 rounded-full bg-gray-200 flex-shrink-0">
//           <Image
//             width={100}
//             height={100}
//             src={member.image || "default-avatar.png"}
//             alt={member.name}
//             className="w-full h-full rounded-full object-cover"
//           />
//           <span
//             className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${member.online ? "bg-green-500" : "bg-gray-400"
//               } border-2 border-white`}
//           ></span>
//         </div>
//         <div className="ml-4">
//           <p className="font-semibold text-gray-800">{member.name}</p>
//           <p className="text-sm text-gray-500 truncate">{member.message}</p>
//         </div>
//       </li>
//     ))}
//   </ul>
// );

// // Message Bubble Component
// const MessageBubble = ({ message, isCurrentUser }) => (
//   <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
//     <div>
//       <div
//         className={`p-3 max-w-xs sm:max-w-md lg:max-w-lg rounded-lg shadow-md transition-all duration-200 ${isCurrentUser ? "bg-[#a35285] text-white" : "bg-gray-200 text-black"
//           }`}
//       >
//         <p>{message.text}</p>
//       </div>
//       <div
//         className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}
//       >
//         {message.time}
//       </div>
//     </div>
//   </div>
// );

// export default function ChatPage() {
//   const [members] = React.useState([
//     { name: "Alice", message: "Hi! How are you?", online: true, image: "https://via.placeholder.com/150" },
//     { name: "Bob", message: "Let's meet tomorrow.", online: false, image: "https://via.placeholder.com/150" },
//     { name: "Charlie", message: "What’s your plan for today?", online: true, image: "https://via.placeholder.com/150" },
//   ]);

//   const [messages, setMessages] = React.useState([
//     { sender: "Alice", text: "Hi! How are you?", time: "10:00 AM" },
//     { sender: "You", text: "I'm good, thanks!", time: "10:01 AM" },
//   ]);

//   const [newMessage, setNewMessage] = React.useState("");
//   const [selectedMember, setSelectedMember] = React.useState(members[0]);
//   const [isMobileView, setIsMobileView] = React.useState(false); // Track if in mobile view

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const newMsg = {
//         sender: "You",
//         text: newMessage,
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       };
//       setMessages([...messages, newMsg]);
//       setNewMessage("");
//     }
//   };

//   const handleResize = () => {
//     // Update mobile view state based on screen width
//     setIsMobileView(window.innerWidth < 1024); // Assuming mobile/tablet view is below 1024px width
//   };

//   // Run on initial load and whenever the window is resized
//   React.useEffect(() => {
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />
//       <div className="flex flex-col lg:flex-row h-screen mt-4 ml-4 lg:ml-8">
//         {/* Left Sidebar: Member List */}
//         <aside className={`w-full lg:w-1/4 bg-white p-6 border-b lg:border-r border-gray-300 flex flex-col shadow-lg rounded-lg lg:shadow-none ${isMobileView ? 'lg:h-[calc(100vh-70px)]' : 'h-full'}`}>
//           <h2 className="text-lg font-semibold mb-6 text-gray-700">Chats</h2>
//           <MemberList
//             members={members}
//             selectedMember={selectedMember}
//             onMemberSelect={setSelectedMember}
//           />
//           <button className="mt-4 py-3 px-5 bg-[#a35285] text-white rounded-lg shadow-md w-full hover:bg-[#8d3f66] transition-colors">
//             Start New Chat
//           </button>
//         </aside>

//         {/* Chat Section */}
//         <main className={`w-full lg:w-3/4 min-h-fit bg-gray-50 flex flex-col ${isMobileView ? 'lg:hidden' : ''}`}>
//           {/* Chat Header */}
//           <header className="border-b border-gray-300 mb-4 flex justify-between items-center">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-700">
//                 Chat with {selectedMember.name}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {selectedMember.online ? "Online" : "Last seen recently"}
//               </p>
//             </div>
//             <button className="hover:underline flex items-center text-[#a35285]">
//               <span className="mr-2">
//                 <PiLinkSimpleBold />
//               </span>
//               Shared Media (12)
//             </button>
//           </header>

//           {/* Messages Section */}
//           <div className="flex-grow min-h-fit px-4 py-2 overflow-y-auto space-y-4 bg-white rounded-lg shadow-md">
//             {messages.map((message, index) => (
//               <MessageBubble key={index} message={message} isCurrentUser={message.sender === "You"} />
//             ))}
//           </div>

//           {/* Input Section */}
//           <footer className="mt-4 flex min-h-fit items-center border-t border-gray-300 py-3">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a35285] transition-all"
//               placeholder="Write your message..."
//             />
//             <button
//               onClick={handleSendMessage}
//               className="ml-4 p-2 bg-[#a35285] text-white rounded-lg hover:bg-[#8d3f66] transition-colors"
//             >
//               <BsFillSendFill className="text-white" />
//             </button>
//           </footer>
//         </main>
//       </div>
//       <div className='mt-2 sm:my-[8rem]'>
//         <Footer className="pt-2 sm:py-[8rem]" />
//       </div>
//     </div>
//   );
// }
