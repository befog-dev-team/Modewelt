"use client";

import React, { useState, useEffect } from 'react';

export default function Index() {
    const [isHovered, setIsHovered] = useState(false);

  // Ensuring that hover state is used only on the client side
  useEffect(() => {
    // This will run once when the component mounts
    setIsHovered(false); // Default state when mounted on the client side
  }, []);
  return (
    <div>
      <div className="bg-white w-[290px] h-[75px] text-center mb-3 rounded-[4px]">
        <div className="flex justify-center w-[290px] h-[75px] mb-3">
          <button
            className="rounded-md px-4 w-[269px] my-auto text-[12px] h-[32px] font-[200] font-[Arial] leading-[13.8px] text-white uppercase
                 hover:text-[14px] hover: scale-101 hover:bg-pink-500 transition-all duration-300"
            style={{
              background: isHovered
                ? "#a32173" 
                : "linear-gradient(0deg, #A45286 0%, #DC85BC 100%)", // Default gradient background
            }}
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false
          >
            Write new article
          </button>
        </div>
      </div>
    </div>
  );
}
