"use client";

import { useState } from "react";
import { Avatar } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
// import Image from "next/image";
// import profileimg from "../../../public/assets/profile/imgarticle.png";

export default function SkillsPage() {
  const skills = [
    { title: "Fashion Designer", endorsements: 6 },
    { title: "Graphic Designer", endorsements: 7 },
    { title: "UI/UX Designer", endorsements: 5 },
    { title: "Web Developer", endorsements: 4 },
    { title: "App Developer", endorsements: 3 },
    { title: "Product Designer", endorsements: 2 },
  ];

  const [visibleSkills, setVisibleSkills] = useState(3);

  const handleSeeMoreLess = () => {
    setVisibleSkills((prev) => (prev < skills.length ? skills.length : 3));
  };

  return (
    <div className="max-w-[850px] w-full mt-4 shadow-lg min-h-fit p-4">
      <div className="flex justify-between">
        <h1 className="font-bold font-[Gotham]">Skills & Endorsements</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 px-4">
        {skills.slice(0, visibleSkills).map((skill, index) => (
          <div key={index} className="w-full h-auto bg-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">{skill.title}</span>
              <span className="text-[#A45286] font-bold">{skill.endorsements}</span>
            </div>

            <div className="flex items-center mt-2">
              <AvatarGroup total={skill.endorsements} sx={{ "& .MuiAvatar-root": { width: 24, height: 24 } }}>
                {[...Array(skill.endorsements)].map((_, idx) => (
                  <Avatar key={idx} alt="Avatar" src="/assets/profile/imgarticle.png" />
                ))}
              </AvatarGroup>
            </div>
          </div>
        ))}
      </div>

      <p
        className="mt-4 text-left font-bold pr-4 text-sm text-[#A45286] cursor-pointer"
        onClick={handleSeeMoreLess}
      >
        {visibleSkills < skills.length ? `See more (${skills.length - visibleSkills})` : "See less"}
      </p>
    </div>
  );
}
