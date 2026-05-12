"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

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

export default function ScrollingText() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const topTween = useRef(null);
  const bottomTween = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const scrollDuration = isMobile ? 12 : 20;

    topTween.current = gsap.to(topRef.current, {
      xPercent: -50,
      duration: scrollDuration,
      repeat: -1,
      ease: "linear",
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });

    bottomTween.current = gsap.to(bottomRef.current, {
      xPercent: 50,
      duration: scrollDuration,
      repeat: -1,
      ease: "linear",
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });

    return () => {
      topTween.current?.kill();
      bottomTween.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    topTween.current?.pause();
    bottomTween.current?.pause();
  };

  const handleMouseLeave = () => {
    topTween.current?.resume();
    bottomTween.current?.resume();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-transparent m-auto overflow-hidden w-full py-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>

      <div className="w-full overflow-hidden whitespace-nowrap">
        <div ref={topRef} className="flex gap-4">
          {[...jobTags, ...jobTags].map((tag, index) => (
            <span
              key={`top-${index}`}
              className="px-4 py-2 text-gray-700 bg-white border border-pink-300 rounded-full shadow-sm text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] hover:border-red-500 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden whitespace-nowrap mt-4">
        <div ref={bottomRef} className="flex gap-4">
          {[...jobTags, ...jobTags].map((tag, index) => (
            <span
              key={`bottom-${index}`}
              className="px-4 py-2 text-gray-700 bg-white border border-pink-300 rounded-full shadow-sm text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] hover:border-red-500 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
