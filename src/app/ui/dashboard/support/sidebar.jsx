"use client";

import { useState, useMemo } from "react";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import SupportTicket from "./SupportTicket";
import VisitorInfo from "./VisitorInfo";
import UserAvatar from "@/components/UserAvatar";

const Ticket = ({ ticket, onClick, isSelected }) => (
  <div
    className={`p-4 border rounded-lg mb-3 cursor-pointer transition-all duration-200
      ${isSelected ? "bg-[#f2faff] border-[#0c8ce8]" : "bg-white border-gray-200"}
    `}
    onClick={() => onClick(ticket)}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar
          avatarUrl={ticket.avatarUrl}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h3 className="text-lg font-semibold text-gray-800">{ticket.name}</h3>
      </div>
    </div>
    <span className="text-gray-500 text-sm">{ticket.time}</span>
    <p className="text-sm text-gray-600 mt-2">{ticket.message}</p>
    <div className="mt-2">
      {ticket.labels.map((label, index) => {
        const labelStyles = {
          "Open": "bg-blue-100 text-blue-600",
          "● High Priority": "bg-red-100 text-red-600",
          "New": "bg-green-100 text-green-600",
          "Respond": "bg-yellow-100 text-yellow-600",
          "Close": "bg-gray-200 text-gray-700",
        };
        return (
          <span key={index} className={`text-xs px-2 py-1 rounded-full ${labelStyles[label] || "bg-gray-100 text-gray-600"} m-1`}>
            {label}
          </span>
        );
      })}
    </div>
  </div>
);


export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'open', 'high-priority'
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const ticketsPerPage = 6;

  // Fetch data from API
  const { data, isLoading, error } = useQuery({
    queryKey: ["support-tickets", currentPage],
    queryFn: () =>
      ky.get(`/api/admin/support-ticket?page=${currentPage}&pageSize=${ticketsPerPage}`).json(),
    keepPreviousData: true,
  });

  const tickets = data?.tickets || [];
  const totalPages = Math.max(1, Math.ceil((data?.totalReports || 0) / ticketsPerPage));

  // Handle search and filter logic
  const filteredTickets = useMemo(() => {
    return tickets
      .filter((ticket) => ticket.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((ticket) => {
        if (filter === "open") return ticket.labels.includes("Open");
        if (filter === "high-priority") return ticket.labels.includes("● High Priority");
        return true; // Show all if filter is 'all'
      });
  }, [searchTerm, filter, tickets]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-blue-500 size-10 animate-spin" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <strong>Error:</strong> Failed to fetch data
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex gap-6">
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md relative">
        <h2 className="text-xl font-semibold text-gray-800">Recent Tickets</h2>

        {/* Search & Filter */}
        <div className="mt-4 flex gap-2 relative">
          <input
            type="text"
            placeholder="Search by Name"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filter Icon with Dropdown */}
          <div className="relative">
            <div
              className="p-2 border rounded-md bg-gray-100 cursor-pointer"
              onClick={() => setShowFilterMenu((prev) => !prev)}
            >
              <IoFilter className="text-gray-600" />
            </div>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
                <button
                  className={`block w-full text-left px-4 py-2 ${filter === "all" ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
                  onClick={() => { setFilter("all"); setShowFilterMenu(false); }}
                >
                  All
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 ${filter === "open" ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
                  onClick={() => { setFilter("open"); setShowFilterMenu(false); }}
                >
                  Open
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 ${filter === "high-priority" ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
                  onClick={() => { setFilter("high-priority"); setShowFilterMenu(false); }}
                >
                  High Priority
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ticket List */}
        <div className="mt-4">
          <div className="flex justify-between text-gray-700 font-medium mb-2">
            <span>Filtered Tickets ({filteredTickets.length})</span>
          </div>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) =>
              <Ticket
                key={ticket.id}
                ticket={ticket}
                onClick={setSelectedTicket}
                isSelected={selectedTicket?.id === ticket.id} 
              />
            )
          ) : (
            <div className="text-center text-gray-500">No tickets found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 rounded-md text-blue-500 disabled:text-gray-400"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <IoIosArrowBack /> Prev
          </button>

          <span className="text-gray-700">{currentPage} / {totalPages}</span>

          <button
            className="px-4 py-2 rounded-md text-blue-500 disabled:text-gray-400"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="w-2/3">
        {selectedTicket ? (
          <div className="bg-gray-100 min-h-screen">
            <SupportTicket />
            <VisitorInfo />
          </div>
        ) : (
          <div className="bg-white min-h-screen flex justify-center items-center text-gray-500 text-2xl">
            Select a ticket to view details.
          </div>
        )}
      </div>
    </div>
  );
}
