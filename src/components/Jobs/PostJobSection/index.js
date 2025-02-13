"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Index() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHovered(false); 
  }, []);

  return (
    <div>
      <div className="bg-white w-[290px] h-[75px] text-center mb-3 rounded-[4px]">
        <div className="flex justify-center w-[290px] h-[75px] mb-3">
          <button
            onClick={() => router.push("/postJob")}
            className="rounded-md px-4 w-[269px] my-auto text-[12px] h-[32px] font-[200] font-[Arial] leading-[13.8px] text-white uppercase
                 hover:text-[14px] hover:scale-101 hover:bg-[#f26744] transition-all duration-300"
            style={{
              background: isHovered
                ? "#f26744"
                : "linear-gradient(0deg, #A45286 0%, #f26744 100%)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Post a job
          </button>
        </div>
      </div>
    </div>
  );
}
