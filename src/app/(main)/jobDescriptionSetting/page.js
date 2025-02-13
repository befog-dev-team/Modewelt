"use client";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSubmitJobMutation } from "./mutation";

// Currency options based on country
const currencyMap = {
    "United States": "$ (USD)",
    "United Kingdom": "£ (GBP)",
    "European Union": "€ (EUR)",
    "India": "₹ (INR)",
    "Japan": "¥ (JPY)",
    "Canada": "C$ (CAD)",
    "Australia": "A$ (AUD)",
    "China": "¥ (CNY)",
    "Switzerland": "CHF",
    "UAE": "د.إ (AED)",
};

export default function JobSettingsForm() {
    const { mutate, isLoading } = useSubmitJobMutation();
    const router = useRouter();

    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        workplaceType: "",
        location: "",
        jobType: "full-time",
        description: "",
        requirements: "",
        benefits: "",
        skills: [],
        salaryCountry: "",
        salaryCurrency: "",
        salaryAmount: "",
        salaryType: "yearly",
        jobLevel: "Beginner",
        expirationDate: "",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFormData((prev) => ({
            ...prev,
            jobTitle: params.get("jobTitle") || "",
            company: params.get("company") || "",
            location: params.get("location") || "",
            workplaceType: params.get("workplaceType") || "",
            jobType: params.get("jobType") || "full-time",
            description: params.get("description") || "",
            requirements: params.get("requirements") || "",
            benefits: params.get("benefits") || "",
            skills: params.get("skills") ? params.get("skills").split(",") : [],
        }));
    }, []);

    // Handle country change and update currency accordingly
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFormData((prev) => ({
            ...prev,
            salaryCountry: selectedCountry,
            salaryCurrency: currencyMap[selectedCountry] || "",
        }));
    };

    console.log("formData", formData);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = [
            { field: formData.jobTitle, message: "Please enter a job title" },
            { field: formData.company, message: "Please enter a company name" },
            { field: formData.location, message: "Please enter an employee location" },
            { field: formData.workplaceType, message: "Please select a workplace type" },
            { field: formData.jobType, message: "Please select a job type" },
            { field: formData.description, message: "Please enter a job description" },
            { field: formData.requirements, message: "Please enter job requirements" },
            { field: formData.benefits, message: "Please enter job benefits" },
        ];

        for (const { field, message } of requiredFields) {
            if (typeof field === "string" && field.trim() === "") {
                toast.error(message);
                return;
            }
        }

        if (formData.skills.length === 0) {
            toast.error("Please add at least one skill");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                setFormData({
                    jobTitle: "",
                    company: "",
                    workplaceType: "",
                    location: "",
                    jobType: "full-time",
                    description: "",
                    skills: [],
                    salaryCountry: "",
                    salaryCurrency: "",
                    salaryAmount: "",
                    salaryType: "yearly",
                    jobLevel: "Beginner",
                    expirationDate: "",
                });
                router.push("/jobs");
            },
        });
    };

    return (
        <div className="bg-[#a2defa]">
            <div className="mb-8">
                <Navbar />
            </div>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Confirm Job Settings</h2>
                <div className="space-y-4">
                    {/* Salary Section */}
                    <h3 className="text-lg font-semibold">Salary</h3>
                    <label className="block font-medium">Country</label>
                    <select
                        className="w-full p-2 border rounded-md"
                        value={formData.salaryCountry}
                        onChange={handleCountryChange}
                    >
                        <option value="">Select Country</option>
                        {Object.keys(currencyMap).map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium">Currency</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={formData.salaryCurrency}
                                disabled={true} 
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">Amount</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={formData.salaryAmount}
                                onChange={(e) => setFormData({ ...formData, salaryAmount: e.target.value })}
                            />
                        </div>
                    </div>

                    <label className="block font-medium">Salary Type</label>
                    <select
                        className="w-full p-2 border rounded-md"
                        value={formData.salaryType}
                        onChange={(e) => setFormData({ ...formData, salaryType: e.target.value })}
                    >
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                    </select>

                    {/* Job Overview */}
                    <h3 className="text-lg font-semibold mt-6">Job Overview</h3>
                    <label className="block font-medium">Job Expiration Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={formData.expirationDate}
                        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                    />

                    <label className="block font-medium">Job Level</label>
                    <select
                        className="w-full p-2 border rounded-md"
                        value={formData.jobLevel}
                        onChange={(e) => setFormData({ ...formData, jobLevel: e.target.value })}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between">
                    <button className="text-[#f26744]"></button>
                    <div>
                        <button onClick={() => router.back()} className="mr-2 px-4 py-2 border rounded-md">
                            Back
                        </button>
                        <button type="submit" onClick={handleSubmit} className="bg-[#f26744] text-white px-4 py-2 rounded-md hover:bg-[#f26744]">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                            ) :
                                "Submit"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}