"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";
import useIntializeChatClient from "./useInitializeChatClient";

// Chat component
export default function Chat() {
    // Initialize the chat client
    const chatClient = useIntializeChatClient();

    // Sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // If the chat client is not initialized
    if (!chatClient) {
        return (
            <Loader2 className="h-screen flex justify-center mx-auto items-center text-[#a45286] size-10 animate-spin" />
        );
    }

    return (
        <main className="w-full h-[92vh] mb-[-4rem] mt-[2rem] flex justify-center shadow-xl">
            <div className="relative flex w-[95vw] h-[83vh] bg-card shadow-[#A45286] shadow-sm p-10 rounded-lg border-[#A45286] border-2">
                <StreamChat
                    client={chatClient} // the chat client
                >
                    <ChatSidebar
                        open={!sidebarOpen} // If the sidebar is open
                        onClose={() => setSidebarOpen(true)} // Close the sidebar
                    />
                    <ChatChannel
                        open={sidebarOpen} // If the sidebar is not open
                        openSidebar={() => setSidebarOpen(false)} // Open the sidebar
                    />
                </StreamChat>
            </div>
        </main>
    );
}