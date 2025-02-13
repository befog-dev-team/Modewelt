// "use client";
// import { useState, useEffect } from "react";
// import { Avatar } from "@mui/material";
// import AvatarGroup from "@mui/material/AvatarGroup";
// import { LuPlus } from "react-icons/lu";
// import { MdDelete } from "react-icons/md"; // Import delete icon
// import profileimg from "../../../../public/assets/profile/imgarticle.png";

// export default function SkillsPage() {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [skills, setSkills] = useState([]); // API fetched skills
//     const [newSkill, setNewSkill] = useState({ title: "" });
//     const [visibleSkills, setVisibleSkills] = useState(3);
//     const [isLoading, setIsLoading] = useState(false); // 🔹 Loading state
//     const [isSaving, setIsSaving] = useState(false); // 🔹 Saving state

//     // 🔹 Fetch all skills from the API when the component loads
//     useEffect(() => {
//         fetchSkills();
//     }, []);

//     const fetchSkills = async () => {
//         setIsLoading(true);
//         try {
//             const res = await fetch("/api/skills");
//             const data = await res.json();
//             setSkills(data);
//         } catch (error) {
//             console.error("Error fetching skills:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // 🔹 Toggle between showing all skills or limiting to 3
//     const handleSeeMoreLess = () => {
//         setVisibleSkills((prev) => (prev < skills.length ? skills.length : 3));
//     };

//     // 🔹 Handle opening add skill modal
//     const handleAddSkillClick = () => {
//         setIsPopupOpen(true);
//     };

//     // 🔹 Handle input change for new skill
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewSkill((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // 🔹 Save new skill (POST request)
//     const handleSaveSkill = async () => {
//         if (newSkill.title.trim() === "") {
//             alert("Skill title is required!");
//             return;
//         }

//         setIsSaving(true); // Start saving state

//         try {
//             const res = await fetch("/api/skills", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ title: newSkill.title }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 setSkills((prevSkills) => [...prevSkills, data.skill]); // Update UI
//                 setIsPopupOpen(false);
//                 setNewSkill({ title: "" });
//             } else {
//                 alert(data.error);
//             }
//         } catch (error) {
//             console.error("Error adding skill:", error);
//         } finally {
//             setIsSaving(false); // Stop saving state
//         }
//     };

//     // 🔹 Function to endorse/unendorse a skill
//     const handleEndorse = async (skillId) => {
//         try {
//             const res = await fetch("/api/skills/endorse", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ skillId }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 // Update the skill endorsements in the UI
//                 setSkills((prevSkills) =>
//                     prevSkills.map((skill) =>
//                         skill.id === skillId
//                             ? { ...skill, endorsements: data.endorsed ? skill.endorsements + 1 : skill.endorsements - 1 }
//                             : skill
//                     )
//                 );
//             } else {
//                 alert(data.error);
//             }
//         } catch (error) {
//             console.error("Error endorsing skill:", error);
//         }
//     };

//     // 🔹 Function to delete a skill (Only for the skill owner)
//     const handleDeleteSkill = async (skillId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
//         if (!confirmDelete) return;

//         try {
//             const res = await fetch(`/api/skills/${skillId}`, {
//                 method: "DELETE",
//             });

//             if (res.ok) {
//                 setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId)); // Remove from UI
//             } else {
//                 const data = await res.json();
//                 alert(data.error);
//             }
//         } catch (error) {
//             console.error("Error deleting skill:", error);
//         }
//     };

//     return (
//         <div className="max-w-[850px] w-full mt-4 shadow-lg min-h-fit p-4">
//             {/* Header Section */}
//             <div className="flex justify-between">
//                 <div className="flex space-x-5 mt-3">
//                     <h1 className="font-bold font-[Gotham]">Skills & Endorsements</h1>
//                 </div>
//                 <div className="cursor-pointer" onClick={handleAddSkillClick}>
//                     <LuPlus className=" text-2xl" />
//                 </div>
//             </div>

//             {/* 🔹 Show Loading Indicator */}
//             {isLoading ? (
//                 <p className="text-center text-[#A45286]">Loading...</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 px-4">
//                     {skills.slice(0, visibleSkills).map((skill) => (
//                         <div key={skill.id} className="w-full h-auto bg-gray-200 p-4 rounded-lg">
//                             <div className="flex justify-between items-center">
//                                 <span className="font-semibold text-sm">{skill.title}</span>
//                                 <span className="text-[#A45286] font-bold">{skill.endorsements}</span>
//                             </div>

//                             {/* Avatar Group */}
//                             <div className="flex items-center mt-2">
//                                 <AvatarGroup total={skill.endorsements}>
//                                     {[...Array(skill.endorsements)].map((_, idx) => (
//                                         <Avatar key={idx} alt="Avatar" src={profileimg} />
//                                     ))}
//                                 </AvatarGroup>
//                             </div>

//                             {/* Action Buttons: Endorse & Delete */}
//                             <div className="flex justify-between items-center mt-2">
//                                 <button
//                                     className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
//                                     onClick={() => handleEndorse(skill.id)}
//                                 >
//                                     Endorse
//                                 </button>
//                                 <MdDelete
//                                     className="text-gray-500 cursor-pointer text-xl"
//                                     onClick={() => handleDeleteSkill(skill.id)}
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* See More / See Less Button */}
//             {skills.length > 3 && (
//                 <p
//                     className="mt-4 text-left font-bold pr-4 text-sm text-[#A45286] cursor-pointer"
//                     onClick={handleSeeMoreLess}
//                 >
//                     {visibleSkills < skills.length ? `See more (${skills.length - visibleSkills})` : "See less"}
//                 </p>
//             )}

//             {/* Add Skill Modal */}
//             {isPopupOpen && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded shadow-lg w-[500px]">
//                         <h2 className="text-lg font-bold mb-4">Add New Skill</h2>

//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Skill Title"
//                             value={newSkill.title}
//                             onChange={handleInputChange}
//                             className="w-full border p-2 mb-3 rounded"
//                         />

//                         <div className="flex justify-end mt-4">
//                             <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={() => setIsPopupOpen(false)}>
//                                 Cancel
//                             </button>
//                             <button
//                                 className="bg-[#A45286] text-white px-4 py-2 rounded"
//                                 onClick={handleSaveSkill}
//                                 disabled={isSaving}
//                             >
//                                 {isSaving ? "Saving..." : "Save"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



"use client";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import { LuPlus } from "react-icons/lu";
import { MdDelete } from "react-icons/md"; // Import delete icon
import profileimg from "../../../../public/assets/profile/imgarticle.png";

export default function SkillsPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [skills, setSkills] = useState([]); // API fetched skills
    const [newSkill, setNewSkill] = useState({ title: "" });
    const [visibleSkills, setVisibleSkills] = useState(3);
    const [isLoading, setIsLoading] = useState(false); // 🔹 Loading state
    const [isSaving, setIsSaving] = useState(false); // 🔹 Saving state

    // 🔹 Fetch all skills from the API when the component loads
    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/skills");
            const data = await res.json();
            setSkills(data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 🔹 Toggle between showing all skills or limiting to 3
    const handleSeeMoreLess = () => {
        setVisibleSkills((prev) => (prev < skills.length ? skills.length : 3));
    };

    // 🔹 Handle opening add skill modal
    const handleAddSkillClick = () => {
        setIsPopupOpen(true);
    };

    // 🔹 Handle input change for new skill
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSkill((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // 🔹 Save new skill (POST request)
    const handleSaveSkill = async () => {
        if (newSkill.title.trim() === "") {
            alert("Skill title is required!");
            return;
        }

        setIsSaving(true); // Start saving state

        try {
            const res = await fetch("/api/skills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newSkill.title }),
            });

            const data = await res.json();
            if (res.ok) {
                setSkills((prevSkills) => [...prevSkills, data.skill]); // Update UI
                setIsPopupOpen(false);
                setNewSkill({ title: "" });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error adding skill:", error);
        } finally {
            setIsSaving(false); // Stop saving state
        }
    };

    // 🔹 Function to endorse a skill (adds user to endorsement group)
    const handleEndorse = async (skillId) => {
        try {
            const res = await fetch("/api/skills/endorse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skillId }),
            });

            const data = await res.json();
            if (res.ok) {
                // Update the skill endorsements and endorsers (avatars)
                setSkills((prevSkills) =>
                    prevSkills.map((skill) =>
                        skill.id === skillId
                            ? { 
                                ...skill, 
                                endorsements: data.endorsed ? skill.endorsements + 1 : skill.endorsements - 1,
                                endorsers: data.endorsers // API returns the updated list of endorsing users
                            }
                            : skill
                    )
                );
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error endorsing skill:", error);
        }
    };

    // 🔹 Function to delete a skill (Only for the skill owner)
    const handleDeleteSkill = async (skillId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/skills/${skillId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId)); // Remove from UI
            } else {
                const data = await res.json();
                alert(data.error);
            }
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    return (
        <div className="max-w-[850px] bg-[#ffffff] w-full mt-4 shadow-lg min-h-fit p-4">
            {/* Header Section */}
            <div className="flex justify-between">
                <div className="flex space-x-5 mt-3">
                    <h1 className="font-bold font-[Gotham]">Skills & Endorsements</h1>
                </div>
                <div className="cursor-pointer" onClick={handleAddSkillClick}>
                    <LuPlus className=" text-2xl" />
                </div>
            </div>

            {/* 🔹 Show Loading Indicator */}
            {isLoading ? (
                <p className="text-center text-[#A45286]">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 px-4">
                    {skills.slice(0, visibleSkills).map((skill) => (
                        <div key={skill.id} className="w-full h-auto bg-gray-200 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm">{skill.title}</span>
                                <span className="text-[#A45286] font-bold">{skill.endorsements}</span>
                            </div>

                            {/* Avatar Group: Dynamic Endorsement Avatars */}
                            <div className="flex items-center mt-2">
                                <AvatarGroup max={4}>
                                    {skill.endorsers && skill.endorsers.map((endorser) => (
                                        <Avatar key={endorser.id} alt={endorser.name} src={endorser.avatarUrl || profileimg} />
                                    ))}
                                </AvatarGroup>
                            </div>

                            {/* Action Buttons: Endorse & Delete */}
                            <div className="flex justify-between items-center mt-2">
                                <button
                                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                                    onClick={() => handleEndorse(skill.id)}
                                >
                                    Endorse
                                </button>
                                <MdDelete
                                    className="text-gray-500 cursor-pointer text-xl"
                                    onClick={() => handleDeleteSkill(skill.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* See More / See Less Button */}
            {skills.length > 3 && (
                <p
                    className="mt-4 text-left font-bold pr-4 text-sm text-[#A45286] cursor-pointer"
                    onClick={handleSeeMoreLess}
                >
                    {visibleSkills < skills.length ? `See more (${skills.length - visibleSkills})` : "See less"}
                </p>
            )}

            {/* Add Skill Modal */}
            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
                        <h2 className="text-lg font-bold mb-4">Add New Skill</h2>

                        <input
                            type="text"
                            name="title"
                            placeholder="Skill Title"
                            value={newSkill.title}
                            onChange={handleInputChange}
                            className="w-full border p-2 mb-3 rounded"
                        />

                        <div className="flex justify-end mt-4">
                            <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={() => setIsPopupOpen(false)}>
                                Cancel
                            </button>
                            <button
                                className="bg-[#A45286] text-white px-4 py-2 rounded"
                                onClick={handleSaveSkill}
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}