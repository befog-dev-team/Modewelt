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

        // Extract and validate required fields
        const jobId = formData.get("jobId");
        const userId = formData.get("userId");
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");

        if (!jobId || !userId || !firstName || !lastName || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Extract optional fields
        const gender = formData.get("gender");
        const countryCode = formData.get("countryCode");
        const phone = formData.get("phone");
        const dob = formData.get("dob") || null;
        const experienceYears = parseInt(formData.get("experienceYears")) || 0;
        const experienceMonths = parseInt(formData.get("experienceMonths")) || 0;
        const currentSalary = formData.get("currentSalary") || undefined;
        const expectedSalary = formData.get("expectedSalary") || undefined;
        const availableJoinDays = formData.get("availableJoinDays") || undefined;
        const preferredLocation = formData.get("preferredLocation") || undefined;
        const currentLocation = formData.get("currentLocation") || undefined;
        const notes = formData.get("notes") || undefined;
        const language = formData.get("language") || undefined;
        const skills = formData.get("skills") || undefined;
        const agreedToPolicy = formData.get("checkbox") === "true";

        // Upload Resume
        let resumeUrl = undefined;
        const resumeFile = formData.get("resumeFile");
        if (resumeFile instanceof File && resumeFile.size > 0) {
            try {
                const resumeBuffer = await resumeFile.arrayBuffer();
                resumeUrl = await uploadToCloudinary(Buffer.from(resumeBuffer), "job-resumes", resumeFile.name);
            } catch (error) {
                console.error("❌ Error uploading resume to Cloudinary:", error);
                throw new Error("Failed to upload resume");
            }
        }

        // Upload Additional Documents
        let additionalDocuments = [];
        const documentFiles = formData.getAll("additionalDocuments") || [];
        for (const document of documentFiles) {
            if (document instanceof File && document.size > 0) {
                try {
                    const docBuffer = await document.arrayBuffer();
                    const docUrl = await uploadToCloudinary(Buffer.from(docBuffer), "job-documents", document.name);
                    additionalDocuments.push(docUrl);
                } catch (error) {
                    console.error("❌ Error uploading additional document to Cloudinary:", error);
                    throw new Error("Failed to upload additional documents");
                }
            }
        }

        // Parse Experience and Education Lists
        const experienceList = JSON.parse(formData.get("experienceList") || "[]");
        const educationList = JSON.parse(formData.get("educationList") || "[]");

        // Create Job Application
        const jobApplication = await prisma.jobApplication.create({
            data: {
                jobId,
                userId,
                firstName,
                middleName,
                lastName,
                gender,
                email,
                countryCode,
                phone,
                dob: dob ? new Date(dob) : undefined,
                resumeFile: resumeUrl,
                additionalDocuments: additionalDocuments.length > 0 ? additionalDocuments : undefined,
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
                agreedToPolicy,
                experienceList,
                educationList
            },
        });
        
        return NextResponse.json(jobApplication, { status: 200 });
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
