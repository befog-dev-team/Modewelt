import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import NotificationWrapper from "./NotificationWrapper";
import { getTodayProfileViews } from "@/lib/queries/profileViews";
import { validateRequest } from "@/auth";

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
    <div className="bg-[#a2defa] min-h-screen">
      <Navbar />
      <NotificationWrapper todayViews={todayViews} user={user} />
      {/* <Footer /> */}
    </div>
  );
}