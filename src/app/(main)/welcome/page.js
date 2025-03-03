"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useEffect } from "react";
import Image from "next/image";

export default function Welcome() {
  // useEffect hook to trigger the GSAP animation when the component is mounted
  useEffect(() => {
    const tl = gsap.timeline();

    // Animate stars and other elements sequentially using GSAP
    tl.to(".star", {
      duration: 0.4, // Duration of animation
      transition: "all 0.5s", // CSS transition
      stagger: 0.2, // Time delay between each star animation
      opacity: 1, // Show stars by changing opacity to 1
      color: "#04AF31", // Change color of stars to green
      ease: "elastic", // Animation easing effect
    })
      .to(
        "#presuccess",
        {
          border: "4px solid #04AF31", // Change the border color of the check circle
          duration: 0.3, // Duration of this animation step
          ease: "linear",
        },
        ">"
      )
      .to(
        "#stars-container",
        {
          border: "4px solid #04AF31", // Change border color of stars container
          duration: 0.3,
          ease: "linear",
        },
        ">"
      )
      .to(
        "#check",
        {
          scale: 1, // Scale up the checkmark to full size
          opacity: 1, // Make checkmark visible
          duration: 0.3,
          ease: "elastic",
        },
        ">"
      )
      .to("check", {
        y: -100, // Move the checkmark up by 100px
        transition: "all 0.2s",
      })
      .from("#welcome-heading", {
        delay: 0.2, // Delay before animation starts
        y: 20, // Start heading slightly lower
      })
      .to("#welcome-heading", {
        y: 0, // Move heading to its original position
        display: "block", // Make heading visible
        transition: "all 0.1s",
        opacity: 1, // Make heading fully visible
        duration: 0.2,
        ease: "linear",
      })
      .from("#welcome-para", {
        delay: 0.3, // Delay before paragraph animation starts
        y: 20, // Start paragraph slightly lower
      })
      .to("#welcome-para", {
        y: 0, // Move paragraph to original position
        display: "block", // Show the paragraph
        transition: "all 0.1s",
        opacity: 1, // Make paragraph fully visible
        duration: 0.2,
        ease: "linear",
      })
      .from("#welcome-btn", {
        delay: 0.5, // Delay before button animation starts
        y: 20, // Start button slightly lower
      })
      .to("#welcome-btn", {
        y: 0, // Move button to original position
        display: "block", // Show the button
        transition: "all 0.1s",
        opacity: 1, // Make button fully visible
        duration: 0.2,
        ease: "linear",
      })
      .from("#check-complete", {
        x: 100, // Start the "COMPLETE" badge offscreen to the right
      })
      .to("#check-complete", {
        x: 0, // Move the "COMPLETE" badge to its position
        display: "block", // Show the "COMPLETE" badge
        transition: "all 0.1s",
        opacity: 1, // Make it fully visible
        duration: 0.2,
        ease: "power4",
      });

    // Cleanup function to kill the GSAP timeline on component unmount
    return () => {
      tl.kill();
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#daf59d]">
      {/* Progress circle and stars container */}
      <div className="text-center">
        <div
          id="progress"
          className="flex flex-col items-center justify-center transition transition-300"
        >
          <div
            id="presuccess"
            className="h-24 w-24 rounded-full border-[4px] border-gray-500"
          >
            {/* Checkmark image inside the circle */}
            <div
              id="check"
              className="scale-[0.1] opacity-0 relative top-[1.5rem] left-[0.6rem]"
            >
              <Image
                className="w-[4rem]"
                src="/assets/welcome/check.png"
                width={100}
                height={100}
                alt="check"
              />
            </div>
          </div>

          {/* Stars container and the "COMPLETE" badge */}
          <div
            id="stars-container"
            className="relative mt-4 border-gray-600 border-[3px] w-[200px] h-[39px] text-white py-2 px-8 rounded-full font-semibold"
          >
            <div className="stars flex justify-around items-center text-[2.5rem] gap-[10px] text-gray-500 relative bottom-[1.1rem] right-[1.5rem]">
              {/* Star elements */}
              <div className="star">*</div>
              <div className="star">*</div>
              <div className="star">*</div>
              <div className="star">*</div>
              <div className="star">*</div>
              <div className="star">*</div>
              <div className="star">*</div>
            </div>
            {/* Hidden "COMPLETE" text that becomes visible after animation */}
            <div
              id="check-complete"
              className="absolute mt-4 bottom-[-8%] right-[-2%] hidden bg-green-600 w-[200px] h-[39px] text-white py-2 px-8 rounded-full font-semibold"
            >
              COMPLETE
            </div>
          </div>
        </div>
      </div>

      {/* Welcome heading and paragraph */}
      <div className="text-center mt-12 transition transition-300">
        <h1
          id="welcome-heading"
          className="uppercase text-3xl md:text-5xl font-bold text-[#7b4fff] hidden transition transition-300"
        >
          WELCOME BACK! TO ModeweltJob
        </h1>
        <p
          id="welcome-para"
          className="mt-4 uppercase text-sm w-[60%] mx-auto hidden transition transition-300"
        >
          ModeweltJob.com is an emerging platform dedicated to connecting
          professionals with career opportunities in the fashion industry.
          Whether you&apos;re a designer, stylist, photographer, or marketing
          expert, Modewelt aims to be your go-to resource for exciting roles in
          fashion.
        </p>
      </div>

      {/* Button linking to home page */}
      <div className="mt-12">
        <Link href="/feed" prefetch={true}>
          <button
            id="welcome-btn"
            className="bg-[#fc3fb4] hover:bg-[#fc3fb4] text-white py-3 px-8 rounded-full font-semibold hidden"
          >
            GO TO HOME PAGE
          </button>
        </Link>
      </div>
    </div>
  );
}
