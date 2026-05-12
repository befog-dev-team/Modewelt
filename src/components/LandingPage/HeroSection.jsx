"use client";
import Image from "next/image";
import Link from "next/link";
import { Home, Briefcase, Users, FileText, MessageSquare, Bell, CheckCircle, Search, DollarSign, Zap, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "Careers", icon: <Briefcase size={18} /> },
    { name: "Connections", icon: <Users size={18} /> },
    { name: "Resumes", icon: <FileText size={18} /> },
    { name: "Chat", icon: <MessageSquare size={18} /> },
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

        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href="#" className="flex items-center space-x-1.5 text-gray-500 hover:text-[#0062ff] transition-colors font-medium">
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth" className="px-6 py-2.5 text-[#0062ff] font-bold border border-blue-200 rounded-xl hover:bg-blue-50 transition-all">
            Sign In
          </Link>
          <Link href="/auth" className="px-6 py-2.5 bg-[#fc3fb4] text-white font-bold rounded-xl shadow-lg shadow-pink-200 hover:bg-[#e0359f] hover:scale-105 transition-all">
            Get Started
          </Link>
        </div>

        <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-24 left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-50 lg:hidden flex flex-col items-center space-y-6 py-10 z-50 animate-in slide-in-from-top-10 duration-300">
            {navLinks.map((link) => (
              <Link key={link.name} href="#" className="flex items-center space-x-3 text-lg font-bold text-gray-600 hover:text-[#0062ff]" onClick={() => setIsOpen(false)}>
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="flex flex-col w-full px-10 space-y-4 pt-6 border-t border-gray-100">
              <Link href="/auth" className="w-full text-center py-4 text-[#0062ff] font-bold border border-blue-100 rounded-2xl">
                Sign In
              </Link>
              <Link href="/auth" className="w-full text-center py-4 bg-[#0062ff] text-white font-bold rounded-2xl shadow-lg shadow-blue-100">
                Get Started
              </Link>
            </div>
          </div>
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
              The Community for <span className="gradient-text">Fashion Designers</span> & Creatives
            </h1>

            <div className="space-y-4 max-w-lg">
              <h3 className="text-base md:text-lg font-bold text-[#334155]">An Exclusive Platform for Fashion Designers</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Connect, Grow, and Thrive in the Global Industry. Modewelt provides the tools and network you need to elevate your creative career.
              </p>
            </div>
          </div>

          <Link href="/auth" className="inline-flex items-center justify-center px-8 py-3 bg-[#0062ff] text-white font-bold text-base rounded-xl shadow-lg shadow-blue-100 hover:bg-[#0052d4] hover:scale-105 transition-all transform active:scale-95">
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

        {/* Right Side: Dashboard Mockup */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 relative flex items-start justify-center">
          {/* Main Dashboard Window */}
          <div className="relative w-full max-w-xl bg-white rounded-[2rem] border border-gray-100 p-1 shadow-xl overflow-visible">
            <div className="bg-white rounded-[1.75rem] p-5 shadow-sm h-full">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-50 shadow-md">
                    <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" alt="Mark Endorson" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-bold text-[#1e293b]">Ammad Riaz</h4>
                      <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-500 text-white" />
                    </div>
                    <p className="text-gray-500 font-medium text-sm">Sr. Software Engineer</p>
                    <p className="text-xs text-gray-400">New York, USA</p>
                  </div>
                </div>
                <div className="bg-orange-50 text-orange-500 px-4 py-2 rounded-full text-sm font-bold border border-orange-100">
                  <div className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">Senior Level</div>
                </div>
              </div>

              <div className="space-y-6">
                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">BEST MATCHES TODAY</h5>

                {/* Job Card 1 */}
                <div className="group bg-blue-50/50 p-6 rounded-3xl border border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <div className="w-8 h-8 bg-blue-600 rounded-sm"></div>
                      </div>
                      <div>
                        <h6 className="font-bold text-[#1e293b]">Frontend Developer</h6>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <span className="text-gray-900 font-bold">H&M</span> • New York, USA
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium italic">2 hours ago</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-[#0062ff] text-xs font-bold rounded-lg border border-blue-50 shadow-sm">Mid Level</span>
                    <span className="px-3 py-1 bg-white text-green-600 text-xs font-bold rounded-lg border border-green-50 shadow-sm">100% Match</span>
                    <span className="px-3 py-1 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-50 shadow-sm">$150K - $200K</span>
                  </div>
                </div>

                {/* Job Card 2 */}
                <div className="group bg-gray-50/50 p-6 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-bold text-[#1e293b]">Senior Product Designer</h6>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <span className="text-gray-900 font-bold">Befog</span> • Lucknow, India
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium italic">3 hours ago</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-[#0062ff] text-xs font-bold rounded-lg border border-blue-50 shadow-sm">Senior Level</span>
                    <span className="px-3 py-1 bg-white text-green-600 text-xs font-bold rounded-lg border border-green-50 shadow-sm">98% Match</span>
                    <span className="px-3 py-1 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-50 shadow-sm">$264K - $400K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 -left-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex items-center space-x-3 animate-bounce-slow">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#0062ff]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1e293b]">12 New Matches</div>
                <p className="text-[10px] text-gray-500">Based on your Profile</p>
              </div>
            </div>

            <div className="absolute bottom-40 -left-16 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex items-center space-x-3 animate-bounce-slow" style={{ animationDelay: '1s' }}>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                <Zap className="w-5 h-5 fill-orange-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1e293b]">98% Match</div>
                <p className="text-[10px] text-gray-500">Walmart - Product Designer</p>
              </div>
            </div>

            <div className="absolute -bottom-4 right-10 bg-[#eef8f3] p-4 rounded-2xl shadow-xl border border-green-100 flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1e293b]">$132K - $264K</div>
                <p className="text-[10px] text-gray-500">Avg. matching salary</p>
              </div>
            </div>
          </div>

          {/* Background Decorative Blobs */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-400/10 blur-[120px] rounded-full"></div>
          <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-orange-400/5 blur-[80px] rounded-full"></div>
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
