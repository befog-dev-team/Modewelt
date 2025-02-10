"use client";
import Image from "next/image";
import profile from "../../../public/assets/profile/backgroundImageBackrgound.png";
export default function ProfileSuggestions() {
    const profiles = [
      {
        name: "Rahul Sahu",
        connection: "2nd",
        action: "Connect",
        image: profile,
      },
      {
        name: "Kunika Malhotra",
        connection: "1st",
        action: "Message",
        image: profile,
      },
      {
        name: "Sidharth Dhiman",
        connection: "2nd",
        action: "Connect",
        image: profile,
      },
      {
        name: "Manvi Tyagi",
        connection: "2nd",
        role: "Software Engineer at Google | Ex-Twitter | Founder at Girl...",
        action: "Follow",
        image: "https://via.placeholder.com/50",
      },
    ];
  
    return (
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 border rounded-lg shadow-md bg-white mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
          More Profiles for You
        </h3>
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 py-3 border-b last:border-b-0"
          >
            {/* Profile Image */}
            <Image
              src={profile.image}
              alt={profile.name}
              className="w-16 h-16 md:w-12 md:h-12 rounded-full object-cover"
            />
  
            {/* Profile Details */}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {profile.name}
                <span className="text-gray-500 text-sm">
                  &middot; {profile.connection}
                </span>
              </h4>
            </div>
  
            {/* Action Button */}
            <button
              className={`px-4 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                profile.action === "Message"
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {profile.action === "Message" ? "✉ Message" : "+ Connect"}
            </button>
          </div>
        ))}
      </div>
    );
  }
  