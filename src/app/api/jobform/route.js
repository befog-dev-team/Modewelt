import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadFile, deleteFile } from "@/lib/uploadHelper";
import path from "path";
import fs from "fs";

// 📌 Allowed document types
const ALLOWED_DOC_TYPES = ["pdf", "doc", "docx", "rtf", "odt", "txt"];

// 📌 Upload Function (Handles All Docs)
const uploadToStorage = async (fileBuffer, folder, filename) => {
    return await uploadFile(fileBuffer, folder, filename);
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
        const currentSalary = formData.get("currentSalary") || undefined;
        const expectedSalary = formData.get("expectedSalary") || undefined;
        const availableJoinDays = formData.get("availableJoinDays") || undefined;
        const preferredLocation = formData.get("preferredLocation") || undefined;
        const currentLocation = formData.get("currentLocation") || undefined;
        const portfolioUrl = formData.get("portfolioUrl") || undefined;
        const achievements = formData.get("achievements") || undefined;
        const language = formData.get("language") || undefined;
        const skills = formData.get("skills") || undefined;
        const agreedToPolicy = formData.get("checkbox") === "true";

        // 📌 Upload Resume
        const resumeFile = formData.get("resumeFile");
        let resumeFileUrl = null;
        let resumeFileName = null;
        let resumeFileSize = null;

        if (resumeFile instanceof File && resumeFile.size > 0) {
            try {
                const resumeBuffer = await resumeFile.arrayBuffer();
                const uploadResult = await uploadToStorage(Buffer.from(resumeBuffer), "job-resumes", resumeFile.name);
                resumeFileUrl = uploadResult.secure_url;
                resumeFileName = resumeFile.name;
                resumeFileSize = resumeFile.size;
            } catch (error) {
                console.error("❌ Error uploading resume to Cloudinary:", error);
                throw new Error("Failed to upload resume");
            }
        }

        // 📌 Upload Additional Documents
        const documentFiles = formData.getAll("additionalDocuments") || [];
        const additionalDocuments = await Promise.all(
            documentFiles.map(async (document) => {
                if (document instanceof File && document.size > 0) {
                    const docBuffer = Buffer.from(await document.arrayBuffer());
                    const uploadResult = await uploadToStorage(docBuffer, "job-documents", document.name);
                    return {
                        fileUrl: uploadResult.secure_url,
                        fileName: document.name,
                        fileSize: document.size,
                    };
                }
                return null; // Return null for non-file entries
            })
        ).then(results => results.filter(Boolean)); // Filter out null values

        // Parse Experience and Education Lists
        const experienceList = JSON.parse(formData.get("experienceList") || "[]");
        const educationList = JSON.parse(formData.get("educationList") || "[]");

        // Validate parsed lists
        if (!Array.isArray(experienceList)) {
            return NextResponse.json({ error: "Invalid experience list format" }, { status: 400 });
        }
        if (!Array.isArray(educationList)) {
            return NextResponse.json({ error: "Invalid education list format" }, { status: 400 });
        }

        // Create Job Application
        // Create Job Application
        const jobApplication = await prisma.jobApplication.create({
            data: {
                jobId,
                userId,
                firstName,
                middleName: middleName || undefined,
                lastName,
                gender: gender || undefined,
                email,
                countryCode: countryCode || undefined,
                phone: phone || undefined,
                resumeFileUrl: resumeFileUrl || undefined,
                resumeFileName: resumeFileName || undefined,
                resumeFileSize: resumeFileSize || undefined,
                dob: dob ? new Date(dob) : undefined,  // Convert string to Date object
                additionalDocuments: additionalDocuments.length ? additionalDocuments : undefined,
                currentSalary: currentSalary || undefined,
                expectedSalary: expectedSalary || undefined,
                availableJoinDays: availableJoinDays || undefined,
                preferredLocation: preferredLocation || undefined,
                currentLocation: currentLocation || undefined,
                portfolioUrl: portfolioUrl || undefined,
                achievements: achievements || undefined,
                language: language || undefined,
                skills: skills || undefined,
                agreedToPolicy,
                experienceList: experienceList.length ? experienceList : undefined,
                educationList: educationList.length ? educationList : undefined,
            },
        });

        // Ensure jobApplication is not null or undefined
        if (!jobApplication) {
            throw new Error("Failed to create job application");
        }

        // Ensure jobApplication is not null or undefined
        if (!jobApplication) {
            throw new Error("Failed to create job application");
        }

        return NextResponse.json(jobApplication, { status: 200 });
    } catch (error) {
        // Ensure error is a valid object
        const errorDetails = error instanceof Error ? {
            message: error.message,
            stack: error.stack,
        } : {
            message: "Unknown error occurred",
            details: error,
        };

        console.error("❌ Error submitting application:", errorDetails);

        // Return a valid error response
        return NextResponse.json(
            { error: "Internal Server Error", details: errorDetails },
            { status: 500 }
        );
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
        console.error("Error fetching applications:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 📌 Handle DELETE Request: Remove Job Application
export async function DELETE(req) {
    try {
        const { applicationId } = await req.json();
        if (!applicationId) return NextResponse.json({ error: "Application ID is required" }, { status: 400 });

        const application = await prisma.jobApplication.findUnique({ where: { id: applicationId } });
        if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });

        const deleteFiles = [application.resumeFileUrl, ...(application.additionalDocuments || []).map(d => d.fileUrl)].filter(Boolean);
        for (const fileUrl of deleteFiles) {
            if (fileUrl.startsWith("/uploads/")) {
                try {
                    const filePath = path.join(process.cwd(), "public", fileUrl);
                    if (fs.existsSync(filePath)) {
                        await fs.promises.unlink(filePath);
                        console.log(`Deleted local resume file: ${filePath}`);
                    }
                } catch (e) {
                    console.error("❌ Local file delete error:", e);
                }
            } else {
                try {
                    const publicId = fileUrl.split("/").pop().split(".")[0];
                    await deleteFile(publicId);
                } catch (e) {
                    console.error("❌ Remote file delete error:", e);
                }
            }
        }

        await prisma.jobApplication.delete({ where: { id: applicationId } });
        return NextResponse.json({ success: true, message: "Application deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting application:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
