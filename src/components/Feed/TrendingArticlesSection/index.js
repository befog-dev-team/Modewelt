"use client"

import Image from "next/image"
import React from 'react'

export default function Index() {
    return (
        <div>
            <div className="bg-white h-[300px] p-4 rounded-[4px]">
                <p className="font-[600] text-[12px] uppercase leading-[11.48px] font-[Gotham]">Trending Articles</p>

                {/* Divider */}
                <hr className="border-t border-[#F4F4F4] mt-4" />

                <div className="w-[227px] h-[198px] mt-2">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center space-x-3 my-6">
                            <Image
                                src="/assets/feed/profilesquare.png"
                                alt="Trending Article"
                                width={100}
                                height={100}
                                className="w-[80px] h-[52px]"
                            />
                            <div className="flex flex-col">
                                <p className="font-semibold font-[Gotham] text-[14px] text-[#181818] leading-[17.5px] w-[132px]">How I make cool designs?</p>
                                <span className="font-[Gotham] text-[10px] leading-[15px]">6,340 viewers</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
