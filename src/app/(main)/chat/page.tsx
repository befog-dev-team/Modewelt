import { Metadata } from "next";
import Chat from "./Chat";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// Page metadata
export const metadata: Metadata = {
    title: "Chat",
};


export default function Page() {
    return (
        <div>
            <Navbar unreadNotificationCount={undefined} />
            <Chat />
            {/* <Footer /> */}
        </div>
    );
}