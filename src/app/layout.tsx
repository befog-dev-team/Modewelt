import type { Metadata } from "next"; // Import the Metadata type from Next.js
import localFont from "next/font/local"; // Import the localFont function from the next/font package
import "./globals.css"; // Import the global styles
import useLenis from "../components/Hooks/index"; // Import the custom Lenis hook
import ReactQueryProvider from "./ReactQueryProvider"; // Import the ReactQueryProvider component

// Uploadthing
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"; // Import the NextSSRPlugin component from the @uploadthing/react/next-ssr-plugin package
import { extractRouterConfig } from "uploadthing/server"; // Import the extractRouterConfig function from the uploadthing/server package
import { fileRouter } from "./api/uploadthing/core"; // Import the fileRouter object from the ./api/uploadthing/core file

import "react-toastify/dist/ReactToastify.css"; // Import the ReactToastify CSS
import { ToastContainer } from "react-toastify";

const geistSans = localFont({ // Create a local font for Geist Sans
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", // Ensures faster font rendering
});

const geistMono = localFont({ // Create a local font for Geist Mono
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap", // Ensures faster font rendering
});

// Define the metadata object
export const metadata: Metadata = { // Define the metadata object
  title: { // Define the title object
    template: "Modewelt | %s", // Define the title template
    default: "Modewelt", // Define the default title
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

// Define the RootLayout component
export default function RootLayout({
  children, // Destructure the children prop
}: Readonly<{ // Define the props type for the RootLayout component as a Readonly object
  children: React.ReactNode; // Define the children prop as a ReactNode
}>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  useLenis; // Use the custom Lenis hook here

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description ?? undefined} />
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : metadata.keywords ?? undefined} />
        <meta name="author" content={metadata.publisher ?? undefined} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Modewelt - Connect to Fashion" />
        <meta property="og:description" content={metadata.description ?? ''} />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:url" content="https://www.modeweltjob.com" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Modewelt - Connect to Fashion" />
        <meta name="twitter:description" content={metadata.description ?? ''} />
        <meta name="twitter:image" content="/img/twitter-image.png" />
        <meta name="twitter:url" content="https://www.modeweltjob.com" />

        {/* Favicon */}
        <link rel="icon" href="Favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="Favicon/android-chrome-512x512.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[--background-color] overflow-x-hidden`} // Define the body element with the classes for the Geist Sans and Geist Mono fonts, antialiased text rendering, the background color, and the overflow-x-hidden property
      >
        <>
          <ReactQueryProvider> {/* Add the ReactQueryProvider component for the React Query context */}
            <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} /> {/* Add the NextSSRPlugin component with the routerConfig prop set to the extracted router configuration from the fileRouter object */}
            {/* ToastContainer component for displaying toasts */}
            <ToastContainer
              position="top-center"
              // autoClose={false}
              newestOnTop
              draggable
            />
            <main>
              {children} {/* Render the children */}
            </main>
          </ReactQueryProvider>
        </>
      </body>
    </html>
  );
}
