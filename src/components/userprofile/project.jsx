"use client";

import { useState } from "react";
import Image from "next/image";
import profileimg from "../../../public/assets/profile/backgroundImageBackrgound.png";

export default function ProjectPage() {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [, setCurrentProject] = useState(null);

  // State for controlling how many projects are visible
  const [visibleProjects, setVisibleProjects] = useState(3);

  const handleEditClick = () => {
    setCurrentProject(null); // Open the popup to add a new project if necessary
    setIsPopupOpen(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project); // Open the popup to edit the existing project
    setIsPopupOpen(true);
  };

  const handleSave = () => {
    if (currentProject) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === currentProject.id ? currentProject : project
        )
      );
    }
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    const mediaUrl = URL.createObjectURL(file);
    const mediaType = file.type.startsWith("image") ? "image" : "video";

    setCurrentProject({
      ...currentProject,
      media: mediaUrl,
      mediaType: mediaType,
    });
  };

  const handleSeeMoreLess = () => {
    if (visibleProjects < projects.length) {
      setVisibleProjects(projects.length); // Show all projects
    } else {
      setVisibleProjects(3); // Show only the first 3 projects
    }
  };

  return (
    <div className="bg-white mt-12 h-auto max-w-[850px] w-full shadow-lg p-6">
      {/* Header Section */}
      <div className="flex justify-between">
        <div className="flex items-center mb-3 space-x-5">
          <h1 className="font-bold w-[75px] font-[Gotham]">Project</h1>
          <p className="text-[18px] text-[#747474]">3 of {projects.length}</p>
        </div>
      </div>

      {/* Images and Text Section */}
      <div className="flex flex-wrap gap-2 p-4">
        {projects.slice(0, visibleProjects).map((project) => (
          <div key={project.id} className="flex flex-col mb-4 w-[250px]">
            {project.mediaType === "image" ? (
              <Image
                width={250}
                height={160}
                src={project.media}
                alt={`Project ${project.id}`}
                className="w-[250px] h-[160px] object-cover rounded-md"
              />
            ) : (
              <video
                width={250}
                height={160}
                controls
                className="w-[250px] h-[160px] object-cover rounded-md"
              >
                <source src={project.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="mt-2 flex flex-col">
              <span className="font-arial">{project.name}</span>
              <span
                className="text-[#5A5A5A] text-[10px] cursor-pointer"
                onClick={() => handleEditProject(project)}
              >
                {project.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* See More / See Less Section */}
      <div className="text-left pl-4">
        <span
          className="text-[#A45286] cursor-pointer font-bold text-[12px]"
          onClick={handleSeeMoreLess}
        >
          {visibleProjects < projects.length ? (
            <>
              SEE ALL
              <span className="text-[#A45286] rounded-md text-[12px]">
                ({projects.length})
              </span>
            </>
          ) : (
            "SEE LESS"
          )}
        </span>
      </div>
    </div>
  );
}
