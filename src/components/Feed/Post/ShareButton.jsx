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
import { toast } from "react-toastify";

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
                <motion.div initial="hide" animate="show" variants={variant1} className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4">
                    <motion.div variants={variant2} className="flex justify-between space-x-4">
                        <button onClick={copyToClipboard} className="flex items-center justify-center w-20 h-10 rounded-full bg-gray-200 hover:bg-gray-300">
                            <LuClipboard size={30} />
                        </button>

                        <FacebookShareButton url={shareUrl} quote="Check this out!" hashtag="#fashion">
                            <FacebookIcon size={40} round data-networkname="facebook" />
                        </FacebookShareButton>

                        <TwitterShareButton url={shareUrl} title="Check out this post!" hashtags={["fashion", "style"]}>
                            <XIcon size={40} round data-networkname="twitter" />
                        </TwitterShareButton>

                        <LinkedinShareButton url={shareUrl} title="Check this out!" summary="A cool fashion post" source="FashionApp">
                            <LinkedinIcon size={40} round data-networkname="linkedin" />
                        </LinkedinShareButton>

                        <WhatsappShareButton url={shareUrl} title="Check out this fashion post!" separator=":: ">
                            <WhatsappIcon size={40} round data-networkname="whatsapp" />
                        </WhatsappShareButton>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
