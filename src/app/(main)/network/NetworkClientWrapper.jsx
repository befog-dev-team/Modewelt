'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Connections from '../../../components/Network/connection';
import Invitations from '../../../components/Network/invitation';
// import Pages from '../../../components/Network/pages';
// import Groups from '../../../components/Network/groups';
// import Teammates from '../../../components/Network/teammates';
import Hashtag from '../../../components/Network/Hashtag';
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

export default function Network({ users, trendingTopics }) {
    const [activeSection, setActiveSection] = useState('connections');
    const scrollerRef = useRef(null);

    const connectionsRef = useRef(null);
    const invitationsRef = useRef(null);
    // const teammatesRef = useRef(null);
    // const groupsRef = useRef(null);
    // const pagesRef = useRef(null);
    const hashtagsRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab) {
            setActiveSection(tab);
        }
    }, []);

    useEffect(() => {
        const sectionRefs = {
            connections: connectionsRef,
            invitations: invitationsRef,
            // teammates: teammatesRef,
            // groups: groupsRef,
            // pages: pagesRef,
            hashtags: hashtagsRef,
        };

        const activeRef = sectionRefs[activeSection];
        if (activeRef.current && scrollerRef.current) {
            const topPosition = activeRef.current.offsetTop;
            scrollerRef.current.style.top = `${topPosition}px`;
        }
    }, [activeSection]);

    return (
        <div className='bg-[#dcf59d] min-h-screen'>
            <Navbar />
            <div className="flex flex-col lg:flex-row mt-4 md:mt-[45px] lg:ml-[134px]">
                {/* Left Sidebar */}
                <div className="w-full sm:w-[240px] md:w-[290px] h-min bg-white shadow-md">
                    <ul className="relative">
                        {/* Scroller Indicator */}
                        <div
                            ref={scrollerRef}
                            className="absolute w-[5px] h-[48px] rounded-r-[50px] bg-[#fc3fb4] shadow-lg transition-all duration-300 ease-in-out"
                        ></div>

                        {[
                            { label: 'Connections', ref: connectionsRef, icon: 'connection', count: '' },
                            { label: 'Invitations', ref: invitationsRef, icon: 'invitation', count: '' },
                            // { label: 'Teammates', ref: teammatesRef, icon: 'teammate', count: '' },
                            // { label: 'Groups', ref: groupsRef, icon: 'group', count: '' },
                            // { label: 'Pages', ref: pagesRef, icon: 'page', count: '' },
                            { label: 'Hashtags', ref: hashtagsRef, icon: 'hashtag', count: '' },
                        ].map((item) => (
                            <li
                                key={item.label}
                                ref={item.ref}
                                className={`flex items-center p-4 border-b-2 border-slate-300 cursor-pointer ${activeSection === item.label.toLowerCase() ? 'opacity-60' : ''
                                    }`}
                                onClick={() => setActiveSection(item.label.toLowerCase())}
                            >
                                <div className="flex items-center">
                                    <Image
                                        width={16}
                                        height={16}
                                        className="w-4 h-4 md:w-[16px] md:h-[16px]"
                                        src={`/assets/network/${item.icon}.png`}
                                        alt={item.label}
                                    />
                                    <span className="ml-2 text-[12px] md:text-[14px] font-bold uppercase">{item.label}</span>
                                </div>
                                {item.count && (
                                    <span className="ml-auto text-[12px] md:text-[14px] font-bold text-gray-600">
                                        {item.count}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Content */}
                <div className="flex-1 mt-6 md:mt-0 px-4">
                    {activeSection === 'connections' && <Connections users={users} />}
                    {activeSection === 'invitations' && <Invitations users={users} />}
                    {/* {activeSection === 'pages' && <Pages />} */}
                    {/* {activeSection === 'groups' && <Groups />} */}
                    {/* {activeSection === 'teammates' && <Teammates />} */}
                    {activeSection === 'hashtags' && <Hashtag trendingTopics={trendingTopics} />}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
