"use client";
import Image from "next/image";
import React from 'react';

export default function Teammates() {
    return (
        <div className="px-4 sm:px-6 md:px-10 lg:px-20">
            <div>
                {/* Teammates Heading */}
                <div className="flex items-center space-x-4">
                    <h2 className="font-[Arial] text-[#A45286] text-[20px] font-[700] uppercase leading-[23px]">
                        Teammates
                    </h2>
                </div>
                {/* Teams Section */}
                <div className="mt-6 mb-10">
                    <div className="w-full max-w-[847px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[440px] bg-[#FFFFFF] flex justify-center items-center mx-auto">
                        <div className="flex flex-col justify-center items-center">
                            <Image
                                src="/assets/teammates/group.png"
                                className="w-[50px] h-[45px] sm:w-[60px] sm:h-[55px] md:w-[72px] md:h-[67px]"
                                width={100}
                                height={100}
                                alt="Teammates Icon"
                            />
                            <p className="font-[Arial] text-[10px] sm:text-[11px] md:text-[12px] font-[700] text-[#181818] leading-[13px] sm:leading-[13.8px]">
                                No Teammates
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
