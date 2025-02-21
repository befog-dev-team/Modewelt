import { useState, useMemo } from "react";
import Image from "next/image";
import Profile from "../../../../../public/navbar/profile.jpg";
import { IoFilter } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Ticketinfo from "./Ticketinfo";

// Mock ticket data
const ticketsData = [
  {
    id: 1,
    name: "John Doe",
    time: "2 min ago",
    message: "Hi! I have a query regarding a product...",
    status: "open",
    priority: "High Priority",
    labels: ["Open", "● High Priority", "Respond"],
  },
  {
    id: 2,
    name: "Jane Smith",
    time: "5 min ago",
    message: "Looking for help with a recent purchase...",
    status: "new",
    priority: "Medium Priority",
    labels: ["New", "● High Priority", "Employer"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    time: "10 min ago",
    message: "Request for assistance on account issues...",
    status: "close",
    priority: "Low Priority",
    labels: ["Close", "● High Priority", "Employer"],
  },
  {
    id: 4,
    name: "Robert Brown",
    time: "15 min ago",
    message: "Technical problem with my service...",
    status: "open",
    priority: "High Priority",
    labels: ["Open", "● High Priority", "Employer"],
  },
  {
    id: 5,
    name: "John Doe",
    time: "2 min ago",
    message: "Hi! I have a query regarding a product...",
    status: "open",
    priority: "High Priority",
    labels: ["Open", "● High Priority", "Employer"],
  },
  {
    id: 6,
    name: "Jane Smith",
    time: "5 min ago",
    message: "Looking for help with a recent purchase...",
    status: "new",
    priority: "Medium Priority",
    labels: ["New", "● High Priority", "Employer"],
  },
  {
    id: 7,
    name: "Alice Johnson",
    time: "10 min ago",
    message: "Request for assistance on account issues...",
    status: "close",
    priority: "Low Priority",
    labels: ["Close", "● High Priority", "Employer"],
  },
  {
    id: 8,
    name: "Robert Brown",
    time: "15 min ago",
    message: "Technical problem with my service...",
    status: "open",
    priority: "High Priority",
    labels: ["Open", "● High Priority", "Employer"],
  },
];

const Ticket = ({ ticket, onClick }) => (
  <div
    className={`p-4 border border-[#0c8ce8] rounded-lg mb-3 ${
      ticket.status === "open"
        ? "bg-[#f2faff] border-[#0c8ce8]"
        : "bg-white border-[#ebeff2]"
    } cursor-pointer`}
    onClick={() => onClick(ticket)}
  >
    <div className="flex items-center justify-between my-2">
      <div className="flex">
        <Image
          src={Profile}
          alt="User"
          width={32}
          height={32}
          className="w-10 h-10 rounded-full mr-3"
        />
        <h3 className="text-lg font-[DM Sans] text-gray-800 my-2">
          {ticket.name}
        </h3>
      </div>
      <div>
        <div className="flex justify-between mt-2">
          <span className="text-[#bfbdbd] my-2">{ticket.time}</span>
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-500 mb-4">{ticket.message}</p>
    {ticket.labels.map((label, index) => {
      let bgColor = "bg-gray-200"; // Default background
      let textColor = "text-gray-700"; // Default text color

      if (label === "Open") {
        bgColor = "bg-[#b0e2ff]";
        textColor = "text-[#0378ff]";
      } else if (label === "● High Priority") {
        bgColor = "bg-[#ffeeeb]";
        textColor = "text-[#ff0000]";
      } else if (label === "Respond" || label === "Employer") {
        bgColor = "bg-[#fffbed]";
        textColor = "text-[#d6bf0d]";
      } else if (label === "New") {
        bgColor = "bg-[#d4ffdc]";
        textColor = "text-[#05ad10]";
      } else if (label === "Close") {
        bgColor = "bg-[#fff7c4]";
        textColor = "text-[#ffc300]";
      }

      return (
        <span
          key={index}
          className={`text-sm mt-8 m-1 px-2 py-1 rounded-full ${bgColor} ${textColor}`}
        >
          {label}
        </span>
      );
    })}
  </div>
);

// Individual detail pages for tickets
const JohnDoePage = () => (
  <div className="p-4 border border-[#0c8ce8] rounded-lg bg-white">
    <h2 className="text-xl font-semibold text-gray-800">John Doe's Ticket</h2>
    <p>Details about John Doe's ticket...</p>
  </div>
);

const RobertBrownPage = () => (
  <div className="p-4 border border-[#0c8ce8] rounded-lg bg-white">
    <h2 className="text-xl font-semibold text-gray-800">Robert Brown's Ticket</h2>
    <p>Details about Robert Brown's ticket...</p>
  </div>
);

// Add other detail components as needed...

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketsPerPage = 6;

  const handleClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const filteredTickets = useMemo(
    () =>
      ticketsData.filter((ticket) =>
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const currentTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const renderPage = () => {
    switch (selectedTicket?.name) {
      case "John Doe":
        return <Ticketinfo />;
      case "Robert Brown":
        return <RobertBrownPage />;
      // Add cases for other tickets
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex w-full">
      <div className="w-1/3 rounded-md">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl text-gray-800 font-semibold">Recent Tickets</h2>

          <div className="mt-4 flex justify-between gap-2">
            <input
              type="text"
              placeholder="Search by Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="pt-2 text-2xl px-2 border-2 rounded-md text-[#05a8ff] shadow-md">
              <IoFilter />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-gray-700 font-medium mb-4">
              <span>Open Tickets ({filteredTickets.length})</span>
              <span className="cursor-pointer text-[#7d7d7d]">
                <FaAngleDown />
              </span>
            </div>

            {currentTickets.length > 0 ? (
              currentTickets.map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket} onClick={handleClick} />
              ))
            ) : (
              <div className="text-center text-gray-500">No tickets found.</div>
            )}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <button
              className={`px-4 py-2 rounded flex items-center ${
                currentPage === 1 ? "cursor-not-allowed text-[#f0d0e6]" : "text-[#a35385]"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <IoIosArrowBack className="mr-2" /> Previous
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  currentPage === num + 1
                    ? "bg-[#9d3e5b] text-white"
                    : "bg-white text-[#a35385] hover:bg-[#e3a7c4]"
                }`}
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </button>
            ))}

            <button
              className={`px-4 py-2 rounded flex items-center ${
                currentPage === totalPages
                  ? "cursor-not-allowed text-[#f0d0e6]"
                  : "text-[#a35385]"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next <IoIosArrowForward className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-2/3">
      {selectedTicket && (
          <div className="border w-full">{renderPage()}</div>
      )}
      </div>
    </div>
  );
}
