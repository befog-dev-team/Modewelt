import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { Readable } from "stream";

// 📌 Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Function to Upload to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder, filename) => {
    return new Promise((resolve, reject) => {
        const fileExtension = filename.split(".").pop(); // Extract file extension
        const publicId = filename.replace(/\.[^/.]+$/, ""); // Remove extension

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "raw",
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
            return Response.json({ error: "No form data provided" }, { status: 400 });
        }

        // Extract fields
        const jobId = formData.get("jobId");
        const userId = formData.get("userId");
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName");
        const lastName = formData.get("lastName");
        const gender = formData.get("gender");
        const email = formData.get("email");
        const countryCode = formData.get("countryCode");
        const phone = formData.get("phone");
        const dob = formData.get("dob");
        const resumeFile = formData.get("resumeFile");
        const additionalDocuments = formData.get("additionalDocuments");
        const experienceYears = formData.get("experienceYears");
        const experienceMonths = formData.get("experienceMonths");
        const currentSalary = formData.get("currentSalary");
        const expectedSalary = formData.get("expectedSalary");
        const availableJoinDays = formData.get("availableJoinDays");
        const preferredLocation = formData.get("preferredLocation");
        const currentLocation = formData.get("currentLocation");
        const notes = formData.get("notes");
        const language = formData.get("language");
        const skills = formData.get("skills");
        const experienceList = formData.get("experienceList");
        const educationList = formData.get("educationList");
        const checkbox = formData.get("checkbox");

        if (!jobId || !userId || !firstName || !email) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        console.log("📄 Form Data:", {
            jobId, userId, firstName, middleName, lastName, gender, email, countryCode, phone, dob,
            experienceYears, experienceMonths, currentSalary, expectedSalary, availableJoinDays,
            preferredLocation, currentLocation, notes, language, skills, checkbox, resumeFile, additionalDocuments, experienceList, educationList
        });

        // Parse lists properly
        // const parsedExperienceList = experienceList ? JSON.parse(experienceList) : null;
        // const parsedEducationList = educationList ? JSON.parse(educationList) : null;

        let resumeUrl = null;

        if (resumeFile && resumeFile instanceof File) {
            const resumeBuffer = await resumeFile.arrayBuffer();
            resumeUrl = await uploadToCloudinary(Buffer.from(resumeBuffer), "job-resumes", resumeFile.name);
        }

        // Insert into Prisma
        const newApplication = await prisma.jobApplication.create({
            data: {
                jobId,
                userId,
                firstName,
                middleName: middleName || null,
                lastName,
                gender,
                email,
                countryCode,
                phone,
                dob,
                resumeFile: resumeUrl || "",
                additionalDocuments: additionalDocuments || null,
                experienceYears: experienceYears || null,
                experienceMonths: experienceMonths || null,
                currentSalary: currentSalary || null,
                expectedSalary: expectedSalary || null,
                availableJoinDays: availableJoinDays || null,
                preferredLocation: preferredLocation || null,
                currentLocation: currentLocation || null,
                notes: notes || null,
                language: language || null,
                skills: skills || null,
                // experienceList: parsedExperienceList ? parsedExperienceList : null,
                // educationList: parsedEducationList ? parsedEducationList : null,
                // checkbox: checkbox === "true",
            },
        });
        
        console.log("✅ Application submitted:", newApplication);

        return Response.json(newApplication, { status: 201 });
    } catch (error) {
        console.error("❌ Error submitting application:", error);
        return Response.json({ error: "Internal Server Error", details: error.message || error }, { status: 500 });
    }
}

// 📌 Handle GET Request: Fetch Job Applications
export async function GET(req) {
    try {
        const jobId = new URL(req.url).searchParams.get("jobId");

        if (!jobId) {
            return Response.json({ error: "Job ID is required" }, { status: 400 });
        }

        const applications = await prisma.jobApplication.findMany({
            where: { jobId },
            orderBy: { createdAt: "desc" },
        });

        return Response.json({ success: true, applications }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching applications:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 📌 Handle DELETE Request: Remove Job Application
export async function DELETE(req) {
    try {
        const { applicationId } = await req.json();
        if (!applicationId) {
            return Response.json({ error: "Application ID is required" }, { status: 400 });
        }

        // Fetch application to get file URLs
        const application = await prisma.jobApplication.findUnique({
            where: { id: applicationId },
        });

        if (!application) {
            return Response.json({ error: "Application not found" }, { status: 404 });
        }

        // 📌 Extract Public ID from Cloudinary URLs
        const getPublicId = (url) => {
            if (!url) return null;
            const parts = url.split("/");
            return parts[parts.length - 1].split(".")[0];
        };

        const deleteFiles = [];
        if (application.resumeFile) deleteFiles.push(getPublicId(application.resumeFile));
        if (application.additionalDocuments) deleteFiles.push(getPublicId(application.additionalDocuments));

        // 📌 Delete files from Cloudinary
        if (deleteFiles.length > 0) {
            await cloudinary.api.delete_resources(deleteFiles, { resource_type: "raw" });
        }

        // Delete application from database
        await prisma.jobApplication.delete({
            where: { id: applicationId },
        });

        return Response.json({ success: true, message: "Application deleted" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting application:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
