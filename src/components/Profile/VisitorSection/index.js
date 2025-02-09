"use client"

import Image from 'next/image';
import React from 'react';
import profileimg from "../../../../public/assets/profile/backgroundImageBackrgound.png";
import Link from 'next/link';


export default function VisitorSection({ visitors }) {

    // // Handle the "View All" button click
    // const handleViewAll = () => {
    //     // Redirect to a page showing all visitors
    //     // Example: router.push('/profile/visitors');
    //     console.log('View All clicked');
    // };

    return (
        <div>
            <div className="h-[427px] mt-5 shadow-lg p-4">
                <div className="flex justify-between px-3 py-3 w-full font-[Gotham] mt-2">
                    <span className="font-semibold text-sm">VISITORS</span>
                    {/* <span
                        className="text-[#A45286] rounded-md font-semibold text-sm cursor-pointer hover:bg-[#A45286] hover:text-white transition-all duration-200 px-2 py-1"
                        onClick={handleViewAll}
                    >
                        VIEW ALL
                    </span> */}
                </div>
                <hr className="w-full mx-auto my-2 border-t border-gray-300" />

                {/* Visitor List */}
                <div className="flex flex-col space-y-3">
                    {visitors.map((visitor) => (
                        <div key={visitor.id} className="flex items-center w-full h-[52px] space-x-3">
                            <Link href={`/profile/${visitor.username}`}>
                                <Image
                                    width={52}
                                    height={52}
                                    src={visitor.avatarUrl || profileimg} // Use the visitor's avatar or a default image
                                    alt={visitor.displayName}
                                    className="w-[52px] h-[52px] rounded-full"
                                />
                            </Link>
                            <div className="flex flex-col space-y-1">
                                <Link href={`/profile/${visitor.username}`}>
                                    <span className="font-bold text-sm hover:underline">{visitor.displayName}</span>
                                </Link>
                                <p className="text-gray-700 text-[10px]">
                                    {visitor.profileHeadline}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}