"use client";
// Client-side component for project management
import { useState, useEffect } from "react";
import Image from "next/image";
import profileimg from "../../../../public/assets/profile/backgroundImageBackrgound.png";
import { MdEdit, MdDelete } from "react-icons/md";
import { LuPlus } from "react-icons/lu";


export default function ProjectPage() {
 // State management
 const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls add/edit modal
 const [projects, setProjects] = useState([]); // Stores project list
 const [currentProject, setCurrentProject] = useState(null); // Currently edited project
 const [file, setFile] = useState(null); // Stores uploaded media file
 const [visibleProjects, setVisibleProjects] = useState(3); // Pagination control
 const [isLoading, setIsLoading] = useState(false); // Loading state
 const [error, setError] = useState(null); // Error handling

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects from API
  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

   // Add new project handler
  const handleAddProject = async () => {
     // Form validation
    if (!currentProject?.name?.trim()) {
      alert("Project name is required");
      return;
    }

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("projectName", currentProject.name);
    formData.append("description", currentProject.description || "");
    if (file) formData.append("file", file);

    // API call
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add project");
      // Update state with new project
      const data = await res.json();
      if (data.success) {
        // Reset form
        setProjects([...projects, data.project]);
        setIsPopupOpen(false);
        setCurrentProject(null);
        setFile(null);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Failed to add project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit project handler
  const handleEditProject = (project) => {
    setCurrentProject({ ...project });
    setFile(null); // Reset file if previously selected
    setIsPopupOpen(true);
  };

   // Update project handler (similar structure to Add)
  const handleUpdateProject = async () => {
    if (!currentProject?.name?.trim()) {
      alert("Project name is required");
      return;
    }

    const formData = new FormData();
    formData.append("projectId", currentProject.id);
    formData.append("projectName", currentProject.name);
    formData.append("description", currentProject.description || "");
    if (file) formData.append("file", file); // Add new file only if selected

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update project");

      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === data.project.id ? data.project : p))
        );
        setIsPopupOpen(false);
        setCurrentProject(null);
        setFile(null);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setError("Failed to update project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project handler
  const handleDeleteProject = async (project) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          publicId: project.media?.[0]?.public_id,
        }),
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

   // Media file validation
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.match(/^(image\/.*|video\/.*)$/)) {
      alert("Only images and videos are allowed");
      return;
    }
    setFile(file);
  };

  // Project card component
  const ProjectCard = ({ project }) => (
    <div className="flex flex-col mb-4 w-[250px] group relative">
         {/* Media display section */}
      <div className="w-[250px] h-[187.5px] overflow-hidden rounded-md relative">
        {project.media &&
        project.media.length > 0 &&
        project.media[0].type === "IMAGE" ? (
          <>
            <Image
              width={250}
              height={187.5}
              src={project.media[0].url}
              alt={project.name}
              className="object-cover w-full h-full"
            />
          </>
        ) : project.media && project.media.length > 0 ? (
          <video width={250} height={160} controls className="rounded-md">
            <source src={project.media[0].url} type="video/mp4" />
          </video>
        ) : (
          <Image
            width={250}
            height={160}
            src={profileimg}
            alt={project.name}
            className="rounded-md"
          />
        )}

        {/* Hover actions */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <MdEdit
            aria-label="Edit project"
            className="text-white bg-black bg-opacity-50 p-1 rounded-full cursor-pointer"
            size={20}
            onClick={() => handleEditProject(project)}
          />
          <MdDelete
            aria-label="Delete project"
            className="text-white bg-black bg-opacity-50 p-1 rounded-full cursor-pointer"
            size={20}
            onClick={() => handleDeleteProject(project)}
          />
        </div>
      </div>

       {/* Project details */}
      <div className="mt-2">
        <span className="font-arial">{project.name}</span>
        {project.date && (
        <p className="text-[#5A5A5A] text-[10px]">
          {new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      )}
        <p className="text-[#5A5A5A] text-[10px]">{project.description}</p>
      </div>
    </div>
  );

  return (
    <div className="mt-12 h-auto max-w-[850px] bg-[#ffffff] w-full shadow-lg p-6">
         {/* Header section */}
      <div className="flex justify-between">
        <div className="flex items-center mb-3 space-x-5">
          <h1 className="font-bold">Projects</h1>
          {/* ({projects.length}) */}
        </div>
        <LuPlus
          aria-label="Add project"
          className="cursor-pointer text-2xl"
          onClick={() => {
            setCurrentProject(null); // Ensure fresh state
            setFile(null);
            setIsPopupOpen(true);
          }}
        />
      </div>

    
        {/* Loading and error states */}
      {isLoading && <p className="text-center text-[#A45286]">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

        {/* Projects grid */}
      <div className="flex flex-wrap gap-2 p-4">
        {projects.slice(0, visibleProjects).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination control */}
      {projects.length > 3 && (
        <button
          onClick={() =>
            setVisibleProjects(
              visibleProjects < projects.length ? projects.length : 3
            )
          }
          className="text-[#A45286] font-bold"
        >
          {visibleProjects < projects.length ? "SEE ALL" : "SEE LESS"}
        </button>
      )}

    {/* Add/Edit modal */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h2 className="text-lg font-bold">
              {currentProject?.id ? "Edit Project" : "Add Project"}
            </h2>
            <input
              type="text"
              placeholder="Project Name"
              className="w-full border p-2 mb-3 rounded"
              value={currentProject?.name || ""}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, name: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full border p-2 mb-3 rounded"
              value={currentProject?.description || ""}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  description: e.target.value,
                })
              }
            ></textarea>

            {/* Show Existing Image/Video */}
            {currentProject?.media?.length > 0 && (
              <div className="mb-3">
                {currentProject.media[0].type === "IMAGE" ? (
                  <Image
                    width={250}
                    height={160}
                    src={currentProject.media[0].url}
                    alt="Current Project Media"
                    className="rounded-md"
                  />
                ) : (
                  <video
                    width={250}
                    height={160}
                    controls
                    className="rounded-md"
                  >
                    <source
                      src={currentProject.media[0].url}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            )}

            <input
              type="file"
              accept="image/*,video/*"
              className="w-full border p-2 rounded"
              onChange={handleMediaChange}
            />

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={() => {
                    setIsPopupOpen(false);
                    setCurrentProject(null); // Reset current project
                    setFile(null); // Clear selected file
                  }}
                
              >
                Cancel
              </button>
              <button
                className="bg-[#a35285] text-white px-4 py-2 rounded"
                onClick={
                  currentProject?.id ? handleUpdateProject : handleAddProject
                }
                disabled={isLoading}
              >
                {isLoading
                  ? "Saving..."
                  : currentProject?.id
                  ? "Update"
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}