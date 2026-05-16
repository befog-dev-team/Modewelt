"use client";
import { TbChartInfographic } from "react-icons/tb";
import { FaPencilRuler, FaCode } from "react-icons/fa";
import { HiOutlineSpeakerphone, HiOutlineDesktopComputer } from "react-icons/hi";
import { MdCameraAlt } from "react-icons/md";
import { PiBagSimpleBold } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";

const jobCategories = [
  {
    title: "Fashion Design",
    jobs: 235,
    icon: <TbChartInfographic />,
  },
  {
    title: "Graphic",
    jobs: 756,
    icon: <FaPencilRuler />,
  },
  {
    title: "Illustrator",
    jobs: 140,
    icon: <HiOutlineSpeakerphone />,
    highlighted: true,
  },
  {
    title: "Textile",
    jobs: 325,
    icon: <MdCameraAlt />,
  },
  {
    title: "Pattern Cutter",
    jobs: 436,
    icon: <HiOutlineDesktopComputer />,
  },
  {
    title: "Trend Forecaster",
    jobs: 542,
    icon: <FaCode />,
  },
  {
    title: "Web Designer",
    jobs: 211,
    icon: <PiBagSimpleBold />,
  },
  {
    title: "UI/UX Designer",
    jobs: 346,
    icon: <IoIosPeople />,
  },
];

export default function CategorySection() {
  return (
    <section className="relative py-12 md:py-24 px-5 overflow-hidden">
      {/* Background Image flipped horizontally */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-x-[-1]"
        style={{
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1771875978337-543eadae2a5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGltcyB0aGVhdHJlJTIwc2VjdGlvbnxlbnwwfHwwfHx8MA%3D%3D')"
        }}
      ></div>
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[4px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#7b4fff] mb-6 text-center leading-tight">
          Explore by <span className="text-[#fc3fb4]">category</span>
        </h2>

        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-20 m-auto sm:mt-2">
          {jobCategories.map((category, index) => (
            <div
              key={index}
              className="group max-w-[274px] w-full h-[214px] p-6 rounded-lg shadow-md cursor-pointer flex flex-col items-center text-center bg-white text-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#fc3fb4]"
            >
              <span className="text-4xl text-[#fc3fb4] transition-all duration-300 group-hover:text-white">
                {category.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-white">
                {category.title}
              </h3>
              <p className="text-sm mt-2 group-hover:text-white">
                jobs available
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
