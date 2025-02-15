"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../../../public/Images/logo.png";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { FaUserFriends, FaFileAlt, FaFilter } from "react-icons/fa";
import Admin from "../../../public/Images/admin.png";
import fashionDesigner from "../../../public/Images/Fashion.png";
import Professionals from "../../../public/Images/landing1.png";
import Landing from "../../../public/Images/landingsec.png";
import img1 from "../../../public/Images/l1.png";
import img2 from "../../../public/Images/l2.png";
import img3 from "../../../public/Images/l3.png";
import img4 from "../../../public/Images/l4.png";
import img5 from "../../../public/Images/l5.png";
import img6 from "../../../public/Images/l6.png";
import img7 from "../../../public/Images/l7.png";
import img8 from "../../../public/Images/l8.webp";
import img9 from "../../../public/Images/l9.webp";
import img10 from "../../../public/Images/l10.png";

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

const features = [
  {
    icon: <FaUserFriends className="text-[#f26744] text-4xl" />,
    title: "Unlimited Profile Views",
    description:
      "Review endless profiles free-of-cost. Pay only when you want to contact suitable candidates",
  },
  {
    icon: <FaFileAlt className="text-[#f26744] text-4xl" />,
    title: "Auto Generated Resumes",
    description:
      "Effortlessly generate downloadable resumes from apna profiles for seamless candidate review.",
  },
  {
    icon: <FaFilter className="text-[#f26744] text-4xl" />,
    title: "Precision Filtering",
    description: "Use 22+ advanced filters to fine-tune candidate searches.",
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
    description: "Unlike general job portals, ModeweltJob.com focuses exclusively on the fashion industry, providing highly relevant opportunities.",
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
      question: "Why should I use Modeweltjob over others?",
      answer: "Modeweltjob offers the best features for hiring efficiently.",
      isOpen: false,
    },
    {
      question: "What happens if I don't receive enough candidates?",
      answer:
        "We ensure a continuous stream of candidates to match your requirements.",
      isOpen: false,
    },
    {
      question: "In which cities can I hire via modeweltjob?",
      answer: "Modeweltjob operates in multiple cities nationwide.",
      isOpen: false,
    },
    {
      question:
        "I want to hire more than 10 candidates, do you have any bulk-hiring plans?",
      answer: "Yes, we offer bulk-hiring solutions tailored to your needs.",
      isOpen: false,
    },
  ];
  const jobCategories = [
    {
      title: "Fashion Design",
      jobs: 235,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 22C18.4183 22 22 18.4183 22 14C22 9.58172 18.4183 6 14 6C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22Z"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 6V14H22"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 34V42"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34 28V42"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 26V42"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 24V42"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Graphic",
      jobs: 756,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3692_17197)">
            <path
              d="M6 42.0001H14L40 16.0001C41.0609 14.9392 41.6569 13.5003 41.6569 12.0001C41.6569 10.4998 41.0609 9.06092 40 8.00005C38.9391 6.93919 37.5003 6.3432 36 6.3432C34.4997 6.3432 33.0609 6.93919 32 8.00005L6 34.0001V42.0001Z"
              stroke="#F26643"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M29 11L37 19"
              stroke="#F26643"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 16L14 6L6 14L16 24"
              stroke="#F26643"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 16L11 19"
              stroke="#F26643"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 24L42 34L34 42L24 32"
              stroke="#F26643"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 34L29 37"
              stroke="#F26643"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_3692_17197">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Illustrator",
      jobs: 140,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.9999 11.764V38.48C21.9993 39.3089 21.7062 40.1111 21.1722 40.7451C20.6382 41.3791 19.8976 41.8043 19.0808 41.9458C18.2641 42.0873 17.4236 41.936 16.7074 41.5186C15.9912 41.1012 15.4453 40.4444 15.1659 39.664L10.8719 27.364M35.9999 26C37.5912 26 39.1174 25.3679 40.2426 24.2426C41.3678 23.1174 41.9999 21.5913 41.9999 20C41.9999 18.4087 41.3678 16.8826 40.2426 15.7574C39.1174 14.6321 37.5912 14 35.9999 14V26ZM10.8719 27.366C9.17437 26.6442 7.7783 25.3581 6.91999 23.7253C6.06168 22.0925 5.79385 20.2134 6.16181 18.4058C6.52976 16.5982 7.51092 14.9733 8.93924 13.806C10.3676 12.6387 12.1553 12.0007 13.9999 12H17.6639C25.8639 12 32.9139 9.532 35.9999 6V34C32.9139 30.468 25.8659 28 17.6639 28H13.9999C12.9252 28.0016 11.8612 27.7859 10.8719 27.366Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      highlighted: true,
    },
    {
      title: "Textile",
      jobs: 325,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34 18V14C34 12.9391 33.5786 11.9217 32.8284 11.1716C32.0783 10.4214 31.0609 10 30 10H10C8.93913 10 7.92172 10.4214 7.17157 11.1716C6.42143 11.9217 6 12.9391 6 14V26C6 27.0609 6.42143 28.0783 7.17157 28.8284C7.92172 29.5786 8.93913 30 10 30H14M18 38H38C39.0609 38 40.0783 37.5786 40.8284 36.8284C41.5786 36.0783 42 35.0609 42 34V22C42 20.9391 41.5786 19.9217 40.8284 19.1716C40.0783 18.4214 39.0609 18 38 18H18C16.9391 18 15.9217 18.4214 15.1716 19.1716C14.4214 19.9217 14 20.9391 14 22V34C14 35.0609 14.4214 36.0783 15.1716 36.8284C15.9217 37.5786 16.9391 38 18 38ZM32 28C32 29.0609 31.5786 30.0783 30.8284 30.8284C30.0783 31.5786 29.0609 32 28 32C26.9391 32 25.9217 31.5786 25.1716 30.8284C24.4214 30.0783 24 29.0609 24 28C24 26.9391 24.4214 25.9217 25.1716 25.1716C25.9217 24.4214 26.9391 24 28 24C29.0609 24 30.0783 24.4214 30.8284 25.1716C31.5786 25.9217 32 26.9391 32 28Z"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Pattern Cutter",
      jobs: 436,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 34L18 40L16 42H32L30 40L28.5 34H19.5ZM6 26H42H6ZM10 34H38C39.0609 34 40.0783 33.5786 40.8284 32.8284C41.5786 32.0783 42 31.0609 42 30V10C42 8.93913 41.5786 7.92172 40.8284 7.17157C40.0783 6.42143 39.0609 6 38 6H10C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10V30C6 31.0609 6.42143 32.0783 7.17157 32.8284C7.92172 33.5786 8.93913 34 10 34Z"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Trend Forecaster",
      jobs: 542,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 40L28 8M36 16L44 24L36 32M12 32L4 24L12 16"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Makeup",
      jobs: 211,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42 26.51C36.281 28.8225 30.1688 30.0075 24 30C17.634 30 11.56 28.76 6 26.51M24 24H24.02M32 12V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H20C18.9391 4 17.9217 4.42143 17.1716 5.17157C16.4214 5.92172 16 6.93913 16 8V12H32ZM10 40H38C39.0609 40 40.0783 39.5786 40.8284 38.8284C41.5786 38.0783 42 37.0609 42 36V16C42 14.9391 41.5786 13.9217 40.8284 13.1716C40.0783 12.4214 39.0609 12 38 12H10C8.93913 12 7.92172 12.4214 7.17157 13.1716C6.42143 13.9217 6 14.9391 6 16V36C6 37.0609 6.42143 38.0783 7.17157 38.8284C7.92172 39.5786 8.93913 40 10 40Z"
            stroke="#F26643"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Retail Manager",
      jobs: 346,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 10C22.9391 10 21.9217 10.4214 21.1716 11.1716C20.4214 11.9217 20 12.9391 20 14C20 15.0609 20.4214 16.0783 21.1716 16.8284C21.9217 17.5786 22.9391 18 24 18C25.0609 18 26.0783 17.5786 26.8284 16.8284C27.5786 16.0783 28 15.0609 28 14C28 12.9391 27.5786 11.9217 26.8284 11.1716C26.0783 10.4214 25.0609 10 24 10ZM18.3431 8.34315C19.8434 6.84285 21.8783 6 24 6C26.1217 6 28.1566 6.84285 29.6569 8.34315C31.1571 9.84344 32 11.8783 32 14C32 16.1217 31.1571 18.1566 29.6569 19.6569C28.1566 21.1571 26.1217 22 24 22C21.8783 22 19.8434 21.1571 18.3431 19.6569C16.8429 18.1566 16 16.1217 16 14C16 11.8783 16.8429 9.84344 18.3431 8.34315ZM10 18C9.46957 18 8.96086 18.2107 8.58579 18.5858C8.21071 18.9609 8 19.4696 8 20C8 20.5304 8.21071 21.0391 8.58579 21.4142C8.96086 21.7893 9.46957 22 10 22C10.5304 22 11.0391 21.7893 11.4142 21.4142C11.7893 21.0391 12 20.5304 12 20C12 19.4696 11.7893 18.9609 11.4142 18.5858C11.0391 18.2107 10.5304 18 10 18ZM5.75736 15.7574C6.88258 14.6321 8.4087 14 10 14C11.5913 14 13.1174 14.6321 14.2426 15.7574C15.3679 16.8826 16 18.4087 16 20C16 21.5913 15.3679 23.1174 14.2426 24.2426C13.1174 25.3679 11.5913 26 10 26C8.4087 26 6.88258 25.3679 5.75736 24.2426C4.63214 23.1174 4 21.5913 4 20C4 18.4087 4.63214 16.8826 5.75736 15.7574ZM38 18C37.4696 18 36.9609 18.2107 36.5858 18.5858C36.2107 18.9609 36 19.4696 36 20C36 20.5304 36.2107 21.0391 36.5858 21.4142C36.9609 21.7893 37.4696 22 38 22C38.5304 22 39.0391 21.7893 39.4142 21.4142C39.7893 21.0391 40 20.5304 40 20C40 19.4696 39.7893 18.9609 39.4142 18.5858C39.0391 18.2107 38.5304 18 38 18ZM33.7574 15.7574C34.8826 14.6321 36.4087 14 38 14C39.5913 14 41.1174 14.6321 42.2426 15.7574C43.3679 16.8826 44 18.4087 44 20C44 21.5913 43.3679 23.1174 42.2426 24.2426C41.1174 25.3679 39.5913 26 38 26C36.4087 26 34.8826 25.3679 33.7574 24.2426C32.6321 23.1174 32 21.5913 32 20C32 18.4087 32.6321 16.8826 33.7574 15.7574ZM24 27.9986C22.4005 27.9986 20.8377 28.4778 19.5132 29.3745C18.2646 30.2197 17.2817 31.3993 16.6753 32.7757L16.1931 38H31.8069L31.3247 32.7757C30.7183 31.3993 29.7354 30.2197 28.4868 29.3745C27.1623 28.4778 25.5995 27.9986 24 27.9986ZM36 38H42V36.0001C42 36.0001 42 36.0002 42 36.0001C41.9999 35.1689 41.7409 34.3582 41.2589 33.681C40.7768 33.0037 40.0957 32.4935 39.3103 32.2211C38.5249 31.9488 37.6742 31.928 36.8763 32.1615C36.4028 32.3001 35.9619 32.5242 35.5741 32.82C35.8523 33.835 36 34.902 36 36V38ZM33.8595 29.1553C33.02 27.9464 31.9607 26.8958 30.7291 26.062C28.7427 24.7173 26.3988 23.9986 24 23.9986C21.6012 23.9986 19.2573 24.7173 17.2709 26.062C16.0393 26.8958 14.98 27.9464 14.1405 29.1553C13.5515 28.799 12.9156 28.5182 12.2473 28.3226C10.6517 27.8555 8.95017 27.8972 7.37933 28.4419C5.8085 28.9865 4.44637 30.007 3.4823 31.3615C2.51823 32.716 2.00012 34.3373 2 35.9999V40C2 41.1046 2.89543 42 4 42H44C45.1046 42 46 41.1046 46 40V36C45.9999 34.3374 45.4818 32.716 44.5177 31.3615C43.5536 30.007 42.1915 28.9865 40.6207 28.4419C39.0498 27.8972 37.3483 27.8555 35.7527 28.3226C35.0844 28.5182 34.4485 28.799 33.8595 29.1553ZM12.4259 32.82C12.0381 32.5242 11.5972 32.3001 11.1237 32.1615C10.3258 31.928 9.47509 31.9488 8.68967 32.2211C7.90425 32.4935 7.22318 33.0037 6.74115 33.681C6.25914 34.3582 6.00009 35.1688 6 36C6 36 6 36 6 36V38H12V36C12 34.902 12.1477 33.835 12.4259 32.82Z"
            fill="#F26643"
          />
        </svg>
      ),
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

  return (
    <div className="bg-[#a2defa]">
      <nav className="shadow-md py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Image src={logo} alt="Modewelt" width={40} height={40} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-700">Looking for a Job</span>
          <Link
            href="/auth"
            className="bg-[#f26744] text-white px-4 py-2 rounded-lg hover:bg-[#f26744] transition"
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
          <div className="absolute top-16 left-0 w-full shadow-md md:hidden flex flex-col items-center space-y-4 py-4 bg-[#a2defa]">
            <span className="text-gray-700">Looking for a Job</span>
            <Link
              href="/auth"
              className="bg-[#f26744] text-white px-4 py-2 rounded-lg hover:bg-[#f26744] transition"
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
          <h1 className="text-4xl md:text-5xl font-bold text-[#f26744]">
            The Future of Fashion Networking
          </h1>
          <p className="text-gray-600">
            An Exclusive Platform for Fashion Designers
          </p>
          <div className="lg:w-3/4 sm:w-full h-[1px] bg-gray-500"></div>
          <button className="border border-[#f26744] text-[#f26744] px-6 py-2 rounded-lg hover:bg-[#f26744] hover:text-white transition">
            <Link href="/auth" className="mt-4" prefetch={true}>
              Registered Now
            </Link>
          </button>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/3 p-6 md:p-8 rounded-lg mt-6 md:mt-0">
          <Image
            src={fashionDesigner}
            alt="Fashion Designer"
            className="lg:w-[600px] lg:h-[600px] sm:h-[300px] w-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center bg-[#b6e4fc] m-auto overflow-hidden w-full py-6">
        {/* Left & Right Blur Effect (Subtle) */}
        <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-[#b6e4fc] via-[#b6e4fc]/50 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-[#b6e4fc] via-[#b6e4fc]/50 to-transparent pointer-events-none"></div>

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

      <section className="bg-[#a2defa] py-10 px-5 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-4xl lg:text-6xl text-gray-800 mb-6 text-left">
            Explore by <span className="text-orange-500">category</span>
          </h2>

          <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-20 m-auto sm:mt-2">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className={`max-w-[274px] w-full h-[214px] p-6 rounded-lg shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
                  category.highlighted
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-800"
                } hover:shadow-xl hover:-translate-y-1`}
              >
                <span className="text-4xl">{category.icon}</span>
                <h3 className="mt-4 text-lg font-semibold">{category.title}</h3>
                <p className="text-sm mt-2">{category.jobs} jobs available</p>
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            The Ultimate Career Platform for Fashion Professionals
          </h1>
          <p className="mt-2 text-lg text-gray-700">
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
              professionals worldwide. Whether you&apos;re starting your journey or
              leveling up your career, Modewelt makes it easier for you to
              showcase your talent and get hired.
            </p>
            <button className="mt-6 bg-[#f26744] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#f26744] transition-all duration-300">
              <Link href="/auth" className="mt-4" prefetch={true}>
                Registered Now
              </Link>
            </button>
          </div>
        </section>
      </div>

      <section className="py-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why Choose Modewelt?
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

      <div className="p-6 md:p-12 min-h-screen rounded-xl bg-[#f4f2ff] flex flex-col items-center">
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
            <p className="text-[#f26744] font-semibold uppercase text-sm tracking-wider">
              Modewelt Database
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
            <button className="mt-4 bg-[#f26744] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#d5533d] transition-all duration-300">
              Search Candidates
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {feature.icon}
              <h3 className="font-semibold mt-2 text-lg">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
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
          <h2 className="text-2xl font-bold text-gray-800">
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
                  <span className="text-lg text-gray-700">{faq.question}</span>
                  <span className="text-gray-600">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="text-gray-600 px-4 pb-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1192px] w-full my-8 border-t border-[#f26744] mt-10 p-[4px]" />
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Let&apos;s hire your next great candidate
          </h3>
          <p className="text-gray-600 mt-6">
            A hiring platform built to solve for relevancy, volume and speed of
            hiring
          </p>
          <div className="mt-6 grid lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-center sm:justify-start">
            <button className="px-6 py-3 bg-[#f26744] text-white font-semibold rounded-lg shadow-md hover:bg-[#f26744] transition w-full sm:w-auto">
              <Link href="/auth" prefetch={true}>Login/Sign up</Link>
            </button>
            <button className="px-6 py-3 border border-[#f26744] text-[#f26744] font-semibold rounded-lg hover:bg-gray-100 transition w-full sm:w-auto">
              <a href="mailto:contact.us@befog.in">Contact us</a>
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-gray-400 mt-16 py-8">
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
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          <p>© 2025 Modeweltjob | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
