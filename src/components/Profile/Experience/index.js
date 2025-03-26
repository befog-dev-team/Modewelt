"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import { MdEdit, MdDelete } from "react-icons/md";
import { Loader2 } from "lucide-react";
import axios from "axios";
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
    }, []);

    const fetchExperiences = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/experience/${username}`);
            if (response.data.success) {
                setExperienceList(response.data.experiences);
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
        if (!currentExperience?.jobTitle?.trim() || !currentExperience?.company?.trim() || !currentExperience?.duration?.trim()) {
            toast.error("All fields are required!");
            return;
        }

        setIsSaving(true);

        const formData = new FormData();
        formData.append("jobTitle", currentExperience.jobTitle);
        formData.append("company", currentExperience.company);
        formData.append("location", currentExperience.location);
        formData.append("duration", currentExperience.duration);
        formData.append("description", currentExperience.description || "");

        if (file) {
            formData.append("file", file);
        }

        try {
            let response;
            if (currentExperience?.id) {
                formData.append("experienceId", currentExperience.id);
                response = await axios.put("/api/experience", formData);
            } else {
                if (experienceList.length >= MAX_EXPERIENCE_LIMIT) {
                    toast.error("You can only add up to 5 experiences.");
                    return;
                }
                response = await axios.post("/api/experience", formData);
            }

            if (response.data.success) {
                fetchExperiences();
                setIsPopupOpen(false);
                setCurrentExperience(null);
                setFile(null);
            }
        } catch (error) {
            console.error("Error saving experience:", error);
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
            const response = await axios.delete("/api/experience", {
                data: { experienceId },
            });

            if (response.data.success) {
                setExperienceList((prev) => prev.filter((exp) => exp.id !== experienceId));
            }
        } catch (error) {
            console.error("Error deleting experience:", error);
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
    <div className="max-w-[850px] bg-[#ffffff] w-full min-h-fit shadow-lg mt-8 p-4">
    <div className="flex justify-between">
        <h1 className="font-bold p-2">Experience</h1>
        {loggedinUserId === user?.id && experienceList.length < MAX_EXPERIENCE_LIMIT && (
            <LuPlus className="cursor-pointer text-2xl" onClick={handleAddExperienceClick} />
        )}
    </div>

    {isLoading && <Loader2 className="mx-auto animate-spin size-6" />}
    {error && <p className="text-red-500">{error}</p>}
    {!isLoading && !error && (
                <div className="w-full h-full">
                    {experienceList.map((experience) => (
                                           <div key={experience.id} className="flex items-center justify-between p-2 rounded-lg shadow-md relative group">
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
                                    <h1 className="text-sm font-normal mb-1">{experience.jobTitle}</h1>
                                    <p className="text-[10px]">{experience.company} | {experience.location}</p>
                                    <p className="text-[10px]">{experience.duration}</p>
                                    <p className="text-[10px]">{experience.description}</p>
                                </div>
                            </div>

{loggedinUserId === user?.id && (
    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <MdEdit className="text-gray-600 cursor-pointer hover:text-blue-500" size={20} onClick={() => handleEditExperience(experience)} />
        <MdDelete className="text-red-500 cursor-pointer hover:text-red-700" size={20} onClick={() => handleDeleteExperience(experience.id)} />
    </div>
)}
                        </div>
                    ))}
                </div>
            )}

            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
                        <h2 className="text-lg font-bold">{currentExperience?.id ? "Edit Experience" : "Add Experience"}</h2>
                        <input type="text" name="jobTitle" placeholder="Job Title" value={currentExperience?.jobTitle || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded" />
                        <input type="text" name="company" placeholder="Company" value={currentExperience?.company || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded" />
                        <input type="text" name="location" placeholder="Location" value={currentExperience?.location || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded" />
                        <input type="text" name="duration" placeholder="Duration" value={currentExperience?.duration || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded" />
                        <textarea name="description" placeholder="Description" value={currentExperience?.description || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded"></textarea>
                        <input type="file" accept="image/*" className="w-full border p-2 rounded" onChange={handleImageChange} />

                        <div className="flex justify-between mt-3">
                            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
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
