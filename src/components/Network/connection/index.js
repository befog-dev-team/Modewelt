import Image from "next/image";
// import Link from "next/link";
import { useEffect, useState } from "react";
import ConnectionList from "./ConnectionList";
import { formatNumber } from "@/lib/utils";

export default function Connection() {
  const [connectionsToday, setConnectionsToday] = useState([]);
  const [connectionsLastWeek, setConnectionsLastWeek] = useState([]);
  const [connectionsLastMonth, setConnectionsLastMonth] = useState([]);

  useEffect(() => {
    const fetchConnections = async (period) => {
      const res = await fetch(`/api/connections?period=${period}`);
      const data = await res.json();
      return data.connections || [];
    };

    // Fetch connections for each period
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
          <p className="font-[Arial] text-[#A45286] text-[20px] sm:text-[24px] font-bold uppercase leading-[23px]">
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
              className="bg-white w-full sm:w-[300px] h-auto rounded-[4px] p-4 shadow-md hover:shadow-lg transition-shadow ease-in-out duration-300"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="font-[Arial] font-bold text-[13px] uppercase">
                  {item.period}
                </div>
                <Image
                  alt="three dots"
                  height={24}
                  width={24}
                  src="/assets/network/connections/threedots.png"
                  className="cursor-pointer"
                />
              </div>
              {/* New Connection Info */}
              <div className="flex items-center gap-2 mb-4">
                <div className="min-w-[33px] min-h-[33px] font-[Arial] text-[16px] flex justify-center items-center text-white bg-[#A45286] rounded-[4px]">
                  {item.connections.length > 0 ? `${formatNumber(item.connections.length)}+` : "0"}
                </div>
                <div className="text-[#A45286] font-bold text-[12px] uppercase">
                  New Connection
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex justify-between space-x-2">
                {/* <Link href='/states'>
                  <button
                    className="w-1/2 border-t text-sm py-2 hover:text-[#a35285] hover:bg-slate-50 transition-all"
                  >
                    See Stats
                  </button>
                </Link> */}
                {/* <Link href='/states'>
                  <button
                    className="w-1/2 border-t text-sm py-2 hover:text-[#a35285] hover:bg-slate-50 transition-all"
                  >
                    See All
                  </button>
                </Link> */}
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
