"use client"
import React from 'react'

export default function Index(props) {
    return (
        <div className="w-full px-4 sm:px-8 md:px-12">
            <div className="flex justify-center items-center my-4 space-x-4">
                <hr className="flex-grow border-gray-300 dark:border-gray-800 transition-colors" />
                <p className="text-center text-xs sm:text-sm md:text-base font-[Gotham] font-[600] uppercase text-gray-900 dark:text-gray-300 transition-colors">
                    {props.headingText}
                </p>
                <hr className="flex-grow border-gray-300 dark:border-gray-800 transition-colors" />
            </div>
        </div>
    )
}
