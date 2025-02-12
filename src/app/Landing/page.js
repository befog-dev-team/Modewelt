"use client";
import logo from "../../../public/Images/logo.png";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { FaUserFriends, FaFileAlt, FaFilter } from "react-icons/fa";
import Admin from "../../../public/Images/admin.png";

const initialFeatures = [
  { title: "Exclusive for Fashion Industry" },
  { title: "Connect with Top Brands & Recruiters" },
  { title: "Showcase Your Portfolio" },
  { title: "Freelance & Full-Time Opportunities" },
  { title: "Networking & Collaboration" },
  { title: "Verified Job Listings" },
  { title: "Career Growth & Learning" },
];

const features = [
  {
    icon: <FaUserFriends className="text-[#a35083] text-4xl" />,
    title: "Unlimited Profile Views",
    description:
      "Review endless profiles free-of-cost. Pay only when you want to contact suitable candidates",
  },
  {
    icon: <FaFileAlt className="text-[#a35083] text-4xl" />,
    title: "Auto Generated Resumes",
    description:
      "Effortlessly generate downloadable resumes from apna profiles for seamless candidate review.",
  },
  {
    icon: <FaFilter className="text-[#a35083] text-4xl" />,
    title: "Precision Filtering",
    description: "Use 22+ advanced filters to fine-tune candidate searches.",
  },
];

const searchOptions = [
  {
    id: 1,
    title: "AI Powered Search",
    description:
      "Instantly turn your job descriptions into candidate searches using apnaAI",
  },
  {
    id: 2,
    title: "Area-based Search",
    description: "Find candidates based on specific geographic locations",
  },
  {
    id: 3,
    title: "Bulk WhatsApp Invites",
    description: "Send bulk WhatsApp invites to potential candidates",
  },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobile, setMobile] = useState("");
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

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-[#a35083] text-xl font-bold">
          <Image src={logo} alt="Modewelt" width={50} height={50} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-700">Looking for a Job</span>
          <Link
            href="/contact"
            className="border border-[#a35083] text-[#a35083] px-4 py-2 rounded-lg hover:bg-purple-100 transition"
          >
            Contact Us
          </Link>
          <Link
            href="/signup"
            className="bg-[#a35083] text-white px-4 py-2 rounded-lg hover:bg-[#a35083] transition"
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
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center space-y-4 py-4">
            <span className="text-gray-700">Looking for a Job</span>
            <Link
              href="/contact"
              className="border border-[#a35083] text-[#a35083] px-4 py-2 rounded-lg hover:bg-purple-100 transition"
            >
              Contact Us
            </Link>
            <Link
              href="/signup"
              className="bg-[#a35083] text-white px-4 py-2 rounded-lg hover:bg-[#a35083] transition"
            >
              Sign up / Log in
            </Link>
          </div>
        )}
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-12 bg-gray-50">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            The Future of Fashion Networking
          </h1>
          <p className="text-gray-600">
            An Exclusive Platform for Fashion Designers
          </p>
          <button className="border border-[#a35083] text-[#a35083] px-6 py-2 rounded-lg hover:bg-[#a35083] hover:text-white transition">
            Registered Now
          </button>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/3 bg-white p-6 md:p-8 rounded-lg shadow-lg mt-6 md:mt-0">
          <h2 className="text-xl font-semibold text-[#a35083">
            Let's get started
          </h2>
          <p className="text-gray-500 text-sm">
            Hire top fashion talent faster with Modewelt
          </p>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Enter Your Mobile
            </label>
            <input
              type="tel"
              placeholder="Enter 10 digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="w-full mt-4 bg-[#a35083] text-white py-2 rounded-md hover:bg-[#a35083] transition">
            Continue
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 px-2 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <a
            href="#"
            className="text-[#a35083] font-semibold hover:underline block text-center"
          >
            Click here for Enterprise login
          </a>

          <p className="text-gray-500 text-xs text-center mt-4">
            By clicking continue, you agree to the Modewelt
            <a href="#" className="text-[#a35083] hover:underline">
              Terms of service
            </a>
            &
            <a href="#" className="text-#a35083 hover:underline">
              Privacy policy
            </a>
          </p>
        </div>
      </div>
      <section className="bg-[#f0fff1] min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              The Ultimate Career Platform for Fashion Professionals
            </h1>
            <p className="mt-2 text-lg text-gray-700">
              Build Your Fashion Career with Modeweltjob
            </p>
            <p className="mt-4 text-gray-700">
              Are you a fashion designer, stylist, photographer, or industry
              expert looking for the right opportunities? Modewelt is here to
              connect you with top brands, recruiters, and creative
              professionals worldwide. Whether you're starting your journey or
              leveling up your career, Modewelt makes it easier for you to
              showcase your talent and get hired.
            </p>
            <button className="mt-6 bg-[#a35083] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#a35083">
              Registered Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-64 bg-gray-400 flex items-center justify-center rounded-lg">
              <Image
                src="/placeholder-image.png"
                alt="Fashion Career"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why Choose Modewelt?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center m-auto">
          {initialFeatures.map((initialFeatures, index) => (
            <div
              key={index}
              className="bg-gray-300 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex flex-col items-center justify-center rounded-lg shadow-md p-4 m-auto"
            >
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-4">
                <Image
                  src="/placeholder-image.png"
                  alt={initialFeatures.title}
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-center text-sm md:text-base font-medium">
                {initialFeatures.title}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-gray-100 p-6 md:p-12 min-h-screen rounded-xl max-w-full lg:px-[90px] lg:py-[101px] justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-400 flex items-center justify-center h-[400px] rounded-xl">
            <div className="bg-gray-600 p-4 rounded-full">
              <img
                src="/placeholder-image.svg"
                alt="Placeholder"
                className="w-16"
              />
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-[#a35083] font-semibold uppercase text-sm">
              Modewelt Database
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Quickly hire active jobseekers around your office.
            </h2>

            <div className="mt-4 space-y-2">
              {searchOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => toggleExpand(option.id)}
                  className="cursor-pointer border-b pb-2"
                >
                  <p className="font-semibold">{option.title}</p>
                  {expanded === option.id && (
                    <p className="text-gray-600">{option.description}</p>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-4 bg-[#a35083] text-white px-6 py-2 rounded-md hover:bg-[#a35083] transition">
              Search candidates
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {feature.icon}
              <h3 className="font-semibold mt-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="max-w-[1192px] w-full flex flex-col md:flex-row items-center justify-between bg-[#4640de] text-white p-8 md:p-16 m-auto gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start posting jobs today
          </h1>
          <p className="text-lg mb-6">Start posting jobs for only Free.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
            Sign Up For Free
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
      <div className=" flex flex-col items-center justify-center min-h-screen p-6 bg-white">
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
        <div className="max-w-[1192px] w-full my-8 border-t border-[#a65386] mt-10 p-[4px]" />
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Let's hire your next great candidate
          </h3>
          <p className="text-gray-600 mt-6">
            A hiring platform built to solve for relevancy, volume and speed of
            hiring
          </p>
          <div className="mt-6 grid lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-center sm:justify-start">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition w-full sm:w-auto">
            Login/Sign up
          </button>
          <button className="px-6 py-3 border border-gray-500 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition w-full sm:w-auto">
            Contact us
          </button>
        </div>
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-gray-400 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-6 md:flex md:justify-between">
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
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          <p>© 2024 Apna | All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <span>Privacy policy</span>
            <span>Terms & Conditions</span>
            <span>Terms of service</span>
            <span>Disclosure Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
