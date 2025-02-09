import { validateRequest } from "@/auth"; // Import the validateRequest function
import { redirect } from "next/navigation"; // Import the redirect function
import SessionProvider from "./SessionProvider"; // Import the SessionProvider component
import NProgressLoader from "@/components/NProgressLoader"; // Import the NProgressLoader component
import { ToastContainer } from "react-toastify"; // Import the ToastContainer component
import 'stream-chat-react/dist/css/v2/index.css'; // Import the Stream Chat React CSS

// import { Suspense } from "react";
// import dynamic from "next/dynamic";

// // Lazy load the Navbar and Footer components
// const Navbar = dynamic(() => import("../../components/Navbar"));
// const Footer = dynamic(() => import("../../components/Footer"));

export default async function Layout({
    children, // The children of the component
}: {
    children: React.ReactNode // The children of the component
}) {

    // Validate the request and get the session
    // eslint-disable-next-line
    const session = await validateRequest() as { user: any, session: { id: string, createdAt: Date, userId: string, expiresAt: Date, fresh: boolean } }; // Validate the request
    if (session.session) { // If the session exists
        (session.session as unknown as { fresh: boolean }).fresh = true; // Set the session as fresh
    }

    // If the user is not logged in, redirect to the auth page
    if (!session.user) redirect("/auth");

    return (
        // Pass the session to the SessionProvider
        // eslint-disable-next-line 
        (<SessionProvider value={session}>
            <NProgressLoader /> {/* Include the NProgressLoader here */}
            {/* <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense> */}
            <ToastContainer
                position="top-center"
                // autoClose={false}
                newestOnTop
                draggable
            />
            <main>
                {children}
            </main>
            {/* <Suspense fallback={<div>Loading Footer...</div>}>
                <Footer />
            </Suspense> */}
        </SessionProvider>)
    );
}
