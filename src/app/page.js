"use client";

import fashionDesigner from "../../public/Images/Fashion.png";
import Admin from "../../public/Images/admin.png";
import img1 from "../../public/Images/l1.png";
import img2 from "../../public/Images/l2.png";
import img3 from "../../public/Images/l3.png";
import img4 from "../../public/Images/l4.png";
import img5 from "../../public/Images/l5.png";
import img6 from "../../public/Images/l6.png";
import img7 from "../../public/Images/l7.png";
import img8 from "../../public/Images/l8.webp";
import img9 from "../../public/Images/l9.webp";
import img10 from "../../public/Images/l10.png";
import Professionals from "../../public/Images/landing1.png";
import Landing from "../../public/Images/landingsec.png";
import logo from "../../public/Images/logo.svg";
import { getCurrentYear } from "@/lib/utils";
import gsap from "gsap";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { FaUserFriends, FaFileAlt, FaFilter } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { MdCameraAlt } from "react-icons/md";
import { PiBagSimpleBold } from "react-icons/pi";
import { TbChartInfographic } from "react-icons/tb";

const initialFeatures = [
  { title: "Exclusive for Fashion Industry", img: img1 },
  { title: "Connect with Top Brands & Recruiters", img: img2 },
  { title: "Showcase Your Portfolio", img: img3 },
  { title: "Freelance & Full-Time Opportunities", img: img4 },
  { title: "Networking & Collaboration", img: img5 },
  { title: "Verified Job Listings", img: img6 },
  { title: "Career Growth & Learning", img: img7 },
  { title: "Industry Insights & Trends", img: img8 },
  { title: "Mentorship & Expert Guidance", img: img9 },
  { title: "Access to Exclusive Fashion Events", img: img10 },
];

// const features = [
//   {
//     icon: <FaUserFriends className="text-[#7b4fff] text-4xl" />,
//     title: "Unlimited Profile Views",
//     description:
//       "Review endless profiles free-of-cost. Pay only when you want to contact suitable candidates",
//   },
//   {
//     icon: <FaFileAlt className="text-[#7b4fff] text-4xl" />,
//     title: "Auto Generated Resumes",
//     description:
//       "Effortlessly generate downloadable resumes from apna profiles for seamless candidate review.",
//   },
//   {
//     icon: <FaFilter className="text-[#7b4fff] text-4xl" />,
//     title: "Precision Filtering",
//     description: "Use 22+ advanced filters to fine-tune candidate searches.",
//   },
// ];
const features = [
  {
    icon: <FaUserFriends className="text-[#7b4fff] text-4xl" />,
    title: "Unlimited Profile Views",
    description:
      "Review endless profiles free-of-cost. Pay only when you want to contact suitable candidates",
  },
  {
    icon: <FaFileAlt className="text-[#7b4fff] text-4xl" />,
    title: "All Fashion Jobs in One Place",
    description:
      "Find top fashion jobs on ModeweltJob.com without the hassle of searching multiple sites.",
  },
  {
    icon: <FaFilter className="text-[#7b4fff] text-4xl" />,
    title: "Direct Access to Top Brands",
    description:
      "Connect with leading fashion houses, startups, and established brands for job opportunities.",
  },
];

const searchOptions = [
  {
    id: 1,
    title: "Saves Time and Effort",
    description:
      "Users can find and apply for jobs instantly without wasting time surfing across multiple platforms.",
  },
  {
    id: 2,
    title: "Area-based Search",
    description: "Find candidates based on specific geographic locations",
  },
  {
    id: 3,
    title: "Tailored for Fashion Enthusiasts",
    description:
      "Unlike general job portals, ModeweltJob.com focuses exclusively on the fashion industry, providing highly relevant opportunities.",
  },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [mobile, setMobile] = useState("");
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqs = [
    {
      question: "What is ModeweltJob.com?",
      answer:
        "ModeweltJob.com is a dedicated platform that consolidates all top fashion job listings in one place, saving professionals time and effort from searching across multiple websites.",
      isOpen: false,
    },
    {
      question: "How does ModeweltJob.com help job seekers?",
      answer:
        "The platform provides direct access to leading fashion brands, including major fashion houses, startups, and established companies, making it easier to secure interviews and job offers.",
      isOpen: false,
    },
    {
      question: "What types of job opportunities are available?",
      answer:
        "ModeweltJob.com offers both freelance and full-time job opportunities, catering to different career preferences.",
      isOpen: false,
    },
    {
      question: "Does the platform provide job alerts?",
      answer:
        "Yes, job seekers receive real-time notifications about new job openings, exclusive internships, and the latest fashion industry trends.",
      isOpen: false,
    },
    {
      question: "How does ModeweltJob.com improve the hiring process?",
      answer:
        "The platform speeds up recruitment by ensuring quick responses from employers, reducing long waiting times, and making hiring more efficient.",
      isOpen: false,
    },
  ];

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
      title: "Makeup",
      jobs: 211,
      icon: <PiBagSimpleBold />,
    },
    {
      title: "Retail Manager",
      jobs: 346,
      icon: <IoIosPeople />,
    },
  ];
  const jobTags = [
    "Fashion Merchandiser",
    "Textile Designer",
    "Visual Merchandiser",
    "Fashion Designer",
    "Graphic Designer",
    "Model",
    "Trend Forecaster",
    "Fashion Marketing And PR",
    "Textile Designer",
    "Fashion Merchandiser",
    "Graphic Designer",
    "Model",
    "Visual Merchandiser",
    "Fashion Marketing And PR",
    "Fashion Designer",
    "Trend Forecaster",
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // const topWidth = topRef.current.scrollWidth / 2; // Get half width for smooth looping
    // const bottomWidth = bottomRef.current.scrollWidth / 2;

    gsap.to(topRef.current, {
      xPercent: -50, // Move by half its width
      duration: 20,
      repeat: -1,
      ease: "linear",
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0), // Ensure infinite loop
      },
    });

    gsap.to(bottomRef.current, {
      xPercent: 50, // Move opposite direction
      duration: 20,
      repeat: -1,
      ease: "linear",
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });
  }, []);

  const images = [
    "/images/fashion1.png",
    "",
    "/images/fashion3.png",
    "",
    "/images/fashion5.png",
    "",
    "/images/fashion7.png",
    "",
    "/images/fashion9.png",
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const imagesRef = useRef([]);

  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // const handleMouseEnter = (index) => {
  //   gsap.to(imagesRef.current[index], {
  //     scale: 3, // Increase size to cover the Right Section
  //     duration: 0.5,
  //     ease: "power2.out",
  //   });
  // };

  // const handleMouseLeave = (index) => {
  //   gsap.to(imagesRef.current[index], {
  //     scale: 1,
  //     duration: 0.5,
  //     ease: "power2.inOut",
  //   });
  // };

  return (
    <div className="bg-[#daf59d]">
      <nav className="shadow-md py-4 px-6 flex justify-between items-center ">
        {/* Logo */}
        <div className="text-xl font-bold lg:mx-20 md:mx-10 sm:mx-5 mx-2">
          <Image src={logo} alt="Modewelt" width={40} height={40} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:mx-20 md:mx-10 sm:mx-5 mx-2">
          {/* <span className="text-gray-700">Looking for a Job</span> */}
          <Link
            href="/auth"
            className="bg-[#fc3fb4] text-white px-4 py-2 rounded-lg hover:bg-[#fc3fb4] transition"
            prefetch={true}
          >
            Sign up / Log in
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full shadow-md md:hidden flex flex-col items-center space-y-4 py-4 bg-[#daf59d]">
            {/* <span className="text-gray-700">Looking for a Job</span> */}
            <Link
              href="/auth"
              className="bg-[#fc3fb4] text-white px-4 py-2 rounded-lg hover:bg-[#fc3fb4] transition"
              prefetch={true}
            >
              Sign up / Log in
            </Link>
          </div>
        )}
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 sm:py-10 py-2 lg:py-4">
      {/* Left Section */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#7b4fff]">
          The Community for{" "}
          <span className="gradient-text">Fashion Designers</span> & Creatives
        </h1>

        <p className="text-black">An Exclusive Platform for Fashion Designers</p>
        <div className="lg:w-3/4 sm:w-full h-[1px] bg-[#fc3fb4]"></div>
        <button className="border border-[#fc3fb4] text-[#fc3fb4] font-bold px-6 py-2 rounded-lg hover:bg-[#fc3fb4] hover:text-white transition">
          <Link href="/auth" className="mt-4" prefetch={true}>
            Register Now
          </Link>
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 p-6 md:p-8 rounded-lg mt-6 md:mt-0 grid grid-cols-3 gap-4 relative overflow-hidden">
        {images.map((imageSrc, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg aspect-square w-full ${
              imageSrc ? "group" : "bg-[#fc3fb4]"
            }`}
            onClick={() => handleImageClick(index)}
          >
            {imageSrc && (
              <Image
                ref={(el) => (imagesRef.current[index] = el)}
                src={imageSrc}
                alt={`Fashion Design ${index + 1}`}
                width={200}
                height={200}
                className="object-cover w-full h-full aspect-square transition-transform duration-300 cursor-pointer"
              />
            )}
          </div>
        ))}

        {/* Popup inside Right Section */}
        {selectedImage && (
          <div
            className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-10"
            onClick={closeModal}
          >
            <div className="relative w-full h-full">
              <button
                className="absolute top-4 right-4 bg-white text-black rounded-full p-2 text-xl"
                onClick={closeModal}
              >
                ✕
              </button>
              <Image
                src={selectedImage}
                alt="Expanded Fashion Design"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
      <div className="relative flex flex-col items-center justify-center bg-[#dff5a2] m-auto overflow-hidden w-full py-6">
        {/* Left & Right Blur Effect (Subtle) */}
        <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-[#dff5a2] via-[#dff5a2]/50 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-[#dff5a2] via-[#dff5a2]/50 to-transparent pointer-events-none"></div>

        {/* Top Scrolling Text */}
        <div className="w-full overflow-hidden whitespace-nowrap">
          <div ref={topRef} className="flex gap-4">
            {[...jobTags, ...jobTags].map((tag, index) => (
              <span
                key={`top-${index}`}
                className="px-4 py-2 text-gray-700 bg-white border border-pink-300 rounded-full shadow-sm text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Scrolling Text */}
        <div className="w-full overflow-hidden whitespace-nowrap mt-4">
          <div ref={bottomRef} className="flex gap-4">
            {[...jobTags, ...jobTags].map((tag, index) => (
              <span
                key={`bottom-${index}`}
                className="px-4 py-2 text-gray-700 bg-white border border-pink-300 rounded-full shadow-sm text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-[#daf59d] py-10 px-5 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-4xl lg:text-6xl text-gray-800 mb-6 text-left">
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

          {/* <a
            href="#"
            className="inline-block mt-6 text-blue-700 font-semibold hover:underline"
          >
            Show all jobs →
          </a> */}
        </div>
      </section>

      <div className="bg-[#f0fff1] lg:h-[718] flex flex-col items-center p-6 lg:pb-20 sm:pb-10">
        {/* Header Section */}
        <div className="max-w-[750px] w-full text-center lg:px-[90px] lg:py-[101px] p-6 md:p-12 rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7b4fff]">
            The Ultimate Career Platform for{" "}
            <span className="gradient-text">Fashion Designers</span>{" "}
            Professionals
          </h1>
          <p className="mt-2 text-lg text-gray-700 font-bold">
            Build Your Fashion Career with Modeweltjob
          </p>
        </div>

        {/* Content Section */}
        <section className="max-w-6xl w-full grid md:grid-cols-2 items-center gap-8">
          {/* Image Container */}
          <div className="flex justify-center">
            <div className="w-full rounded-lg">
              <Image
                src={Professionals}
                alt="Fashion industry career opportunities"
                className="w-full max-w-md h-64"
              />
            </div>
          </div>

          {/* Description & Button */}
          <div className="text-center md:text-left">
            <p className="mt-4 text-gray-700">
              Are you a fashion designer, stylist, photographer, or industry
              expert looking for the right opportunities? Modewelt is here to
              connect you with top brands, recruiters, and creative
              professionals worldwide. Whether you&apos;re starting your journey
              or leveling up your career, Modewelt makes it easier for you to
              showcase your talent and get hired.
            </p>
            <button className="mt-6 bg-[#fc3fb4] font-bold text-white px-6 py-2 rounded-md shadow-md hover:bg-[#fc3fb4] transition-all duration-300">
              <Link href="/auth" className="mt-4" prefetch={true}>
                Registered Now
              </Link>
            </button>
          </div>
        </section>
      </div>

      <section className="py-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl text-[#7b4fff] md:text-4xl font-bold text-center mb-8">
          Why Choose ModeweltJob?
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {initialFeatures.map((feature, index) => (
              <figure
                key={index}
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex flex-col items-center justify-center rounded-lg p-4 text-center"
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  className="rounded-lg w-40 h-40 sm:w-30 sm:h-30 md:w-56 md:h-56 object-cover mt-4 p-4"
                />
                <figcaption className="text-sm md:text-base font-medium pb-6">
                  {feature.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="p-6 md:p-12 min-h-[50vh] rounded-xl bg-[#f4f2ff] flex flex-col items-center">
        {/* Main Grid Section */}
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="h-[400px] rounded-xl flex justify-center">
            <Image
              src={Landing}
              alt="Modewelt Hiring Platform"
              className="rounded-xl object-cover w-full h-full"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <p className="text-[#7b4fff] uppercase text-sm font-bold tracking-wider">
              ModeweltJob Database
            </p>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug">
              Quickly hire active jobseekers around your office.
            </h2>

            {/* Expandable Options */}
            <div className="space-y-3">
              {searchOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => toggleExpand(option.id)}
                  className="cursor-pointer border-b pb-2 transition-all duration-300"
                >
                  <p className="font-semibold">{option.title}</p>
                  {expanded === option.id && (
                    <p className="text-gray-600 text-sm">
                      {option.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-4 justify-center text-center bg-[#fc3fb4] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#fc3fb4] transition-all duration-300">
              Search Candidates
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {feature.icon}
              <h3 className="font-semibold mt-2 text-lg">{feature.title}</h3>
              <p className="text-black text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:pt-16 sm:pt-4">
        <section className="max-w-[1192px] w-full flex flex-col md:flex-row items-center justify-between bg-[#4640de] text-white p-8 md:p-16 m-auto gap-10">
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start posting jobs today
            </h1>
            <p className="text-lg mb-6">Start posting jobs for only Free.</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
              <Link href="/auth" prefetch={true}>
                Sign Up For Free
              </Link>
            </button>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <Image
              src={Admin}
              alt="Dashboard Preview"
              width={600}
              height={400}
              className="rounded-md shadow-lg"
            />
          </div>
        </section>
      </div>
      <div className=" flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-[1192px] w-full">
          <h2 className="text-2xl font-bold text-black">
            Frequently asked questions
          </h2>
          <div className="mt-4 border-t border-gray-300">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="text-lg text-black">{faq.question}</span>
                  <span className="text-black">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="text-black px-4 pb-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1192px] w-full my-8 border-t border-[#fc3fb4] mt-10 p-[4px]" />
        <div className="text-center">
          <h3 className="text-2xl font-bold text-black">
            Let&apos;s hire your next great candidate
          </h3>
          <p className="text-black mt-6">
            A hiring platform built to solve for relevancy, volume and speed of
            hiring
          </p>
          <div className="mt-6 grid lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-center sm:justify-start">
            <button className="px-6 py-3 bg-[#fc3fb4] text-white font-semibold rounded-lg shadow-md hover:bg-[#fc3fb4] transition w-full sm:w-auto">
              <Link href="/auth" prefetch={true}>
                Login/Sign up
              </Link>
            </button>
            <button className="px-6 py-3 border border-[#fc3fb4] text-[#fc3fb4] font-semibold rounded-lg hover:bg-gray-100 transition w-full sm:w-auto">
              <a href="mailto:contact.us@befog.in">Contact us</a>
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full flex justify-center items-center bg-gray-900 text-gray-400 mt-16 py-8">
        {/* <div className="max-w-6xl mx-auto px-6 md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="bg-gray-700 h-12 w-12 rounded-md"></div>
            <div className="flex space-x-4 mt-4">
              <span className="bg-gray-700 h-6 w-6 rounded-full"></span>
              <span className="bg-gray-700 h-6 w-6 rounded-full"></span>
              <span className="bg-gray-700 h-6 w-6 rounded-full"></span>
              <span className="bg-gray-700 h-6 w-6 rounded-full"></span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            <div>
              <h4 className="text-white font-semibold mb-2">PRODUCT</h4>
              <ul className="space-y-1">
                <li>Job posting</li>
                <li>Database</li>
                <li>WhatsApp fast recruit</li>
                <li>Enterprise</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">GET TO KNOW US</h4>
              <ul className="space-y-1">
                <li>Careers</li>
                <li>Contact support</li>
                <li>Contact sales</li>
                <li>Job seekers</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">RESOURCES</h4>
              <ul className="space-y-1">
                <li>Apna help center</li>
                <li>Blogs</li>
              </ul>
            </div>
          </div>
        </div> */}
        <div className="border-gray-700 text-sm">
          <p>© {getCurrentYear()} Modeweltjob | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
