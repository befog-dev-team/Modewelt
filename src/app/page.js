"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroSection from "@/components/LandingPage/HeroSection";
import ScrollingText from "@/components/LandingPage/ScrollingText";
import CategorySection from "@/components/LandingPage/CategorySection";

// Lazy load sections below the fold
const UltimateCareerPlatform = dynamic(() => import("@/components/LandingPage/UltimateCareerPlatform"), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-white" />,
});
const WhyChooseSection = dynamic(() => import("@/components/LandingPage/WhyChooseSection"), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-white" />,
});
const HireActiveSection = dynamic(() => import("@/components/LandingPage/HireActiveSection"), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-white" />,
});
const StartPostingSection = dynamic(() => import("@/components/LandingPage/StartPostingSection"), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse bg-white" />,
});
const FAQSection = dynamic(() => import("@/components/LandingPage/FAQSection"), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-white" />,
});
const ContactSection = dynamic(() => import("@/components/LandingPage/ContactSection"), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse bg-white" />,
});
const FooterSection = dynamic(() => import("@/components/LandingPage/FooterSection"), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse bg-white" />,
});

export default function LandingPage() {
  return (
    <div className="bg-[#f8f9fa] relative overflow-hidden">
      {/* Unique Mesh Background Blobs for Seamless Mixing */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f2eeed] rounded-full blur-[120px] opacity-70 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-5%] w-[45%] h-[45%] bg-[#edf2f7] rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-[50%] left-[-5%] w-[40%] h-[40%] bg-[#ffeefd] rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#f0f4ff] rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="relative overflow-hidden">
        {/* Unified Background for Hero and ScrollingText */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: "#F2EEED"
          }}
        />
        <div className="absolute inset-0 z-0 bg-white/30" />
        
        {/* Bottom Blend to CategorySection */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #edf2f7 0%, rgba(237, 242, 247, 0) 100%)"
          }}
        />

        <div className="relative z-10 pb-10 md:pb-16">
          <HeroSection />
          <div className="mt-12 md:mt-24">
            <ScrollingText />
          </div>
        </div>
      </div>
      <div className="relative z-10 -mt-24 pt-24">
        <CategorySection />
      </div>

      <Suspense fallback={<div className="h-96 animate-pulse bg-white" />}>
        <UltimateCareerPlatform />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-white" />}>
        <WhyChooseSection />
      </Suspense>

      <div className="relative overflow-hidden">
        {/* Continuous Background for the next 3 sections */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-x-[-1]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566924119080-9b37796cb157?q=80&w=2071&auto=format&fit=crop')"
          }}
        ></div>
        <div 
          className="absolute inset-0 z-0 backdrop-blur-[4px]"
          style={{
            background: "linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0.8) 15%, rgba(255, 255, 255, 0.8) 100%)"
          }}
        ></div>

        <div className="relative z-10">
          <Suspense fallback={<div className="h-96 animate-pulse bg-white" />}>
            <HireActiveSection />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-white" />}>
            <StartPostingSection />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse bg-white" />}>
            <FAQSection />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse bg-white" />}>
        <ContactSection />
      </Suspense>

      <Suspense fallback={<div className="h-64 animate-pulse bg-white" />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
