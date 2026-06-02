"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
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
            { field: formData.salaryCountry, message: "Please select a country" },
            { field: formData.salaryAmount, message: "Please enter a salary amount" },
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
                router.push("/jobManagement");
            },
        });
    };

    return (
        <div className="bg-[#F9F6EE] dark:bg-gray-950 min-h-screen transition-colors">
            <div className="mb-8">
                <Navbar />
            </div>
            <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl border dark:border-gray-800 transition-colors">
                <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white transition-colors">Confirm Job Settings</h2>
                <div className="space-y-4">

                    <label htmlFor="salaryCountry" className="block font-medium cursor-pointer text-gray-900 dark:text-gray-200 mb-1">Country</label>
                    <select
                        id="salaryCountry"
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#fc3fb4] outline-none transition-colors"
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
                            <label htmlFor="salaryCurrency" className="block font-medium text-gray-900 dark:text-gray-200 mb-1">Currency</label>
                            <input
                                id="salaryCurrency"
                                type="text"
                                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-colors"
                                value={formData.salaryCurrency}
                                disabled={true}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="salaryAmount" className="block font-medium cursor-pointer text-gray-900 dark:text-gray-200 mb-1">Amount</label>
                            <input
                                id="salaryAmount"
                                type="number"
                                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#fc3fb4] outline-none transition-colors"
                                value={formData.salaryAmount}
                                onChange={(e) => setFormData(prev => ({ ...prev, salaryAmount: e.target.value }))}
                            />
                        </div>
                    </div>

                    <label htmlFor="salaryType" className="block font-medium cursor-pointer text-gray-900 dark:text-gray-200 mb-1">Salary Type</label>
                    <select
                        id="salaryType"
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#fc3fb4] outline-none transition-colors"
                        value={formData.salaryType}
                        onChange={(e) => setFormData(prev => ({ ...prev, salaryType: e.target.value }))}
                    >
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                    </select>

                    {/* Job Overview */}
                    <h3 className="text-lg font-semibold mt-6 text-gray-900 dark:text-white transition-colors">Job Overview</h3>
                    <label htmlFor="expirationDate" className="block font-medium cursor-pointer text-gray-900 dark:text-gray-200 mb-1">Job Expiry Date</label>
                    <input
                        id="expirationDate"
                        type="date"
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#fc3fb4] outline-none transition-colors"
                        value={formData.expirationDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
                    />

                    <label htmlFor="jobLevel" className="block font-medium cursor-pointer text-gray-900 dark:text-gray-200 mb-1">Job Level</label>
                    <select
                        id="jobLevel"
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#fc3fb4] outline-none transition-colors"
                        value={formData.jobLevel}
                        onChange={(e) => setFormData(prev => ({ ...prev, jobLevel: e.target.value }))}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-end">
                    <div>
                        <button onClick={() => router.back()} className="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Back
                        </button>
                        <button type="submit" onClick={handleSubmit} className="bg-[#fc3fb4] text-white px-4 py-2 rounded-md hover:bg-[#e037a1] transition-colors">
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