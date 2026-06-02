"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import { MdEdit, MdDelete } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import profileimg from "../../../../public/assets/profile/imgarticle.png";
import toast from "react-hot-toast";

export default function ExperiencePage({ user, username, loggedinUserId }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [experienceList, setExperienceList] = useState([]);
    const [currentExperience, setCurrentExperience] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const MAX_EXPERIENCE_LIMIT = 5;

    // Fetch experiences when the component loads
    useEffect(() => {
        fetchExperiences();
    }, [username]);

    const fetchExperiences = async () => {
        if (!username) return;
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/experience/${username}`);
            if (!res.ok) throw new Error("Failed to fetch experiences");
            const data = await res.json();
            if (data.success) {
                setExperienceList(data.experiences);
            }
        } catch (error) {
            console.error("Error fetching experiences:", error);
            setError("Failed to fetch experience data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddExperienceClick = () => {
        if (experienceList.length >= MAX_EXPERIENCE_LIMIT) {
            toast.error("You can only add up to 5 experiences.");
            return;
        }
        setCurrentExperience(null);
        setFile(null);
        setIsPopupOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentExperience((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleSaveExperience = async () => {
        if (!currentExperience?.jobTitle?.trim() || !currentExperience?.company?.trim() || !currentExperience?.location?.trim() || !currentExperience?.duration?.trim()) {
            toast.error("All fields are required!");
            return;
        }

        setIsSaving(true);

        const formData = new FormData();
        formData.append("jobTitle", currentExperience.jobTitle);
        formData.append("company", currentExperience.company);
        formData.append("location", currentExperience.location || "");
        formData.append("duration", currentExperience.duration);
        formData.append("description", currentExperience.description || "");

        if (file) {
            formData.append("file", file);
        }

        try {
            let res;
            if (currentExperience?.id) {
                formData.append("experienceId", currentExperience.id);
                res = await fetch("/api/experience", {
                    method: "PUT",
                    body: formData,
                });
            } else {
                if (experienceList.length >= MAX_EXPERIENCE_LIMIT) {
                    toast.error("You can only add up to 5 experiences.");
                    return;
                }
                res = await fetch("/api/experience", {
                    method: "POST",
                    body: formData,
                });
            }

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save experience");

            if (data.success) {
                fetchExperiences();
                setIsPopupOpen(false);
                setCurrentExperience(null);
                setFile(null);
            }
        } catch (error) {
            console.error("Error saving experience:", error);
            toast.error(error.message || "Error saving experience");
        } finally {
            setIsSaving(false);
        }
    };


    const handleEditExperience = (experience) => {
        setCurrentExperience({ ...experience });
        setFile(null);
        setIsPopupOpen(true);
    };

    const handleDeleteExperience = async (experienceId) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;

        setIsSaving(true);

        try {
            const res = await fetch("/api/experience", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ experienceId }),
            });

            if (!res.ok) throw new Error("Failed to delete experience");
            const data = await res.json();

            if (data.success) {
                setExperienceList((prev) => prev.filter((exp) => exp.id !== experienceId));
            }
        } catch (error) {
            console.error("Error deleting experience:", error);
            toast.error("Error deleting experience");
        } finally {
            setIsSaving(false);
        }
    };


    // **Cancel Button Functionality**
    const handleCancel = () => {
        setIsPopupOpen(false);
        setCurrentExperience(null); // Reset experience data
        setFile(null); // Clear selected file
    };

    return (
    <div className="max-w-[850px] bg-[#ffffff] dark:bg-gray-900 w-full min-h-fit shadow-lg mt-8 p-4 border dark:border-gray-800 transition-colors">
    <div className="flex justify-between">
        <h1 className="font-bold p-2 dark:text-gray-100">Experience</h1>
        {loggedinUserId === user?.id && experienceList.length < MAX_EXPERIENCE_LIMIT && (
            <LuPlus className="cursor-pointer text-2xl dark:text-gray-200 dark:hover:text-white transition-colors" onClick={handleAddExperienceClick} />
        )}
    </div>

    {isLoading && (
        <div className="space-y-4 p-2">
            {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-2">
                    <Skeleton className="w-[54px] h-[54px] rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-1/4" />
                        <Skeleton className="h-2 w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    )}
    {error && <p className="text-red-500">{error}</p>}
    {!isLoading && !error && (
                <div className="w-full h-full">
                    {experienceList.map((experience) => (
                                           <div key={experience.id} className="flex items-center justify-between p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 relative group transition-colors border dark:border-gray-700 mb-3">
                            <div className="flex items-center space-x-4">
                                <div className="w-[54px] h-[54px]">
                                    <Image
                                        width={250}
                                        height={160}
                                        src={experience.imageUrl || profileimg}
                                        alt="Experience Image"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-sm font-normal mb-1 dark:text-gray-100">{experience.jobTitle}</h1>
                                    <p className="text-[10px] text-gray-700 dark:text-gray-400">{experience.company} | {experience.location}</p>
                                    <p className="text-[10px] text-gray-700 dark:text-gray-400">{experience.duration}</p>
                                    <p className="text-[10px] text-gray-700 dark:text-gray-400">{experience.description}</p>
                                </div>
                            </div>

{(loggedinUserId === user?.id || user?.role === "ADMIN") && (
    <div className="absolute top-2 right-2 flex space-x-2">
        <MdEdit className="text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-500" size={20} onClick={() => handleEditExperience(experience)} />
        <MdDelete className="text-red-500 cursor-pointer hover:text-red-700" size={20} onClick={() => handleDeleteExperience(experience.id)} />
    </div>
)}
                        </div>
                    ))}
                </div>
            )}

            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-[500px] border dark:border-gray-800">
                        <h2 className="text-lg font-bold dark:text-white mb-4">{currentExperience?.id ? "Edit Experience" : "Add Experience"}</h2>
                        <input type="text" name="jobTitle" placeholder="Job Title" value={currentExperience?.jobTitle || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#fc3fb4]" />
                        <input type="text" name="company" placeholder="Company" value={currentExperience?.company || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#fc3fb4]" />
                        <input type="text" name="location" placeholder="Location" value={currentExperience?.location || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#fc3fb4]" />
                        <input type="text" name="duration" placeholder="Duration" value={currentExperience?.duration || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#fc3fb4]" />
                        <textarea name="description" placeholder="Description" value={currentExperience?.description || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#fc3fb4]"></textarea>
                        <input type="file" accept="image/*" className="w-full border dark:border-gray-700 bg-transparent dark:text-gray-400 p-2 rounded" onChange={handleImageChange} />

                        <div className="flex justify-between mt-3">
                            <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200 px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
                            <button className="bg-[#a35285] text-white px-4 py-2 rounded" onClick={handleSaveExperience} disabled={isSaving}>
                                {isSaving ? "Saving..." : currentExperience?.id ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
