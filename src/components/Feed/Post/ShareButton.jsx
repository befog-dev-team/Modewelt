"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    FacebookIcon, FacebookShareButton,
    XIcon, TwitterShareButton,
    LinkedinIcon, LinkedinShareButton,
    WhatsappIcon, WhatsappShareButton,
} from "react-share";
import { FaShareAlt } from "react-icons/fa";
import { LuClipboard } from "react-icons/lu";
import { toast } from "react-hot-toast";

const variant1 = {
    show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
    hide: { opacity: 0, transition: { when: "afterChildren" } }
};

const variant2 = {
    show: { opacity: 1, y: 0 },
    hide: { opacity: 0, y: -10 }
};

export default function ShareButton({ shareUrl }) {
    const [showIcons, setShowIcons] = useState(false);
    const menuRef = useRef(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowIcons(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowIcons(!showIcons)}>
                <FaShareAlt className="text-primary text-lg" />
                <span className="text-sm font-semibold text-gray-800 hidden sm:inline">SHARE</span>
            </div>

            {showIcons && (
                <motion.div initial="hide" animate="show" variants={variant1} className="absolute right-0 mt-2 min-w-72 bg-white border rounded-lg shadow-lg p-4">
                    <motion.div variants={variant2} className="flex justify-between space-x-4" suppressHydrationWarning>
                        {/* Clipboard Button */}
                        <button
                            suppressHydrationWarning
                            data-networkname="link"
                            onClick={copyToClipboard}
                            className="flex items-center justify-center w-[40px] rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                            <LuClipboard size={20} />
                        </button>

                        {/* Facebook Share */}
                        <FacebookShareButton suppressHydrationWarning url={shareUrl} quote="Check this out!" hashtag="#fashion">
                            <FacebookIcon size={40} className="rounded-full" />
                        </FacebookShareButton>

                        {/* Twitter Share */}
                        <TwitterShareButton suppressHydrationWarning url={shareUrl} title="Check out this post!" hashtags={["fashion", "style"]}>
                            <XIcon size={40} className="rounded-full" />
                        </TwitterShareButton>

                        {/* LinkedIn Share */}
                        <LinkedinShareButton suppressHydrationWarning url={shareUrl} title="Check this out!" summary="A cool fashion post" source="FashionApp">
                            <LinkedinIcon size={40} className="rounded-full" />
                        </LinkedinShareButton>

                        {/* WhatsApp Share */}
                        <WhatsappShareButton suppressHydrationWarning url={shareUrl} title="Check out this fashion post!" separator=":: ">
                            <WhatsappIcon size={40} className="rounded-full" />
                        </WhatsappShareButton>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}