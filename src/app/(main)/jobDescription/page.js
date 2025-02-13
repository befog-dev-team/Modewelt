"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "react-toastify";

// Reusable Input Component
const InputField = ({ label, name, value, onChange, type = "text", options = [], disabled = false }) => (
    <div className="mb-4">
        <label className="block font-medium">{label}</label>
        {type === "select" ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded-md"
                disabled={disabled} // Apply disabled for select as well
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded-md"
                disabled={disabled} // Apply disabled here
            />
        )}
    </div>
);

export default function JobDescriptionForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        workplaceType: "Remote",
        location: "",
        jobType: "full-time",
        description: "",
        requirements: "",
        benefits: "",
        skills: [],
    });

    // Fetch jobTitle from query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const jobTitle = params.get('jobTitle');
        if (jobTitle) setFormData({ ...formData, jobTitle });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [newSkill, setNewSkill] = useState("");
    const MAX_SKILLS = 10;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addSkill = () => {
        if (newSkill.trim() !== "" && formData.skills.length < MAX_SKILLS) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill.trim()],
            });
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((skill) => skill !== skillToRemove),
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        // Validate form fields
        if (formData.jobTitle.trim() === "") {
            toast.error("Please enter a job title");
            return;
        }
        if (formData.company.trim() === "") {
            toast.error("Please enter a company name");
            return;
        }
        if (formData.location.trim() === "") {
            toast.error("Please enter an employee location");
            return;
        }
        if (formData.workplaceType.trim() === "") {
            toast.error("Please select a workplace type");
            return;
        }
        if (formData.jobType.trim() === "") {
            toast.error("Please select a job type");
            return;
        }
        if (formData.description.trim() === "") {
            toast.error("Please enter a job description");
            return;
        }
        if (formData.requirements.trim() === "") {
            toast.error("Please enter job requirements");
            return;
        }
        if (formData.benefits.trim() === "") {
            toast.error("Please enter job benefits");
            return;
        }
        if (formData.skills.length === 0) {
            toast.error("Please add at least one skill");
            return;
        }
        router.push(`/jobDescriptionSetting?jobTitle=${formData.jobTitle}&company=${encodeURIComponent(formData.company)}&location=${encodeURIComponent(formData.location)}&workplaceType=${encodeURIComponent(formData.workplaceType)}&jobType=${encodeURIComponent(formData.jobType)}&description=${encodeURIComponent(formData.description)}&requirements=${encodeURIComponent(formData.requirements)}&benefits=${formData.benefits}&skills=${encodeURIComponent(formData.skills.join(','))}`);
    }

    console.log("formData description", formData);

    return (
        <div className="bg-[#a2defa] min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                {/* Job Details Section */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Review Job Description</h2>
                    <div className="grid gap-4">
                        {[
                            { label: "Job Title", name: "jobTitle", type: "text", disabled: true },
                            { label: "Company", name: "company", type: "text" },
                            { label: "Employee Location", name: "location", type: "text" },
                        ].map(({ label, name, type, disabled = false }) => (
                            <InputField
                                key={name}
                                label={label}
                                name={name}
                                type={type}
                                value={formData[name]}
                                onChange={handleInputChange}
                                disabled={disabled}  // Apply disabled prop
                            />
                        ))}

                        {[
                            {
                                label: "Workplace Type",
                                name: "workplaceType",
                                type: "select",
                                options: ["Remote", "On-site", "Hybrid"],
                            },
                            {
                                label: "Job Type",
                                name: "jobType",
                                type: "select",
                                options: ["Full-time", "Part-time", "Contract"],
                            },
                        ].map(({ label, name, type, options }) => (
                            <InputField
                                key={name}
                                label={label}
                                name={name}
                                type={type}
                                value={formData[name]}
                                onChange={handleInputChange}
                                options={options}
                            />
                        ))}

                        {/* Job Description */}
                        <div>
                            <label className="block font-medium">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md h-32"
                            />
                        </div>
                        {/* Job Requirements */}
                        <div>
                            <label className="block font-medium">Requirements</label>
                            <textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md h-32"
                            />
                        </div>
                        {/* Job Benifits */}
                        <div>
                            <label className="block font-medium">Benefits</label>
                            <textarea
                                name="benefits"
                                value={formData.benefits}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md h-32"
                            />
                        </div>
                    </div>
                    {/* <button className="mt-4 w-full bg-[#a35284] text-white py-2 rounded-md hover:bg-[#571656]">
                        Save as Draft
                    </button> */}
                </div>

                {/* Skills Section */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Skills</h2>
                    <p className="text-sm text-gray-600 mb-2">
                        Add skill keywords (max {MAX_SKILLS}) to make your job more visible
                        to the right candidates.
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-[#f26744] text-white px-3 py-1 rounded-full"
                            >
                                {skill}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="ml-2 text-white hover:text-gray-300"
                                    aria-label={`Remove ${skill}`}
                                >
                                    <X className="h-4 w-4 text-white" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Skill Input */}
                    <div className="flex items-center mt-3">
                        <input
                            type="text"
                            placeholder="Add skill"
                            className="flex-1 p-2 border rounded-md"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        />
                        <button
                            onClick={addSkill}
                            className="ml-2 bg-[#f26744] px-4 py-2 rounded-md text-white disabled:opacity-50"
                            disabled={formData.skills.length >= MAX_SKILLS}
                            aria-label="Add skill"
                        >
                            +
                        </button>
                        {formData.skills.length >= MAX_SKILLS && (
                            <p className="text-red-500 text-sm mt-2">You can&apos;t add more than {MAX_SKILLS} skills.</p>
                        )}
                    </div>

                    {/* Dropdown Selection */}
                    {/* <div className="mt-6">
                        <label className="block font-medium mb-1">
                            How did you hear about LinkedIn jobs?
                        </label>
                        <select
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select a source</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Google">Google</option>
                            <option value="Referral">Referral</option>
                            <option value="Other">Other</option>
                        </select>
                    </div> */}

                    {/* Buttons */}
                    <div className="mt-6 flex justify-between">
                        {/* <button className="text-[#a35284]">Preview</button> */}
                        <button className="text-[#f26744]"></button>
                        <div>
                            <button onClick={() => router.back()} className="mr-2 px-4 py-2 border rounded-md">
                                Back
                            </button>
                            <button onClick={handleNext} className="bg-[#f26744] text-white px-4 py-2 rounded-md hover:bg-[#f26744]">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}