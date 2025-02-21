import Head from "next/head";
import Sidebar from "@/app/ui/dashboard/sidebar/sidebar";
import Navbar from "@/app/ui/dashboard/navbar/navbar";

export const metadata = { // Define the metadata object
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

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Head>
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
      </Head>
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-lg min-h-fit">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow-md">
          <Navbar />
        </div>

        {/* Content */}
        <main className="flex-1 p-4 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
