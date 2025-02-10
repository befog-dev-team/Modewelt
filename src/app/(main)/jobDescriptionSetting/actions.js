"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma"; // Import the Prisma client

// Submit a job to the feed
export async function submitJob(formData) {
    // Validate the request and get the user
    const { user } = await validateRequest();

    // If the user is not found, throw an error
    if (!user) throw Error("Unauthorized");

    try {
        // Create a new job using Prisma
        const newJob = await prisma.job.create({
            data: {
                jobTitle: formData.jobTitle,
                company: formData.company,
                workplaceType: formData.workplaceType, // e.g., Remote, On-site
                location: formData.location,
                jobType: formData.jobType, // e.g., Full-time, Part-time, etc.
                description: formData.description,
                requirements: formData.requirements,
                benefits: formData.benefits,
                skills: formData.skills, // Array of skills
                salaryCountry: formData.salaryCountry,
                salaryCurrency: formData.salaryCurrency,
                salaryAmount: formData.salaryAmount,
                salaryType: formData.salaryType, // e.g., Yearly, Monthly, etc.
                jobLevel: formData.jobLevel, // e.g., Beginner, Intermediate, etc.
                expirationDate: formData.expirationDate,
                userId: user.id, // Associate the job with the authenticated user
            },
        });

        return newJob; // Return the new job
    } catch (error) {
        console.error("Error creating job:", error);
        throw new Error("Failed to create job. Please try again.");
    }
}

// export async function submitJob(formData) {
//     const { user } = await validateRequest();
//     if (!user) throw new Error("Unauthorized");

//     if (!formData || typeof formData !== "object") {
//         throw new Error("Invalid form data: Expected an object but received null/undefined.");
//     }

//     console.log("Received formData:", formData);

//     try {
//         const newJob = await prisma.job.create({
//             data: {
//                 jobTitle: formData.jobTitle || "Untitled Job",
//                 company: formData.company || "Unknown",
//                 workplaceType: formData.workplaceType || "Remote",
//                 location: formData.location || "Unknown",
//                 jobType: formData.jobType || "Full-time",
//                 description: formData.description || "No description provided",
//                 requirements: formData.requirements || "No requirements listed",
//                 benefits: formData.benefits || "No benefits listed",
//                 skills: formData.skills || [],
//                 salaryCountry: formData.salaryCountry || "Unknown",
//                 salaryCurrency: formData.salaryCurrency || "USD",
//                 salaryAmount: formData.salaryAmount || 0,
//                 salaryType: formData.salaryType || "Yearly",
//                 jobLevel: formData.jobLevel || "Beginner",
//                 expirationDate: formData.expirationDate || new Date(),
//                 userId: user.id,
//             },
//         });

//         return newJob;
//     } catch (error) {
//         console.error("Error creating job:", error);
//         throw new Error("Failed to create job. Please try again.");
//     }
// }

