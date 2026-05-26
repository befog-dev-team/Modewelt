"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import profileimg from "../../../../public/assets/profile/imgarticle.png";
import { MdEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

export default function EducationPage({ user, username, loggedinUserId }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [educationList, setEducationList] = useState([]);
    const [currentEducation, setCurrentEducation] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null); // Error handling
    const MAX_EDUCATION_LIMIT = 5; // Limit user to 5 education entries

    // Fetch education data when the component loads
    useEffect(() => {
        fetchEducationData();
    }, []);

    const fetchEducationData = async () => {

        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/education/${username}`);
            if (!res.ok) throw new Error("Failed to fetch education data");
            const data = await res.json();
            if (data.success) {
                setEducationList(data.education);
            }
        } catch (error) {
            console.error("Error fetching education data:", error);
            setError("Failed to fetch education data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddEducationClick = () => {
        if (educationList.length >= MAX_EDUCATION_LIMIT) {
            toast.error("You can only add up to 5 education entries.");
            return;
        }
        setCurrentEducation(null);
        setFile(null);
        setIsPopupOpen(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEducation((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleSaveEducation = async () => {
        if (!currentEducation?.institution?.trim() || !currentEducation?.degree?.trim() || !currentEducation?.duration?.trim()) {
            toast.error("All fields are required!");
            return;
        }

        setIsSaving(true);

        const formData = new FormData();
        formData.append("institution", currentEducation.institution);
        formData.append("degree", currentEducation.degree);
        formData.append("duration", currentEducation.duration);
        formData.append("additionalInfo", currentEducation.additionalInfo || "");

        if (file) {
            formData.append("file", file);
        }

        try {
            let res;
            if (currentEducation?.id) {
                // Update existing education
                formData.append("educationId", currentEducation.id);
                res = await fetch("/api/education", {
                    method: "PUT",
                    body: formData,
                });
            } else {
                // Add new education only if limit is not exceeded
                if (educationList.length >= MAX_EDUCATION_LIMIT) {
                    toast.error("You can only add up to 5 education entries.");
                    return;
                }
                res = await fetch("/api/education", {
                    method: "POST",
                    body: formData,
                });
            }

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save education");

            if (data.success) {
                fetchEducationData(); // Refresh data
                setIsPopupOpen(false);
                setCurrentEducation(null);
                setFile(null);
            }
        } catch (error) {
            console.error("Error saving education:", error);
            toast.error(error.message || "Error saving education");
        } finally {
            setIsSaving(false);
        }
    };



    const handleEditEducation = (education) => {
        setCurrentEducation({ ...education });
        setFile(null);
        setIsPopupOpen(true);
    };

    const handleDeleteEducation = async (educationId) => {
        if (!confirm("Are you sure you want to delete this education?")) return;

        setIsSaving(true);

        try {
            const res = await fetch("/api/education", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ educationId }),
            });

            if (!res.ok) throw new Error("Failed to delete education");
            const data = await res.json();

            if (data.success) {
                setEducationList((prev) => prev.filter((edu) => edu.id !== educationId));
            }
        } catch (error) {
            console.error("Error deleting education:", error);
            toast.error("Error deleting education");
        } finally {
            setIsSaving(false);
        }
    };


     // **Cancel Button Functionality**
     const handleCancel = () => {
        setIsPopupOpen(false);
        setCurrentEducation(null); // Reset experience data
        setFile(null); // Clear selected file
    };


    return (
    <div className="max-w-[850px] bg-[#ffffff] dark:bg-gray-900 w-full min-h-fit shadow-lg mt-8 p-4 border dark:border-gray-800 transition-colors">
        <div className="flex justify-between">
            <h1 className="font-bold p-2 dark:text-gray-100">Education</h1>
            {loggedinUserId === user?.id && educationList.length < MAX_EDUCATION_LIMIT && (
                <LuPlus className="cursor-pointer text-2xl dark:text-gray-400 dark:hover:text-white transition-colors" onClick={handleAddEducationClick} />
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
                    {educationList.map((education) => (
                       <div key={education.id} className="flex items-center justify-between p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 relative group transition-colors border dark:border-gray-700 mb-3">

                            <div className="flex items-center space-x-4">
                                <div className="w-[54px] h-[54px]">
                                    <Image
                                        width={250}
                                        height={160}
                                        src={education.imageUrl || profileimg}
                                        alt="Education Image"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-sm font-normal mb-1 dark:text-gray-100">{education.institution}</h1>
                                    <div className="mb-2">
                                        <p className="text-[10px] text-gray-700 dark:text-gray-400">{education.degree}</p>
                                        <p className="text-[10px] text-gray-700 dark:text-gray-400">{education.duration}</p>
                                        <p className="text-[10px] text-gray-700 dark:text-gray-400">{education.additionalInfo}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {loggedinUserId === user?.id && (
                                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MdEdit
                                        className="text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-500"
                                        size={20}
                                        onClick={() => handleEditEducation(education)}
                                    />
                                    <MdDelete
                                        className="text-red-500 cursor-pointer hover:text-red-700"
                                        size={20}
                                        onClick={() => handleDeleteEducation(education.id)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-[500px] border dark:border-gray-800 transition-colors">
                        <h2 className="text-lg font-bold mb-4 dark:text-white">{currentEducation?.id ? "Edit Education" : "Add Education"}</h2>
                        <input type="text" name="institution" placeholder="Institution Name" value={currentEducation?.institution || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#a35285]" />
                        <input type="text" name="degree" placeholder="Degree & Stream" value={currentEducation?.degree || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#a35285]" />
                        <input type="text" name="duration" placeholder="Duration" value={currentEducation?.duration || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#a35285]" />
                        <textarea name="additionalInfo" placeholder="Additional Information" value={currentEducation?.additionalInfo || ""} onChange={handleInputChange} className="w-full border dark:border-gray-700 bg-transparent dark:text-white p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-[#a35285]"></textarea>
                        <input type="file" accept="image/*" className="w-full border dark:border-gray-700 bg-transparent dark:text-gray-400 p-2 rounded" onChange={handleImageChange} />
                        <div className="flex justify-between mt-3">
                        <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200 px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
                        <button className="bg-[#a35285] text-white px-4 py-2 rounded" onClick={handleSaveEducation} disabled={isSaving}>
                        {isSaving ? "Saving..." : currentEducation?.id ? "Update" : "Save"}
                        </button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
}