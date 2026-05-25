import { validateRequest } from "@/auth"; // Import the validateRequest function
import { redirect } from "next/navigation"; // Import the redirect function
import SessionProvider from "./SessionProvider"; // Import the SessionProvider component
import NProgressLoader from "@/components/NProgressLoader"; // Import the NProgressLoader component
import { Metadata } from "next";

import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// Define the metadata object
export const metadata: Metadata = { // Define the metadata object
    title: { // Define the title object
        template: "Modeweltjob | %s", // Define the title template
        default: "Modeweltjob", // Define the default title
    },
    description: "Connect to the world of fashion and style", // Define the description
    keywords: ["fashion", "style", "clothing", "apparel", "fashion careers", "fashion jobs",
        "fashion industry", "fashion design", "textile jobs", "fashion merchandising",
        "fashion retail", "fashion trends", "fashion accessories", "fashion marketing",
        "fashion technology", "sustainable fashion", "luxury fashion", "streetwear",
        "runway fashion", "boutique jobs", "fashion styling", "fashion photography",
        "fashion internships", "fashion modeling", "fashion influencers", "fashion ecommerce",
        "fashion journalism", "fashion PR", "fashion branding", "fast fashion", "ethical fashion",
        "custom clothing", "designer wear", "couture fashion", "urban fashion", "vintage fashion",
        "eco-friendly fashion", "handmade fashion", "fashion textiles", "fashion events",
        "fashion business", "celebrity fashion", "menswear", "womenswear", "kids fashion",
        "fashion footwear", "fashion accessories design", "high fashion", "fashion consultancy"],
    publisher: "Befog", // Define the publisher
    creator: "Befog", // Define the creator
    category: "Fashion", // Define the category
};

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

    // If the user is not logged in, redirect to the home page
    if (!session.user) redirect("/");

    return (
        // Pass the session to the SessionProvider
        (<SessionProvider value={session}>
            <NProgressLoader />
            <Navbar unreadNotificationCount={0} />
            <main className="pt-16 pb-20 lg:pb-0">
                {children}
            </main>
        </SessionProvider>)
    );
}
