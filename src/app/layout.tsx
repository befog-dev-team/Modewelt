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

// Define the global styles
export const metadata: Metadata = { // Define the metadata object
  title: { // Define the title object
    template: "Modewelt | %s", // Define the title template
    default: "Modewelt", // Define the default title
  },
  description: "Connect to the world of fashion and style", // Define the description
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
