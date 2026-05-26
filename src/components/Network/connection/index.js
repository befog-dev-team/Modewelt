"use client";
import Image from "next/image";
// import Link from "next/link";
import { useEffect, useState } from "react";
import ConnectionList from "./ConnectionList";
import { formatNumber } from "@/lib/utils";

export default function Connection() {
  const [connectionsToday, setConnectionsToday] = useState([]);
  const [connectionsLastWeek, setConnectionsLastWeek] = useState([]);
  const [connectionsLastMonth, setConnectionsLastMonth] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchConnections = async (period) => {
      try {
        const res = await fetch(`/api/connections?period=${period}`);
        const data = await res.json();
        return data.connections || [];
      } catch (error) {
        console.error("Error fetching connections:", error);
        return [];
      }
    };

    const fetchData = async () => {
      const todayConnections = await fetchConnections("today");
      const lastWeekConnections = await fetchConnections("last-week");
      const lastMonthConnections = await fetchConnections("last-month");

      setConnectionsToday(todayConnections);
      setConnectionsLastWeek(lastWeekConnections);
      setConnectionsLastMonth(lastMonthConnections);
    };

    fetchData();
  }, []);

  return (
    <div className="Connections px-4 sm:px-8 lg:px-12">
      <div className="mb-24 space-y-8">
        {/* Connections Section */}
        <div className="text-center">
          <p className="font-[Arial] text-[#fc3fb4] text-[20px] sm:text-[24px] font-bold uppercase leading-[23px]">
            Connections
          </p>
        </div>

        {/* Connection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { period: "Today", connections: connectionsToday },
            { period: "Last Week", connections: connectionsLastWeek },
            { period: "Last Month", connections: connectionsLastMonth }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white w-full sm:w-[300px] h-auto rounded-[4px] p-4 shadow-md hover:shadow-lg transition-shadow ease-in-out duration-300 relative"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="font-[Arial] font-bold text-[13px] uppercase">
                  {item.period}
                </div>
                <div className="relative">
                  <Image
                    alt="three dots"
                    height={24}
                    width={24}
                    src="/assets/network/connections/threedots.png"
                    className="cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === index ? null : index);
                    }}
                  />
                  {openDropdown === index && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-100 rounded-md shadow-xl z-20 py-1 transition-all duration-200">
                      <button className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 text-gray-700 font-medium">
                        See Stats
                      </button>
                      <button className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 text-gray-700 font-medium">
                        See All
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* New Connection Info */}
              <div className="flex items-center gap-2 mb-4">
                <div className="min-w-[33px] min-h-[33px] font-[Arial] text-[16px] flex justify-center items-center text-white bg-[#fc3fb4] rounded-[4px]">
                  {item.connections.length > 0 ? `${formatNumber(item.connections.length)}+` : "0"}
                </div>
                <div className="text-[#fc3fb4] font-bold text-[12px] uppercase">
                  New Connection
                </div>
              </div>
            </div>
          ))}
        </div>    

        {/* Divider */}
        <div className="flex items-center space-x-4 mt-8">
          <hr className="flex-grow border-[#E7E7E7]" />
          <span className="font-[Gotham] font-bold text-[12px] text-[rgb(24,24,24)] uppercase">
            Your Connections
          </span>
          <hr className="flex-grow border-[#E7E7E7]" />
        </div>

        {/* Your Connections */}
        <ConnectionList />
      </div>
    </div>
  );
}
