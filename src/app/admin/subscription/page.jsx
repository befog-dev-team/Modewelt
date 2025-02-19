// "use client";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const recapitulationData = [
//   { name: "Upgrade", value: 10, color: "#A78BFA" },
//   { name: "New Member", value: 60, color: "#F87171" },
//   { name: "Unsubscribe", value: 29, color: "#60A5FA" },
// ];

// const analyticsData = [
//   { name: "Jan", subscriptions: 400 },
//   { name: "Feb", subscriptions: 300 },
//   { name: "Mar", subscriptions: 500 },
//   { name: "Apr", subscriptions: 200 },
//   { name: "May", subscriptions: 300 },
//   { name: "Jun", subscriptions: 400 },
// ];

// const summaryCards = [
//   { title: "New Subscription", value: 2034, color: "text-purple-500" },
//   { title: "New Trials", value: 2034, color: "text-blue-500" },
//   { title: "Reactivation", value: 2034, color: "text-green-500" },
// ];

// const financialStats = [
//   { title: "Net Spend this Month", value: "$2950" },
//   { title: "Net Income this Month", value: "$12,950" },
// ];

// const historyEvents = [
//   "Start free trial",
//   "Failed payment to membership",
//   "Upgraded into premium",
//   "Join as new member",
//   "Reactivated premium",
// ];

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#f3f2f7] p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Subscription Management
//               </h1>
//             </div>
//           </div>
//         </header>
//       </div>
//       <div className="bg-[#ffffff] p-4 rounded-lg">
//         <header className="mb-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//             <div>
//               <h1 className="text-lg font-bold text-gray-800">
//                 Content Moderation
//               </h1>
//             </div>
//             {/* Filter Period Section */}
//             <div className="mt-4 sm:mt-0 flex items-center space-x-2">
//               <p className="text-[#787878] text-[10px]">Showing data for:</p>
//               <div className="bg-white shadow-md rounded-lg p-4 ">
//                 <p className="text-gray-800 font-semibold text-sm">
//                   01 Jan <span className="text-[#787878]">to 01 Feb 2025</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>
//         <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Sidebar Section */}
//           <div className="lg:col-span-1 space-y-6">
//             {summaryCards.map((item, index) => (
//               <div key={index} className="p-6 bg-white rounded-2xl shadow-lg">
//                 <h2 className={`text-lg font-semibold ${item.color}`}>
//                   {item.title}
//                 </h2>
//                 <p className="text-5xl font-bold text-gray-900 mt-4">
//                   {item.value}
//                 </p>
//               </div>
//             ))}
//             {financialStats.map((item, index) => (
//               <div key={index} className="p-6 bg-white rounded-2xl shadow-lg">
//                 <h2 className="text-lg font-semibold text-gray-500">
//                   {item.title}
//                 </h2>
//                 <p className="text-5xl font-bold text-gray-900 mt-4">
//                   {item.value}
//                 </p>
//               </div>
//             ))}
//             {/* Monthly Progress Bar */}
//             <div className="p-6 bg-white rounded-2xl shadow-lg">
//               <h2 className="text-lg font-semibold text-gray-500">
//                 Monthly Progress
//               </h2>
//               <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
//                 <div
//                   className="bg-purple-600 h-4 rounded-full"
//                   style={{ width: "50%" }}
//                 ></div>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">50% completed</p>
//             </div>
//           </div>

//           {/* Right Main Section */}
//           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Total Income Chart */}
//             <div className="col-span-2 p-6 bg-white rounded-2xl shadow-lg">
//               <h2 className="text-lg font-semibold text-gray-500">
//                 Total Income
//               </h2>
//               <ResponsiveContainer width="100%" aspect={2}>
//                 <LineChart
//                   data={analyticsData}
//                   margin={{ top: 20, right: 30, bottom: 10, left: 10 }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="subscriptions"
//                     stroke="#8884d8"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* History Section */}
//             <div className="p-6 bg-white rounded-2xl shadow-lg">
//               <h2 className="text-lg font-semibold text-gray-500">History</h2>
//               <ul className="mt-4 space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//                 {historyEvents.map((event, index) => (
//                   <li
//                     key={index}
//                     className="flex justify-between text-gray-700"
//                   >
//                     <span>{event}</span>
//                     <span className="text-gray-400 text-sm">22h</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Recapitulation Pie Chart */}
//             <div className="p-6 bg-white rounded-2xl shadow-lg">
//               <h2 className="text-lg font-semibold text-gray-500">
//                 Recapitulation
//               </h2>
//               <ResponsiveContainer width="100%" aspect={1}>
//                 <PieChart>
//                   <Pie
//                     data={recapitulationData}
//                     dataKey="value"
//                     innerRadius={40}
//                     outerRadius={80}
//                     paddingAngle={5}
//                   >
//                     {recapitulationData.map((entry, index) => (
//                       <Cell key={index} fill={entry.color} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <button className="mt-4 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f2f7] p-4 sm:p-6">
      <h1 className="font-extrabold text-4xl text-black text-center">empty</h1>
    </div>
  );
};

export default Dashboard;
