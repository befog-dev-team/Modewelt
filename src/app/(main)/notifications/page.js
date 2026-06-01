
import { notFound } from "next/navigation";
// import Footer from "@/components/Footer";
import NotificationWrapper from "./NotificationWrapper";
import { getTodayProfileViews } from "@/lib/queries/profileViews";
import { validateRequest } from "@/auth";

export const dynamic = "force-dynamic";

// Page metadata
export const metadata = {
  title: "Notification",
};

export default async function Page() {
  const { user } = await validateRequest(); // Validate the request and get the logged-in user

  if (!user) {
    notFound(); // If the user is not logged in, return a 404 error
  }

  // Fetch today's profile views
  const todayViews = await getTodayProfileViews(user.id);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 opacity-[0.25]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-white/75 dark:bg-black/80 backdrop-blur-[1px] -z-10"></div>

      <NotificationWrapper todayViews={todayViews} user={user} />
      {/* <Footer /> */}
    </div>
  );
}