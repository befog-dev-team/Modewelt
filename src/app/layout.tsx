import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

// Uploadthing
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./api/uploadthing/core";

// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: {
    template: "Modeweltjob | %s",
    default: "Modeweltjob",
  },
  description: "Connect to the world of fashion and style",
  keywords: [
    "fashion",
    "style",
    "clothing",
    "apparel",
    "fashion careers",
    "fashion jobs",
    "fashion industry",
    "fashion design",
    "textile jobs",
    "fashion merchandising",
    "fashion retail",
    "fashion trends",
    "fashion accessories",
    "fashion marketing",
    "fashion technology",
    "sustainable fashion",
    "luxury fashion",
    "streetwear",
    "runway fashion",
    "boutique jobs",
    "fashion styling",
    "fashion photography",
    "fashion internships",
    "fashion modeling",
    "fashion influencers",
    "fashion ecommerce",
    "fashion journalism",
    "fashion PR",
    "fashion branding",
    "fast fashion",
    "ethical fashion",
    "custom clothing",
    "designer wear",
    "couture fashion",
    "urban fashion",
    "vintage fashion",
    "eco-friendly fashion",
    "handmade fashion",
    "fashion textiles",
    "fashion events",
    "fashion business",
    "celebrity fashion",
    "menswear",
    "womenswear",
    "kids fashion",
    "fashion footwear",
    "fashion accessories design",
    "high fashion",
    "fashion consultancy",
  ],
  publisher: "Befog",
  creator: "Befog",
  category: "Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PD7DS8W7E6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PD7DS8W7E6');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3599405412984531"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : metadata.keywords ?? undefined}
        />
        <meta name="author" content={metadata.publisher ?? undefined} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Modewelt - Connect to Fashion" />
        <meta property="og:description" content={metadata.description ?? ""} />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:url" content="https://www.modeweltjob.com" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Modewelt - Connect to Fashion" />
        <meta name="twitter:description" content={metadata.description ?? ""} />
        <meta name="twitter:image" content="/img/twitter-image.png" />
        <meta name="twitter:url" content="https://www.modeweltjob.com" />

        {/* Favicon */}
        <link rel="icon" href="/Favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/Favicon/android-chrome-512x512.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[--background-color] overflow-x-hidden`}>
        <ReactQueryProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
          <main>
            <Toaster />
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
