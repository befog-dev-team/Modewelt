"use client";
import Image from "next/image";
import Link from "next/link";
import { Home, Briefcase, Users, FileText, MessageSquare, Bell, CheckCircle, Search, DollarSign, Zap, X, Menu, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "Careers", icon: <Briefcase size={18} /> },
    { name: "Connections", icon: <Users size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },

  ];

  return (
    <div className="relative flex flex-col bg-transparent font-sans">
      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 md:px-12 lg:px-20 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative group cursor-pointer">
            {/* Animated Glow Effect */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#fc3fb4] to-[#0062ff] rounded-2xl blur-md opacity-20 group-hover:opacity-50 transition duration-500"></div>

            {/* Logo Container */}
            <div className="relative w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 backdrop-blur-sm transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fc3fb4" />
                    <stop offset="100%" stopColor="#0062ff" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  d="M8 28V12L14 20L20 12L26 20L32 12V28"
                  stroke="url(#logo-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'url(#glow)' }}
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black text-[#1e293b] tracking-tighter uppercase">Modewelt</span>
            <span className="text-[10px] font-bold text-[#fc3fb4] tracking-[0.2em] uppercase ml-1 opacity-80">Fashion World</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="hidden sm:flex items-center space-x-3">
            <Link href="/auth" className="px-5 py-2 text-[#fc3fb4] font-bold border border-pink-100 rounded-xl hover:bg-pink-50 transition-all text-sm">
              Sign In
            </Link>
            <Link href="/auth" className="px-5 py-2 bg-[#fc3fb4] text-white font-bold rounded-xl shadow-lg shadow-pink-200 hover:bg-[#e0359f] hover:scale-105 transition-all text-sm">
              Get Started
            </Link>
          </div>

          <button className="xl:hidden p-2.5 bg-gray-50 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-[#fc3fb4] transition-all" onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right-Side Drawer Mobile Menu */}
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] xl:hidden" onClick={() => setIsOpen(false)} />
            <div className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[101] xl:hidden shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between p-6 border-b border-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-[#fc3fb4]">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="font-black text-[#1e293b] uppercase tracking-tight">Menu</span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href="#"
                    className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-gray-50 rounded-2xl text-gray-500 group-hover:bg-white group-hover:text-[#fc3fb4] group-hover:shadow-md transition-all">
                        {link.icon}
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-[#1e293b]">{link.name}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#fc3fb4] transition-colors" />
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-gray-50 space-y-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Account</p>
                <Link href="/auth" className="flex items-center justify-center w-full py-4 bg-[#fc3fb4] text-white font-bold rounded-2xl shadow-lg shadow-pink-200">
                  Get Started
                </Link>
                <Link href="/auth" className="flex items-center justify-center w-full py-4 text-[#fc3fb4] font-bold border border-pink-50 rounded-2xl">
                  Sign In
                </Link>
              </div>
            </div>
          </>
        )}

      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-6 lg:pt-10 pb-12">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              <Zap className="w-3 h-3 text-[#0062ff]" />
              <span className="text-[10px] font-bold text-[#0062ff] uppercase tracking-wider">Smart Platform for Fashion Professionals</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-[#1e293b] leading-[1.15]">
              The Community for <span className="gradient-text">Designers</span> & Creatives
            </h1>

            <div className="space-y-4 max-w-lg">
              <h3 className="text-base md:text-lg font-bold text-[#334155]">An Exclusive Platform for Designers</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Connect, Grow, and Thrive in the Global Industry. Modewelt provides the tools and network you need to elevate your creative career.
              </p>
            </div>
          </div>

          <Link href="/auth" className="inline-flex items-center justify-center px-8 py-3 bg-[#fc3fb4] text-white font-bold text-base rounded-xl shadow-lg shadow-pink-200 hover:bg-[#e0359f] hover:scale-105 transition-all transform active:scale-95">
            Register Now
          </Link>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-[#1e293b]">2.1M+</div>
              <div className="text-gray-400 font-medium text-xs uppercase tracking-wide">Jobs Posted</div>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-[#1e293b]">98%</div>
              <div className="text-gray-400 font-medium text-xs uppercase tracking-wide">Match Accuracy</div>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-100">
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-[#0062ff]">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-[#1e293b] font-bold text-sm">Verified Recruiters</span>
            </div>
          </div>
        </div>

        {/* Right Side: Simple 3x3 Frame - Scaled & Aligned */}
        <div className="w-full lg:w-1/2 mt-16 lg:mt-2 flex justify-center items-start lg:pl-10">
          <div className="grid grid-cols-3 gap-3 w-full max-w-[440px]">
            {[
              "https://plus.unsplash.com/premium_photo-1683141084792-510897cbca07?w=600&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1653976499578-2d494b63c7be?w=600&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=600&auto=format&fit=crop&q=60",
              "https://plus.unsplash.com/premium_photo-1674718916340-2cb0f69e61ab?w=600&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?w=600&auto=format&fit=crop&q=60",
              "https://plus.unsplash.com/premium_photo-1720903984909-04be5b4cda06?w=600&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1656618724305-a4257e46e847?w=600&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1617777938240-9a1d8e51a47d?w=600&auto=format&fit=crop&q=60",
              "https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?w=600&auto=format&fit=crop&q=60"
            ].map((url, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white transform hover:scale-105 hover:z-10 transition-all duration-300">
                <Image src={url} alt={`Design ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>


      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
