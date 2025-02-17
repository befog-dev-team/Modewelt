// Left Sections
import CreatePostSection from "../../../components/Feed/CreatePostSection";
import SortBySection from "../../../components/Feed/SortBySection";

// Right Sections
import ProfileSection from "../../../components/Feed/ProfileSection";
import TrendingHashtagsSection from "../../../components/Feed/TrendingHashtagsSection";
import WhoToFollow from "../../../components/Feed/WhoToFollow";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Feed",
  description: "Feed page for showing posts",
};

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#a2e0fa]">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center mt-12 space-y-10 lg:space-y-0 lg:space-x-14 px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex flex-col w-full lg:w-[850px] mb-8 lg:mb-0">
          <Suspense fallback={<Loader2 className="w-6 h-6 animate-spin mx-auto" />}>
            {/* Create Post Section */}
            <CreatePostSection />

            {/* Sort By Section */}
            <SortBySection />
          </Suspense>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[290px] hidden lg:block">
          <Suspense fallback={<Loader2 className="w-6 h-6 animate-spin mx-auto" />}>
            {/* Profile Section */}
            <ProfileSection />

            {/* WhoToFollow Sidebar */}
            <WhoToFollow />

            {/* Trending Hashtags Section */}
            <TrendingHashtagsSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}