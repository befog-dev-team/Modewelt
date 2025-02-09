"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import profileimg from "../../../../public/assets/profile/imgarticle.png";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

export default function EducationPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [educationList, setEducationList] = useState([]);
    const [currentEducation, setCurrentEducation] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const MAX_EDUCATION_LIMIT = 5; // Limit user to 5 education entries

    // Fetch education data when the component loads
    useEffect(() => {
        fetchEducationData();
    }, []);

    const fetchEducationData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/education");
            if (response.data.success) {
                setEducationList(response.data.education);
            }
        } catch (error) {
            console.error("Error fetching education data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddEducationClick = () => {
        if (educationList.length >= MAX_EDUCATION_LIMIT) {
            alert("You can only add up to 5 education entries.");
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
            alert("All fields are required!");
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
            let response;
            if (currentEducation?.id) {
                // Update existing education
                formData.append("educationId", currentEducation.id);
                response = await axios.put("/api/education", formData);
            } else {
                // Add new education only if limit is not exceeded
                if (educationList.length >= MAX_EDUCATION_LIMIT) {
                    alert("You can only add up to 5 education entries.");
                    return;
                }
                response = await axios.post("/api/education", formData);
            }

            if (response.data.success) {
                fetchEducationData(); // Refresh data
                setIsPopupOpen(false);
                setCurrentEducation(null);
                setFile(null);
            }
        } catch (error) {
            console.error("Error saving education:", error);
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
            const response = await axios.delete("/api/education", {
                data: { educationId }
            });

            if (response.data.success) {
                setEducationList((prev) => prev.filter((edu) => edu.id !== educationId));
            }
        } catch (error) {
            console.error("Error deleting education:", error);
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
        <div className="max-w-[850px] w-full min-h-fit shadow-lg mt-8 p-4">
            <div className="flex justify-between">
                <div className="flex p-2 space-x-5">
                    <h1 className="font-bold">Education</h1>
                    {/* ({educationList.length}/5) */} 
                </div>
                {/* Hide add button if user reaches limit */}
                {educationList.length < MAX_EDUCATION_LIMIT && (
                    <div className="cursor-pointer" onClick={handleAddEducationClick}>
                        <LuPlus className="text-2xl" />
                    </div>
                )}
            </div>

            {isLoading ? (
                <p className="text-center text-[#A45286]">Loading...</p>
            ) : (
                <div className="w-full h-full">
                    {educationList.map((education) => (
                        <div key={education.id} className="flex items-center justify-between p-2 rounded-lg shadow-md">
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
                                    <h1 className="text-sm font-normal mb-1">{education.institution}</h1>
                                    <div className="mb-2">
                                        <p className="text-[10px]">{education.degree}</p>
                                        <p className="text-[10px]">{education.duration}</p>
                                        <p className="text-[10px]">{education.additionalInfo}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <MdEdit
                                    className="text-gray-600 cursor-pointer hover:text-blue-500"
                                    size={20}
                                    onClick={() => handleEditEducation(education)}
                                />
                                <MdDelete
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                    size={20}
                                    onClick={() => handleDeleteEducation(education.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
                        <h2 className="text-lg font-bold mb-4">{currentEducation?.id ? "Edit Education" : "Add Education"}</h2>
                        <input type="text" name="institution" placeholder="Institution Name" value={currentEducation?.institution || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded" />
                        <input type="text" name="degree" placeholder="Degree & Stream" value={currentEducation?.degree || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded" />
                        <input type="text" name="duration" placeholder="Duration" value={currentEducation?.duration || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded" />
                        <textarea name="additionalInfo" placeholder="Additional Information" value={currentEducation?.additionalInfo || ""} onChange={handleInputChange} className="w-full border p-2 mb-3 rounded"></textarea>
                        <input type="file" accept="image/*" className="w-full border p-2 rounded" onChange={handleImageChange} />
                        <div className="flex justify-between mt-3">
                        <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
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