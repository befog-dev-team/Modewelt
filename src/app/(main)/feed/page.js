import nextDynamic from "next/dynamic";
import { Suspense } from "react";

// Left Sections (Lazy Loaded)
const CreatePostSection = nextDynamic(() => import("../../../components/Feed/CreatePostSection"), {
  loading: () => <div className="h-40 animate-pulse bg-white dark:bg-gray-800 mb-4 rounded-lg" />,
});
const SortBySection = nextDynamic(() => import("../../../components/Feed/SortBySection"), {
  loading: () => <div className="h-10 animate-pulse bg-white dark:bg-gray-800 mb-4 rounded-lg" />,
});

// Right Sections (Lazy Loaded)
const ProfileSection = nextDynamic(() => import("../../../components/Feed/ProfileSection"), {
  loading: () => <div className="h-64 animate-pulse bg-white dark:bg-gray-800 mb-4" />,
});
const WhoToFollow = nextDynamic(() => import("../../../components/Feed/WhoToFollow"), {
  loading: () => <div className="h-64 animate-pulse bg-white dark:bg-gray-800 mb-4" />,
});
const TrendingHashtagsSection = nextDynamic(() => import("../../../components/Feed/TrendingHashtagsSection"), {
  loading: () => <div className="h-64 animate-pulse bg-white dark:bg-gray-800 mb-4" />,
});

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Feed",
  description: "Feed page for showing posts",
};

export default async function Page() {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 opacity-[0.25]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA4fHxwcmludGVkJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')" }}
      ></div>
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-white/75 dark:bg-black/80 backdrop-blur-[0px] -z-10"></div>

      <div className="flex flex-col lg:flex-row justify-center mt-12 space-y-10 lg:space-y-0 lg:space-x-14 px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex flex-col w-full lg:w-[850px] mb-8 lg:mb-0">
          <Suspense fallback={<div className="h-40 animate-pulse bg-white dark:bg-gray-800 mb-4 rounded-lg" />}>
            {/* Create Post Section */}
            <CreatePostSection />
          </Suspense>

          <Suspense fallback={<div className="h-10 animate-pulse bg-white dark:bg-gray-800 mb-4 rounded-lg" />}>
            {/* Sort By Section */}
            <SortBySection />
          </Suspense>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[290px] space-y-6">
          <Suspense fallback={<div className="h-64 animate-pulse bg-white dark:bg-gray-800 mb-4" />}>
            {/* Profile Section */}
            <ProfileSection />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-white dark:bg-gray-800 mb-4" />}>
            {/* WhoToFollow Sidebar */}
            <WhoToFollow />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-white dark:bg-gray-800 mb-4" />}>
            {/* Trending Hashtags Section */}
            <TrendingHashtagsSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
