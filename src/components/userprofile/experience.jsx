"use client";
import Image from "next/image";
import profileimg from "../../../public/assets/profile/imgarticle.png";

export default function ExperiencePage() {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [experienceList] = [
    {
      jobTitle: "Fashion Designer",
      company: "Self Employed",
      location: "Around the world",
      duration: "Jun 2016 - Present | 3 yrs 3 mos",
      description:
        "Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOS and Android apps; corporate web sites and corporate identity sometimes.",
      img: profileimg
    },
    {
      jobTitle: "Graphic Designer",
      company: "Upwork",
      location: "International",
      duration: "Jun 2019 — Present | 3 mos",
      description:
        "New experience with Upwork system. Work in next areas: UX/UI design, graphic design, interaction design, UX research.",
      img: profileimg
    }
  ];

  return (
    <div className="max-w-[850px] w-full min-h-fit shadow-lg p-4 mt-8">
      {/* Header Section */}
      <div className="flex justify-between">
        <div className="flex p-2 space-x-5">
          <h1 className="font-bold">Experience</h1>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="space-y-3">
        {experienceList.map((experience, index) => (
          <div key={index} className="max-w-[790px] w-full">
            <div className="flex items-center space-x-4 p-2 rounded-lg shadow-md">
              {/* Image Section */}
              <div className="w-[54px] h-[54px]">
                <Image
                  width={250}
                  height={160}
                  src={experience.img || profileimg} // Show the uploaded image or fallback to default
                  alt="Experience"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <p className="text-sm font-normal mb-1">{experience.jobTitle}</p>
                <div>
                  <p className="text-[10px]">{experience.company} | {experience.location}</p>
                  <p className="text-[10px]">{experience.duration}</p>
                  <p className="text-[10px]">{experience.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
