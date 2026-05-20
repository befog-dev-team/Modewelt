"use client";

import DashboardCards from "../../../components/States/DashboardCards";
import ResponsiveChart from "../../../components/States/ResponsiveChart";
import Dashboard from "../../../components/States/Dashboard";
import Image from "next/image";
import Rocket from "../../../../public/assets/states/rocket.png";

// import Footer from "../../../components/Footer/index";

const Stats = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 opacity-[0.25]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-white/75 backdrop-blur-[1px] -z-10"></div>

      <div className="flex flex-col lg:flex-row justify-center mt-12 mb-10 space-y-10 lg:space-x-10 lg:space-y-0 relative z-10">
        {/* Main Content */}
        <div className="max-w-[850px] w-full p-6 rounded-lg">
          {/* Welcome Banner */}
          <div className="flex flex-col bg-white space-y-0 p-4 pb-6 rounded-lg shadow-md">
            <h1 className="text-[#a65386] font-bold text-2xl">
              Welcome Back, Aditya Kumar Kanaujiya
            </h1>
            <p className="text-gray-600">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          {/* Dashboard Stats and Insights */}
          <div className="bg-white mt-4 rounded-lg shadow-md">
            {/* Dashboard Cards */}
            <DashboardCards />

            {/* Insights Section */}
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-6">Insights</h1>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <ResponsiveChart />
              </div>
            </div>

            {/* Additional Dashboard Content */}
            <Dashboard />
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="mt-5 max-w-[306px] w-full m-auto">
          {/* Placeholder for Additional Content */}
          <div className="max-h-[360px] p-4 h-full text-center text-white rounded-lg shadow-md bg-gradient-to-r from-[#ab5488] via-[#ba568d] to-[#c75891]">
            <p>Additional content will go here.</p>
          </div>

          {/* Boast Your Account Section */}
          <div className="max-h-[263px] max-w-[306px] w-full p-6 h-full text-white mt-8 rounded-lg shadow-md bg-gradient-to-r from-[#ab5488] via-[#ba568d] to-[#c75891]">
            <h1 className="font-bold text-[1.6rem] text-center my-4">
              Boast Your Account
            </h1>
            <p className="text-center">
              Amet minim mollit non deserunt <br />
              ullamco est sit aliqua dolor do <br />
              amet sint. Velit officia <br />
              consequat duis enim velit <br />
              mollit.
            </p>
            <div className="relative w-[500px] mt-[-7rem] flex justify-center">
              <Image
                src={Rocket}
                alt="Rocket"
                width={220}
                height={40}
                className="object-contain pt-[-20px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Stats;
