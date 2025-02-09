"use client";

import Image from "next/image";
import profileimg from "../../../public/assets/profile/imgarticle.png";


export default function ProjectPage() {
  const [projectList] = [
    {
      projectName: "University Name, Location",
      details: "Details of Education, Stream etc",
      duration: "2013 — 2017",
      additionalInfo: "Additional English classes and fashion profile courses.",
      img: profileimg
    }
  ];

  return (
    <div className="max-w-[850px] w-full min-h-fit shadow-lg mt-8 p-4">
      <div className='flex justify-between'>
        <div className="flex p-2 space-x-5">
          <h1 className="font-bold">Project</h1>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="w-full h-full">
        {projectList.map((project, index) => (
          <div key={index} className="flex items-center space-x-4 p-2 rounded-lg shadow-md">
            {/* Image Section */}
            <div className="w-[54px] h-[54px]">
              <Image
                width={250}
                height={160}
                src={project.img || profileimg}
                alt="Project Image"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1">
              <h1 className="text-sm font-normal mb-1">{project.projectName}</h1>
              <div className="mb-6">
                <p className="text-[10px]">{project.details}</p>
                <p className="text-[10px]">{project.duration}</p>
                <p className="text-[10px]">{project.additionalInfo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
