'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";
import Account from '../../../components/setting/Account';
import Security from '../../../components/setting/Security';
import Dataprivacy from '../../../components/setting/Dataprivacy'
import Notification from '../../../components/setting/Notification'
import images from "../../../../public/Images/Images1.png"
import Navbar from "../../../components/Navbar"

export default function Network() {
    const [activeSection, setActiveSection] = useState('connections');
    const scrollerRef = useRef(null);

    const AccountRef = useRef(null);
    const SecurityRef = useRef(null);
    const DataprivacyRef = useRef(null);
    const NotificationRef = useRef(null);

    const sectionRefs = useMemo(() => ({
        connections: AccountRef,
        invitations: SecurityRef,
        groups: DataprivacyRef,
        hashtags: NotificationRef,
    }), []);

    useEffect(() => {
        const activeRef = sectionRefs[activeSection];
        if (activeRef.current && scrollerRef.current) {
            const topPosition = activeRef.current.offsetTop;
            scrollerRef.current.style.top = `${topPosition + 0.6}px`;
        }
    }, [activeSection, sectionRefs]);

    return (
        <div className="min-h-screen bg-[#dcf59d]">
            <Navbar />
            <div className="flex flex-col md:flex-row">
                {/* Left Sidebar */}
                <div className="w-full md:max-w-[300px] md:w-[300px] h-auto md:h-[100vh] bg-[#dcf59d] shadow-md">
                    <div className="px-6 flex items-center space-x-4 py-6">
                        <Image
                            src={images}
                            alt="Profile"
                            className="rounded-full h-10 w-10 object-cover"
                        />
                        <div className="text-left">
                            <h1 className="text-2xl font-semibold">Setting</h1>
                        </div>
                    </div>

                    <ul className="relative space-y-0">
                        <div
                            ref={scrollerRef}
                            className="absolute w-[5px] h-[48px] rounded-r-full bg-gradient-to-r from-[#fc3fb4] to-[#fc3fb4] shadow-lg transition-all duration-300 ease-in-out"
                        ></div>

                        <li
                            ref={AccountRef}
                            className="flex items-center w-full h-[51px] cursor-pointer"
                            onClick={() => setActiveSection('connections')}
                        >
                            <span className={`ml-16 font-semibold ${activeSection === 'connections' ? 'text-[#fc3fb4]' : 'text-gray-800'}`}>
                                Account Preferences
                            </span>
                        </li>
                        {/* <li
                            ref={SecurityRef}
                            className="flex items-center w-full h-[51px] cursor-pointer"
                            onClick={() => setActiveSection('invitations')}
                        >
                            <span className={`ml-16 font-semibold ${activeSection === 'invitations' ? 'text-[#a85287]' : 'text-gray-800'}`}>
                                Sign in & Security
                            </span>
                        </li>
                        <li
                            ref={DataprivacyRef}
                            className="flex items-center w-full h-[51px] cursor-pointer"
                            onClick={() => setActiveSection('groups')}
                        >
                            <span className={`ml-16 font-semibold ${activeSection === 'groups' ? 'text-[#a85287]' : 'text-gray-800'}`}>
                                Data Privacy
                            </span>
                        </li>
                        <li
                            ref={NotificationRef}
                            className="flex items-center w-full h-[51px] cursor-pointer"
                            onClick={() => setActiveSection('hashtags')}
                        >
                            <span className={`ml-16 font-semibold ${activeSection === 'hashtags' ? 'text-[#a85287]' : 'text-gray-800'}`}>
                                Notification
                            </span>
                        </li> */}
                    </ul>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-4">
                    {activeSection === 'connections' && <Account />}
                    {activeSection === 'invitations' && <Security />}
                    {activeSection === 'groups' && <Dataprivacy />}
                    {activeSection === 'hashtags' && <Notification />}
                </div>
            </div>
        </div>
    );
}
