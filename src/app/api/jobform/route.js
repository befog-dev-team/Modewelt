import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { Readable } from "stream";
import { NextResponse } from "next/server";

// 📌 Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Upload to Cloudinary Function
// 📌 Allowed document types
const ALLOWED_DOC_TYPES = ["pdf", "doc", "docx", "rtf", "odt", "txt"];

// 📌 Upload to Cloudinary Function (Handles All Docs)
const uploadToCloudinary = async (fileBuffer, folder, filename) => {
    return new Promise((resolve, reject) => {
        const fileExtension = filename.split(".").pop().toLowerCase();
        const publicId = filename.replace(/\.[^/.]+$/, "");

        // Use "raw" for documents, "image" for images
        const resourceType = ALLOWED_DOC_TYPES.includes(fileExtension) ? "raw" : "image";

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
                public_id: publicId,
                format: fileExtension,
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );

        Readable.from(fileBuffer).pipe(stream);
    });
};

// 📌 Handle POST Request: Submit Job Application
export async function POST(req) {
    try {
        const formData = await req.formData();
        if (!formData) {
            return NextResponse.json({ error: "No form data provided" }, { status: 400 });
        }

        // Extract main fields
        const jobId = formData.get("jobId");
        const userId = formData.get("userId");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const gender = formData.get("gender");
        const email = formData.get("email");
        const countryCode = formData.get("countryCode");
        const phone = formData.get("phone");
        const dob = formData.get("dob") || null;
        const experienceYears = parseInt(formData.get("experienceYears")) || 0;
        const experienceMonths = parseInt(formData.get("experienceMonths")) || 0;
        const currentSalary = formData.get("currentSalary") || null;
        const expectedSalary = formData.get("expectedSalary") || null;
        const availableJoinDays = formData.get("availableJoinDays") || null;
        const preferredLocation = formData.get("preferredLocation") || null;
        const currentLocation = formData.get("currentLocation") || null;
        const notes = formData.get("notes") || null;
        const language = formData.get("language") || null;
        const skills = formData.get("skills") || null;
        const role = formData.get("role") || null;
        const company = formData.get("company") || null;
        const degree = formData.get("degree") || null;
        const institution = formData.get("institution") || null;
        const agreedToPolicy = formData.get("checkbox") === "true";

        // Upload Resume
        let resumeUrl = null;
        const resumeFile = formData.get("resumeFile");
        if (resumeFile instanceof File) {
            const resumeBuffer = await resumeFile.arrayBuffer();
            resumeUrl = await uploadToCloudinary(Buffer.from(resumeBuffer), "job-resumes", resumeFile.name);
        }

        // Upload Additional Documents
        let additionalDocuments = [];
        const documentFiles = formData.getAll("additionalDocuments") || [];
        for (const document of documentFiles) {
            if (document instanceof File) {
                const docBuffer = await document.arrayBuffer();
                const docUrl = await uploadToCloudinary(Buffer.from(docBuffer), "job-documents", document.name);
                additionalDocuments.push(docUrl);
            } else {
                additionalDocuments.push(document);
            }
        }

        console.log("📂 Uploaded Additional Documents:", additionalDocuments);

        // Ensure Experience & Education Lists are valid arrays
        const experienceList = JSON.parse(formData.get("experienceList") || "[]");
        const educationList = JSON.parse(formData.get("educationList") || "[]");

        console.log("📌 Experience List:", experienceList);
        console.log("🎓 Education List:", educationList);

        // 🔥 Use Prisma Transaction to Store Data Atomically
        const newApplication = await prisma.$transaction(async (tx) => {
            // Step 1: Create Job Application
            const jobApplication = await tx.jobApplication.create({
                data: {
                    jobId,
                    userId,
                    firstName,
                    lastName,
                    gender,
                    email,
                    countryCode,
                    phone,
                    dob,
                    resumeFile: resumeUrl || null,
                    additionalDocuments,
                    experienceYears,
                    experienceMonths,
                    currentSalary,
                    expectedSalary,
                    availableJoinDays,
                    preferredLocation,
                    currentLocation,
                    notes,
                    language,
                    skills,
                    role,
                    company,
                    degree,
                    institution,
                    agreedToPolicy,
                },
            });

            // Step 2: Store Experience List (Only if Not Empty)
            if (experienceList.length > 0) {
                await tx.experience.createMany({
                    data: experienceList.map(exp => ({
                        jobApplicationId: jobApplication.id,
                        jobTitle: exp.role,
                        companyName: exp.company,
                        startDate: exp.startDate ? new Date(exp.startDate) : null,
                        endDate: exp.endDate ? new Date(exp.endDate) : null,
                        description: exp.description || null,
                    })),
                });
            }

            // Step 3: Store Education List (Only if Not Empty)
            if (educationList.length > 0) {
                await tx.education.createMany({
                    data: educationList.map(edu => ({
                        jobApplicationId: jobApplication.id,
                        degree: edu.degree,
                        institution: edu.institution,
                    })),
                });
            }

            return jobApplication;
        });

        return NextResponse.json(newApplication, { status: 201 });

    } catch (error) {
        console.error("❌ Error submitting application:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message || error }, { status: 500 });
    }
}

// 📌 Handle GET Request: Fetch Job Applications
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get("jobId");

        if (!jobId) return NextResponse.json({ error: "Job ID is required" }, { status: 400 });

        const applications = await prisma.jobApplication.findMany({
            where: { jobId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, applications }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching applications:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 📌 Handle DELETE Request: Remove Job Application
export async function DELETE(req) {
    try {
        const { applicationId } = await req.json();
        if (!applicationId) return NextResponse.json({ error: "Application ID is required" }, { status: 400 });

        const application = await prisma.jobApplication.findUnique({
            where: { id: applicationId },
        });

        if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });

        // Delete files from Cloudinary
        const deleteFiles = [
            ...(application.resumeFile ? [application.resumeFile] : []),
            ...(application.additionalDocuments ? application.additionalDocuments : []),
        ];

        for (const fileUrl of deleteFiles) {
            const publicId = fileUrl.split("/").pop().split(".")[0];
            await cloudinary.api.delete_resources([publicId], { resource_type: "raw" });
        }

        // Delete application from database
        await prisma.jobApplication.delete({
            where: { id: applicationId },
        });

        return NextResponse.json({ success: true, message: "Application deleted" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting application:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
