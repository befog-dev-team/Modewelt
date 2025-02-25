"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import PieChart from "@/app/ui/dashboard/dashboard/piechart";
import GrowthChart from "@/app/ui/dashboard/dashboard/growthchart";
// import RevenueChart from "@/app/ui/dashboard/dashboard/revenuechart";
// import UserMapChart from "../ui/dashboard/dashboard/usermapchart";
import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import AdminDatePicker from "../ui/common/AdminDatePicker";

export default function Dashboard({ admin }) {
  const dropdownRef = useRef(null);

  // Fetch and cache stats using useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: admin?.id ? ["admin-dashboard-stats", admin.id] : ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/dashboard");
      return res.data;
    },
    enabled: Boolean(admin?.id),
  });

  // Memoize stats to prevent unnecessary re-renders
  const stats = useMemo(() => data || {
    newRegistrations: 0,
    companies: 0,
    activeUsers: 0,
    totalUsers: 0,
  }, [data]);

  // Handle click outside dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState({
    start: "17 April 2020",
    end: "21 May 2020",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (start, end) => {
    setSelectedPeriod({ start, end });
    setIsOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center bg-red-100 text-red-700 p-4 rounded-md">
        <p><strong>Error:</strong> {error.response?.data?.message || error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-fit">
      <div className="flex-1 flex flex-col">
        <main className="p-4">
          <header className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="mt-1 text-gray-600">
                  Hi {admin.displayName || admin.username}, Welcome back to Modeweltjob Admin Panel!
                </p>
              </div>
              <div className="relative">
                <AdminDatePicker />
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              {
                title: "New Registration",
                value: stats.newRegistrations,
                img: (
                  <svg
                    width="59"
                    height="44"
                    viewBox="0 0 59 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.75391 43.2337C8.92078 43.2337 11.5083 40.6217 11.5083 37.425V0H45.1081V37.425C45.1081 40.6217 42.5206 43.2337 39.3537 43.2337"
                      fill="#DA65AF"
                    />
                    <path
                      d="M33.5998 37.4249V33.0197H0V37.4249C0 40.6216 2.58757 43.2336 5.75445 43.2336H39.3542C36.1873 43.2336 33.5998 40.6216 33.5998 37.4249Z"
                      fill="#A45286"
                    />
                    <path
                      d="M21.8201 7.4458H17.5332V9.31705H21.8201V7.4458Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 7.4458H25.1426V9.31705H38.3121V7.4458Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M21.8201 14.0731H17.5332V15.9444H21.8201V14.0731Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 14.0731H25.1426V15.9444H38.3121V14.0731Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M21.8201 20.7007H17.5332V22.5719H21.8201V20.7007Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 20.7007H25.1426V22.5719H38.3121V20.7007Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M21.8201 27.328H17.5332V29.1993H21.8201V27.328Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 27.328H25.1426V29.1993H38.3121V27.328Z"
                      fill="#F7C604"
                    />
                    <path
                      opacity="0.1"
                      d="M45.1078 27.64V5.37989C44.6444 5.30192 44.1423 5.26294 43.6403 5.26294C37.4996 5.26294 32.5176 10.2919 32.5176 16.4904C32.5176 22.689 37.4996 27.7179 43.6403 27.7179C44.1423 27.7569 44.6444 27.7179 45.1078 27.64Z"
                      fill="#0C1E5B"
                    />
                    <path
                      d="M47.5427 25.496C53.6857 25.496 58.6655 20.4692 58.6655 14.2684C58.6655 8.06755 53.6857 3.04077 47.5427 3.04077C41.3998 3.04077 36.4199 8.06755 36.4199 14.2684C36.4199 20.4692 41.3998 25.496 47.5427 25.496Z"
                      fill="#FF5B5B"
                    />
                    <path
                      d="M49.5108 15.0479V8.0697H45.5715V15.0479H42.9453L47.5411 20.4667L52.137 15.0479H49.5108Z"
                      fill="white"
                    />
                  </svg>
                ),
              },
              {
                title: "Company",
                value: stats.companies,
                img: (
                  <svg
                    width="59"
                    height="44"
                    viewBox="0 0 59 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.75391 43.2337C8.92078 43.2337 11.5083 40.6217 11.5083 37.425V0H45.1081V37.425C45.1081 40.6217 42.5206 43.2337 39.3537 43.2337"
                      fill="#DA65AF"
                    />
                    <path
                      d="M33.5998 37.4249V33.0197H0V37.4249C0 40.6216 2.58757 43.2336 5.75445 43.2336H39.3542C36.1873 43.2336 33.5998 40.6216 33.5998 37.4249Z"
                      fill="#A45286"
                    />
                    <path
                      d="M21.8201 7.4458H17.5332V9.31705H21.8201V7.4458Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 7.4458H25.1426V9.31705H38.3121V7.4458Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M21.8201 14.0731H17.5332V15.9444H21.8201V14.0731Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 14.0731H25.1426V15.9444H38.3121V14.0731Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M21.8201 20.7007H17.5332V22.5719H21.8201V20.7007Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 20.7007H25.1426V22.5719H38.3121V20.7007Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M21.8201 27.328H17.5332V29.1993H21.8201V27.328Z"
                      fill="white"
                    />
                    <path
                      d="M38.3121 27.328H25.1426V29.1993H38.3121V27.328Z"
                      fill="#F7C604"
                    />
                    <path
                      opacity="0.1"
                      d="M45.1078 27.64V5.37989C44.6444 5.30192 44.1423 5.26294 43.6403 5.26294C37.4996 5.26294 32.5176 10.2919 32.5176 16.4904C32.5176 22.689 37.4996 27.7179 43.6403 27.7179C44.1423 27.7569 44.6444 27.7179 45.1078 27.64Z"
                      fill="#0C1E5B"
                    />
                    <path
                      d="M47.5427 25.496C53.6857 25.496 58.6655 20.4692 58.6655 14.2684C58.6655 8.06755 53.6857 3.04077 47.5427 3.04077C41.3998 3.04077 36.4199 8.06755 36.4199 14.2684C36.4199 20.4692 41.3998 25.496 47.5427 25.496Z"
                      fill="#FF5B5B"
                    />
                    <path
                      d="M49.5108 15.0479V8.0697H45.5715V15.0479H42.9453L47.5411 20.4667L52.137 15.0479H49.5108Z"
                      fill="white"
                    />
                  </svg>
                ),
              },
              {
                title: "Active User",
                value: stats.activeUsers,
                img: (
                  <svg
                    width="60"
                    height="44"
                    viewBox="0 0 60 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.13672 43.2747C9.30359 43.2747 11.8912 40.6627 11.8912 37.466V0.0410156H45.4909V37.466C45.4909 40.6627 42.9034 43.2747 39.7365 43.2747"
                      fill="#DA65AF"
                    />
                    <path
                      d="M33.9826 37.4659V33.0607H0.382812V37.4659C0.382812 40.6626 2.97039 43.2746 6.13726 43.2746H39.737C36.5702 43.2746 33.9826 40.6626 33.9826 37.4659Z"
                      fill="#A45286"
                    />
                    <path
                      d="M22.2029 7.48682H17.916V9.35807H22.2029V7.48682Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M38.695 7.48682H25.5254V9.35807H38.695V7.48682Z"
                      fill="#F3F2F7"
                    />
                    <path
                      d="M22.2029 14.1141H17.916V15.9854H22.2029V14.1141Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M38.695 14.1141H25.5254V15.9854H38.695V14.1141Z"
                      fill="#F3F2F7"
                    />
                    <path
                      d="M22.2029 20.7417H17.916V22.6129H22.2029V20.7417Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M38.695 20.7417H25.5254V22.6129H38.695V20.7417Z"
                      fill="#F3F2F7"
                    />
                    <path
                      d="M22.2029 27.369H17.916V29.2403H22.2029V27.369Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M38.695 27.369H25.5254V29.2403H38.695V27.369Z"
                      fill="#F3F2F7"
                    />
                    <path
                      opacity="0.1"
                      d="M45.4907 27.681V5.42091C45.0272 5.34294 44.5251 5.30396 44.0231 5.30396C37.8824 5.30396 32.9004 10.3329 32.9004 16.5315C32.9004 22.73 37.8824 27.7589 44.0231 27.7589C44.5251 27.7979 45.0272 27.759 45.4907 27.681Z"
                      fill="#0C1E5B"
                    />
                    <path
                      d="M47.9255 25.537C54.0685 25.537 59.0483 20.5102 59.0483 14.3094C59.0483 8.10856 54.0685 3.08179 47.9255 3.08179C41.7826 3.08179 36.8027 8.10856 36.8027 14.3094C36.8027 20.5102 41.7826 25.537 47.9255 25.537Z"
                      fill="#FF5B5B"
                    />
                    <path
                      d="M52.2925 9.73083L43.2129 18.8847"
                      stroke="white"
                      strokeWidth="4"
                    />
                    <path
                      d="M52.2925 9.73083L43.2129 18.8847"
                      stroke="white"
                      strokeWidth="4"
                    />
                  </svg>
                ),
              },
              {
                title: "Total User",
                value: stats.totalUsers,
                img: (
                  <svg
                    width="63"
                    height="63"
                    viewBox="0 0 63 63"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.5 26.25C37.299 26.25 42 21.549 42 15.75C42 9.95101 37.299 5.25 31.5 5.25C25.701 5.25 21 9.95101 21 15.75C21 21.549 25.701 26.25 31.5 26.25Z"
                      fill="#A45286"
                    />
                    <path
                      d="M52.5 45.9375C52.5 52.4606 52.5 57.75 31.5 57.75C10.5 57.75 10.5 52.4606 10.5 45.9375C10.5 39.4144 19.9027 34.125 31.5 34.125C43.0973 34.125 52.5 39.4144 52.5 45.9375Z"
                      fill="#A45286"
                    />
                  </svg>
                ),
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl flex items-center p-5 h-[180px] space-x-4"
              >
                <div className="bg-[#ffcfed] h-[90px] w-[90px] flex items-center justify-center rounded-full">
                  {stat.img}
                </div>
                <div className="flex flex-col">
                  <p className="text-4xl font-extrabold text-gray-800">
                    {stat.value}
                  </p>
                  <h2 className="text-sm font-medium text-gray-500 mt-1">
                    {stat.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PieChart
              totalUsers={data.totalUsers}
              activeUsers={data.activeUsers}
              inactiveUsers={data.inactiveUsers}
              newRegistrations={data.newRegistrations}
            />
            <GrowthChart data={data.formattedData} />
          </div>

          {/* Graphs Section */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <UserMapChart />
          </div> */}
        </main>
      </div>
    </div>
  );
}
