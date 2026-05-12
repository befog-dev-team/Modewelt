import { Metadata } from "next";
import Chat from "./Chat";

// import Footer from "@/components/Footer";

// Page metadata
export const metadata: Metadata = {
    title: "Chat",
};


export default function Page() {
    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }}
            ></div>
            {/* Overlay for readability */}
            <div className="fixed inset-0 bg-white/75 backdrop-blur-[1px] -z-10"></div>
            <Chat />
            {/* <Footer /> */}
        </div>
    );
}