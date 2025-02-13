"use client";

import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
// import Navbar from "@/components/Navbar";
import { IoMdRefresh } from "react-icons/io";
import { FaPlus, FaTrash } from "react-icons/fa6";
// import { BellRing } from "lucide-react";
// import { CircleUser } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "../../SessionProvider";
import { toast } from "react-toastify";

// Input Field Component 
function InputField({ label, type, placeholder, required = false, value, onChange }) {
    return (
        <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#a35284]"
                required={required}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

// Select Field Component 
function SelectField({ label, value, options, onChange, required = false }) {
    return (
        <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#a35284]"
                value={value} // <-- Controlled value
                onChange={(e) => onChange(e.target.value)} // <-- Pass value to parent
                required={required}
            >
                <option value="">Select an option</option>
                {options.map((option, idx) => (
                    <option key={idx} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

// File Upload Component
function FileUpload({ label, description, accept, onChange }) {
    return (
        <div className="flex flex-col items-center justify-center bg-[#a2defa] border border-gray-300 rounded-lg p-6 text-center">
            <label
                htmlFor="fileUpload"
                className="text-lg font-medium text-[#a35284] cursor-pointer"
            >
                {label}
            </label>
            <input
                id="fileUpload"
                type="file"
                className="hidden"
                accept={accept}
                onChange={onChange} // Pass the onChange handler
            />
            <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
    );
}

// Function to fetch job data from API
const fetchJob = async (id) => {
    const response = await axios.get(`/api/jobs/${id}`);
    return response.data;
};

// Function to handle 404 error
export default function Home() {
    const { user } = useSession();

    const { id } = useParams(); // Get the job id from the URL
    if (!id) notFound(); // Redirect to 404 page if id is not provided

    // State variables
    const [formData, setFormData] = useState({
        jobId: id,
        userId: user.id,
        resumeFile: null,
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        email: "",
        countryCode: "+91",
        phone: "",
        additionalDocuments: null,
        dob: "",
        experienceYears: "",
        experienceMonths: "",
        currentSalary: "",
        expectedSalary: "",
        preferredLocation: "",
        availableJoinDays: "",
        currentLocation: "",
        notes: "",
        language: "",
        skills: "",
        experienceList: [{ id: "", role: "", company: "" }],
        educationList: [{ id: "", degree: "", institution: "" }],
        role: "",
        company: "",
        degree: "",
        institution: "",
        checkbox: false,
    });

    const [captcha, setCaptcha] = useState("16LP3");
    const [inputCaptcha, setInputCaptcha] = useState("");

    const [files, setFiles] = useState([]);
    const [errorFile, setErrorFile] = useState(null);

    const [submitLoading, setSubmitLoading] = useState(false);

    // Using useQuery to fetch and cache job data
    const { data: job, error, isLoading } = useQuery({
        queryKey: ["job", id],  // Cache key based on the job id
        queryFn: () => fetchJob(id),  // Fetch function
        staleTime: 1000 * 60 * 5,  // Cache the data for 5 minutes
    });

    // Regenerate captcha function
    const regenerateCaptcha = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let newCaptcha = "";
        for (let i = 0; i < 5; i++) {
            newCaptcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(newCaptcha);
    };

    // Loading or error state handling
    if (isLoading) {
        return (
            <Loader2 className="h-screen flex justify-center mx-auto items-center text-[#a45286] size-10 animate-spin" />
        );
    }

    // Error handling if job data fetch fails
    if (error) {
        return <div className="min-h-screen bg-gray-100">Error: {error.message}</div>;
    }

    const addExperience = (event) => {
        event.preventDefault();
        if (!formData.role.trim() || !formData.company.trim()) {
            alert("Please enter both role and company.");
            return;
        }

        const newExperience = {
            id: Date.now(),
            role: formData.role,
            company: formData.company,
        };

        setFormData((prevState) => ({
            ...prevState,
            experienceList:
                prevState.experienceList.length > 0 && prevState.experienceList[0].id === ""
                    ? [newExperience] // Replace the empty first entry
                    : [...prevState.experienceList, newExperience], // Append if not empty
            role: "", // Reset input fields
            company: "",
        }));
    };

    const addEducation = (event) => {
        event.preventDefault();
        if (!formData.degree.trim() || !formData.institution.trim()) {
            alert("Please enter both degree and institution.");
            return;
        }

        const newEducation = {
            id: Date.now(),
            degree: formData.degree,
            institution: formData.institution,
        };

        setFormData((prevState) => ({
            ...prevState,
            educationList:
                prevState.educationList.length > 0 && prevState.educationList[0].id === ""
                    ? [newEducation] // Replace the empty first entry
                    : [...prevState.educationList, newEducation], // Append if not empty
            degree: "", // Reset input fields
            institution: "",
        }));
    };

    // Function to remove education entry by id
    // Function to remove education entry by id
    const removeEducation = (id) => {
        setFormData((prevState) => ({
            ...prevState,
            educationList: prevState.educationList.filter(
                (edu) => edu.id !== id && edu.degree && edu.institution
            ),
        }));
    };

    // Function to remove experience entry by id
    const removeExperience = (id) => {
        setFormData((prevState) => ({
            ...prevState,
            experienceList: prevState.experienceList.filter(
                (exp) => exp.id !== id && exp.role && exp.company
            ),
        }));
    };

    // Function to handle file change
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
        const maxSize = 10 * 1024 * 1024; // 10MB

        // Filter out invalid files
        const validFiles = selectedFiles.filter(file => file.size <= maxSize);
        const invalidFiles = selectedFiles.filter(file => file.size > maxSize);

        // Show error if any file was too large
        if (invalidFiles.length > 0) {
            setErrorFile("Some files exceed 10MB and were not added.");
        } else {
            setErrorFile(null);
        }

        // Update files separately
        setFiles(validFiles);

        // Update formData safely using previous state
        setFormData(prev => ({
            ...prev,
            additionalDocuments: validFiles,
        }));
    };

    // console.log("formData", formData);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.resumeFile) {
            toast.error("Please upload your resume before submitting.");
            return;
        }

        if (!formData.firstName || !formData.lastName) {
            toast.error("Please enter your first and last name.");
            return;
        }

        if (!formData.gender) {
            toast.error("Please select your gender.");
            return;
        }

        if (!formData.email) {
            toast.error("Please enter your email address.");
            return;
        }

        if (!formData.phone) {
            toast.error("Please enter your phone number.");
            return;
        }

        if (!formData.dob) {
            toast.error("Please enter your date of birth.");
            return;
        }

        if (!formData.checkbox) {
            toast.error("You must agree to the privacy policy before submitting.");
            return;
        }

        if (inputCaptcha !== captcha) {
            toast.error("Invalid Captcha! Please try again.");
            return;
        }

        const formDataToSend = new FormData();

        // Append normal fields
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "experienceList" && key !== "educationList" && key !== "additionalDocuments") {
                formDataToSend.append(key, value);
            }
        });

        // Append multiple files correctly
        if (formData.additionalDocuments && formData.additionalDocuments.length > 0) {
            formData.additionalDocuments.forEach((file) => {
                formDataToSend.append("additionalDocuments", file);
            });
        }

        // Append JSON-encoded experience & education
        formDataToSend.append("experienceList", JSON.stringify(formData.experienceList));
        formDataToSend.append("educationList", JSON.stringify(formData.educationList));

        console.log("formDataToSend", formDataToSend);

        setSubmitLoading(true);
        try {
            const response = await fetch("/api/jobform", {
                method: "POST",
                body: formDataToSend,
            });

            setSubmitLoading(false);

            if (response.status === 200) {
                toast.success("Application submitted successfully!");
                setFormData({
                    resumeFile: null,
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    gender: "",
                    email: "",
                    countryCode: "+91",
                    phone: "",
                    additionalDocuments: null,
                    dob: "",
                    experienceYears: "",
                    experienceMonths: "",
                    currentSalary: "",
                    expectedSalary: "",
                    preferredLocation: "",
                    availableJoinDays: "",
                    currentLocation: "",
                    notes: "",
                    previousEducation: "",
                    language: "",
                    skills: "",
                    role: "",
                    company: "",
                    degree: "",
                    institution: "",
                    checkbox: false,
                });
                setFiles([]);
                setExperienceList([]);
                setEducationList([]);
                setInputCaptcha("");
                setCaptcha(regenerateCaptcha());
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error submitting application. Please try again later.");
            setSubmitLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Header Section */}
            <header className="bg-[#a35285] text-white">
                <div className="max-w-4xl mx-auto p-6 md:p-10">
                    <h1 className="text-2xl font-bold">{job.company} - {job.jobTitle}</h1>
                    <p className="text-sm">{job.salaryAmount} {job.salaryCurrency} | {job.location} | {job.workplaceType}</p>
                </div>
            </header>

            {/* Form Section */}
            <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10 mt-6">
                <form className="space-y-6" noValidate>
                    {/* /* Upload Resume  */}
                    <FileUpload
                        label="Upload Resume"
                        description="Max file size: 10MB (Formats: .doc, .pdf, .docx, .rtf, .odt)"
                        accept=".doc,.pdf,.docx,.rtf,.odt"
                        multiple={false}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setFormData({ ...formData, resumeFile: file });
                            }
                        }}
                    />

                    {formData.resumeFile && (
                        <p className="text-sm text-gray-600 mt-2">Selected File: {formData.resumeFile?.name}</p>
                    )}

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="First Name"
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                        <InputField
                            label="Middle Name"
                            value={formData.middleName}
                            type="text"
                            placeholder="Enter your middle name"
                            onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                        />
                        <InputField
                            label="Last Name"
                            value={formData.lastName}
                            type="text"
                            placeholder="Enter your last name"
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label="Gender"
                            value={formData.gender} // <-- Controlled value
                            options={["Male", "Female", "Other"]}
                            onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))} // <-- Update state
                            required
                        />

                        <InputField
                            label="Email Address"
                            value={formData.email}
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="w-1/2">
                        <label className="text-gray-700 font-medium mb-1">
                            Mobile Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <select
                                value={formData.countryCode}
                                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                className="border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-[#a35284]"
                                required
                            >
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+61">+61</option>
                                <option value="+81">+81</option>
                                <option value="+86">+86</option>
                                <option value="+49">+49</option>
                                <option value="+33">+33</option>
                                <option value="+39">+39</option>
                                <option value="+7">+7</option>
                                <option value="+55">+55</option>
                                <option value="+27">+27</option>
                                <option value="+34">+34</option>
                                <option value="+64">+64</option>
                                <option value="+82">+82</option>
                                <option value="+971">+971</option>
                                <option value="+1-876">+1-876</option>
                                <option value="+20">+20</option>
                                <option value="+358">+358</option>
                                <option value="+47">+47</option>
                                <option value="+46">+46</option>
                                <option value="+63">+63</option>
                            </select>
                            <input
                                type="text"
                                value={formData.phone}
                                placeholder="Enter your phone number"
                                className="border p-2 flex-1 rounded-r focus:outline-none focus:ring-2 focus:ring-[#a35284]"
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Additional Documents */}
                    <div>
                        <label className="text-gray-700 font-medium">Additional Documents</label>
                        <div className="flex items-center mt-2">
                            <label className="flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-sm text-gray-500">
                                <CiCirclePlus className="text-3xl text-[#a35284]" />
                                <span>Add Files</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".doc,.pdf,.docx,.rtf,.odt"
                                    multiple
                                    onChange={handleFileChange} // ✅ No "value" attribute here
                                />
                            </label>
                            <p className="ml-4 text-xs text-gray-400">
                                Max size: 10MB (Formats: .doc, .pdf, .docx, .rtf, .odt)
                            </p>
                        </div>

                        {errorFile && <p className="text-red-500 text-xs mt-2">{errorFile}</p>}

                        {files.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-gray-700 font-medium">Selected Files:</h3>
                                <ul className="list-disc ml-5">
                                    {files.map((file, index) => (
                                        <li key={index} className="text-sm text-gray-600">{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Experience */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Date of Birth"
                            type="date"
                            value={formData.dob}
                            placeholder="Select Date of Birth"
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <InputField
                                label="Experience (Years)"
                                type="number"
                                value={formData.experienceYears}
                                placeholder="Years"
                                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                            />
                            <InputField
                                label="Experience (Months)"
                                value={formData.experienceMonths}
                                type="number"
                                placeholder="Months"
                                onChange={(e) => setFormData({ ...formData, experienceMonths: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Expected and Current Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Current Salary (INR)"
                            value={formData.currentSalary}
                            type="text"
                            placeholder="Enter current salary"
                            onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                        />
                        <InputField
                            label="Expected Salary (INR)"
                            value={formData.expectedSalary}
                            type="text"
                            placeholder="Enter expected salary"
                            onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Preferred Location"
                            value={formData.preferredLocation}
                            type="text"
                            placeholder="Enter preferred location"
                            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                        />
                        <InputField
                            label="Available To Join (in days)"
                            value={formData.availableJoinDays}
                            type="text"
                            placeholder="Enter available join days"
                            onChange={(e) => setFormData({ ...formData, availableJoinDays: e.target.value })}
                        />
                    </div>

                    {/* Additional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Current Location"
                            value={formData.currentLocation}
                            type="text"
                            placeholder="Enter current location"
                            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                        />
                        <InputField
                            label="Notes"
                            value={formData.notes}
                            type="text"
                            placeholder="Add any additional notes"
                            className="col-span-2"
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Language"
                            value={formData.language}
                            type="text"
                            placeholder="Enter your language"
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        />
                    </div>
                    <InputField
                        label="Skills"
                        value={formData.skills}
                        type="text"
                        placeholder="Add new skills"
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />

                    {/* Experience Details */}
                    <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-gray-800 font-medium text-sm md:text-base lg:text-lg mb-2 md:mb-3">
                            Experience Details
                        </h3>

                        {/* Dynamic List of Experience */}
                        <ul className="space-y-2">
                            {formData.experienceList.length > 0 ? (
                                formData.experienceList.map((exp) => (
                                    // Only render the list item if there is valid content for degree or institution
                                    (exp.role && exp.company) ? (
                                        <li
                                            key={exp.id}
                                            className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{exp.role}</p>
                                                <p className="text-xs text-gray-600">{exp.company}</p>
                                            </div>
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </li>
                                    ) : null // Don't render if no content for degree or institution
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No experience details added yet.</p>
                            )}
                        </ul>


                        {/* Input Fields for Adding New Experience */}
                        <div className="mt-4 space-y-2">
                            <input
                                type="text"
                                placeholder="Enter Role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Enter Company"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Button to Add Experience */}
                        <button
                            onClick={addExperience}
                            className="mt-3 flex items-center gap-2 text-[#a35284] text-sm font-medium hover:text-[#892d6b] transition-all"
                        >
                            <FaPlus /> Add Experience Details
                        </button>
                    </div>

                    {/* Education Details */}
                    <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-gray-800 font-medium text-sm md:text-base lg:text-lg mb-2 md:mb-3">
                            Education Details
                        </h3>

                        {/* Dynamic List of Education */}
                        <ul className="space-y-2">
                            {formData.educationList.length > 0 ? (
                                formData.educationList.map((edu) => (
                                    // Only render the list item if there is valid content for degree or institution
                                    (edu.degree && edu.institution) ? (
                                        <li
                                            key={edu.id}
                                            className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{edu.degree}</p>
                                                <p className="text-xs text-gray-600">{edu.institution}</p>
                                            </div>
                                            <button
                                                onClick={() => removeEducation(edu.id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </li>
                                    ) : null // Don't render if no content for degree or institution
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No education details added yet.</p>
                            )}
                        </ul>

                        {/* Input Fields for Adding New Education */}
                        <div className="mt-4 space-y-2">
                            <input
                                type="text"
                                placeholder="Enter Degree"
                                value={formData.degree}
                                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Enter Institution"
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Button to Add Education */}
                        <button
                            onClick={addEducation}
                            className="mt-3 flex items-center gap-2 text-[#a35284] text-sm font-medium hover:text-[#892d6b] transition-all"
                        >
                            <FaPlus /> Add Education Details
                        </button>
                    </div>

                    {/* Captcha */}
                    <div className="flex items-center space-x-4 w-1/2">
                        <div className="bg-gray-100 border rounded-md p-2 flex justify-center items-center text-lg font-semibold text-[#a35284] w-24">
                            {captcha}
                        </div>
                        <button
                            type="button"
                            className="text-[#a35284] text-sm font-medium hover:underline"
                            onClick={regenerateCaptcha}
                        >
                            <IoMdRefresh className="text-[2rem]" />
                        </button>
                        <input
                            type="text"
                            placeholder="Captcha"
                            className="border rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#a35284]"
                            value={inputCaptcha}
                            onChange={(e) => setInputCaptcha(e.target.value)}
                            required
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            value={formData.checkbox}
                            id="terms"
                            className="mt-1"
                            onChange={(e) => setFormData({ ...formData, checkbox: e.target.checked })}
                            required
                        />
                        <label htmlFor="terms" className="text-gray-600 text-sm">
                            By applying, you hereby accept the data processing terms under the {" "}
                            <a
                                href="/Terms&Condition"
                                className="text-[#a35284] underline hover:no-underline"
                            >
                                Privacy Policy {" "}
                            </a>
                            and give consent to processing of the data as part of this job
                            application.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitLoading}
                        onClick={handleFormSubmit}
                        className={`w-1/4 bg-[#a35284] text-white py-2 px-4 rounded-md hover:bg-[#872466] transition ${submitLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {
                            submitLoading ? (
                                <Loader2 className="h-6 w-6 mx-auto animate-spin" />
                            ) : (
                                "Apply Now"
                            )
                        }
                    </button>
                </form>
            </main>
        </div>
    );
}
