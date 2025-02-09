"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../../public/Images/logo.png"

const Footer = () => {
  const use_case = [
    { title: "About", link: "/", id: "about" },
    { title: "Career", link: "/career", id: "career" },
    { title: "Advertising", link: "/advertising", id: "advertising" },
    { title: "Small Business", link: "/business", id: "business" },
  ];

  const services = [
    { title: "Talent Solutions", link: "/talent", id: "talent" },
    { title: "Marketing Solutions", link: "/marketing", id: "marketing" },
    { title: "Sales Solutions", link: "/sales", id: "sales" },
    { title: "Safety Center", link: "/safety", id: "safety" },
  ];

  const explore = [
    { title: "Community Guidelines", link: "/comunity", id: "community" },
    { title: "Privacy & Terms", link: "/terms", id: "terms" },
    { title: "Mobile App", link: "/app", id: "app" },
  ];

  return (
    <>
      <div className="w-full mx-auto h-px bg-[#A45286] mt-16 sm:mt-20 lg:mt-24" />
      <footer className="bg-[#F7F9FB] py-8 sm:py-10 lg:py-12">
        <div className="mx-4 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Link href="/" className="">
              <Image
                src={logo}
                alt="logo"
                height={80}
                width={80}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-bold text-[#333333] text-xs sm:text-sm lg:text-base mb-4">Navigation</h2>
            <ul>
              {use_case.map((link, index) => (
                <li key={index} className="my-1 text-sm sm:text-base text-[#181818]">
                  <Link
                    href={link.link}
                    className="block py-1 text-black hover:text-[#A45286] transition duration-200 ease-in-out"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-bold text-[#333333] text-xs sm:text-sm lg:text-base mb-4">Services</h2>
            <ul>
              {services.map((link, index) => (
                <li key={index} className="my-1 text-sm sm:text-base text-[#181818]">
                  <Link
                    href={link.link}
                    className="block py-1 text-black hover:text-[#A45286] transition duration-200 ease-in-out"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h2 className="font-bold text-[#333333] text-xs sm:text-sm lg:text-base mb-4">Explore</h2>
            <ul>
              {explore.map((link, index) => (
                <li key={index} className="my-1 text-sm sm:text-base text-[#181818]">
                  <Link
                    href={link.link}
                    className="block py-1 text-black hover:text-[#A45286] transition duration-200 ease-in-out"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fast Access Section */}
          <div className="flex flex-col justify-start items-start">
            <h2 className="font-bold text-[#333333] text-xs sm:text-sm lg:text-base mb-4">Fast Access</h2>
            <ul>
              <li className="my-1 text-sm sm:text-base relative">
                <Link href="/quick-access-1">
                  <button className="font-[Gotham] text-white bg-[#934276] border border-[#934276] w-full sm:w-[170px] h-[32px] gap-3 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-[12px] sm:text-base px-3 py-2.5 inline-flex items-center">
                    Questions?
                    <Image
                      src="/assets/footer/question.png"
                      alt="question"
                      width={16}
                      height={16}
                    />
                  </button>
                </Link>
              </li>
              <li className="my-1 text-sm sm:text-base relative">
                <Link href="/setting">
                  <button className="font-[Gotham] text-[#934276] bg-white border border-[#934276] w-full sm:w-[170px] h-[32px] gap-3 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-[12px] sm:text-base px-3 py-2.5 inline-flex items-center">
                    Settings
                    <Image
                      src="/assets/footer/setting.png"
                      alt="setting"
                      width={16}
                      height={16}
                    />
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Language Section */}
          <div className="flex flex-col justify-start items-start">
            <h2 className="font-bold text-[#333333] text-xs sm:text-sm lg:text-base mb-4">Language</h2>
            <select className="w-full sm:w-[200px] h-[32px] border border-[#F0F0F0] text-[#181818] py-1 px-2 text-sm sm:text-base uppercase">
              <option value="en" className="text-[#181818]">
                English
              </option>
              <option value="es" className="text-[#181818]">
                Spanish
              </option>
              <option value="fr" className="text-[#181818]">
                French
              </option>
              <option value="de" className="text-[#181818]">
                German
              </option>
            </select>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
