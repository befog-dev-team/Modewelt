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
    <div className="bg-white">
      <div className="relative overflow-hidden">
        {/* Unified Background for Hero and ScrollingText */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1666266623828-6513752e6655?w=1200&auto=format&fit=crop&q=80')"
          }}
        />
        <div className="absolute inset-0 z-0 bg-white/30" />

        <div className="relative z-10 pb-10 md:pb-16">
          <HeroSection />
          <div className="mt-12 md:mt-24">
            <ScrollingText />
          </div>
        </div>
      </div>
      <CategorySection />

      <Suspense fallback={<div className="h-96 animate-pulse bg-white" />}>
        <UltimateCareerPlatform />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-white" />}>
        <WhyChooseSection />
      </Suspense>

      <div className="relative overflow-hidden mt-10 md:mt-20">
        {/* Continuous Background for the next 3 sections */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-x-[-1]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566924119080-9b37796cb157?q=80&w=2071&auto=format&fit=crop')"
          }}
        ></div>
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[4px]"></div>

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
