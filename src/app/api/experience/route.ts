import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Interface for Cloudinary Upload Results
interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    bytes: number;
}

// 📌 Handle POST Request (Add Experience)
export async function POST(req: NextRequest) {
    try {
        console.log("🔍 Received Cookies:", req.headers.get("cookie"));

        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("✅ Authenticated User:", user);

        // Parse form data
        const formData = await req.formData();
        const jobTitle = formData.get("jobTitle") as string;
        const company = formData.get("company") as string;
        const location = formData.get("location") as string;
        const duration = formData.get("duration") as string;
        const description = formData.get("description") as string || "";
        const file = formData.get("file") as File | null;

        if (!jobTitle || !company || !location || !duration) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        let imageUrl: string | null = null;
        let publicId: string | null = null;

        // Upload image to Cloudinary (if provided)
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "experience-logos", transformation: [{ quality: "auto", fetch_format: "jpg" }] },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                ).end(buffer);
            });

            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }

        // Save experience in database
        const newExperience = await prisma.experience.create({
            data: {
                userId: user.id,
                jobTitle,
                company,
                location,
                duration,
                description,
                imageUrl,
                publicId,
            },
        });

        return Response.json({ success: true, experience: newExperience }, { status: 201 });
    } catch (error) {
        console.error("❌ Error creating experience:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 📌 Handle GET Request (Fetch Experiences)
export async function GET(req: NextRequest) {
    console.log(req);
    try {
        console.log("📡 Fetching experiences...");

        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch experiences from the database for the logged-in user
        const experiences = await prisma.experience.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" }, // Sort by latest experiences
        });

        return Response.json({ success: true, experiences }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching experiences:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 📌 Handle PUT Request (Edit Experience)
export async function PUT(req: NextRequest) {
    try {
        console.log("✏️ Updating experience...");

        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse form data
        const formData = await req.formData();
        const experienceId = formData.get("experienceId") as string;
        const jobTitle = formData.get("jobTitle") as string;
        const company = formData.get("company") as string;
        const location = formData.get("location") as string;
        const duration = formData.get("duration") as string;
        const description = formData.get("description") as string || "";
        const file = formData.get("file") as File | null;

        if (!experienceId || !jobTitle || !company || !location || !duration) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        // Find the experience
        const experience = await prisma.experience.findUnique({
            where: { id: experienceId, userId: user.id },
            select: { publicId: true, imageUrl: true },
        });

        if (!experience) {
            return Response.json({ error: "Experience not found" }, { status: 404 });
        }

        let imageUrl = experience.imageUrl;
        let publicId = experience.publicId;

        // Upload new image if provided
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "experience-logos", transformation: [{ quality: "auto", fetch_format: "jpg" }] },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                ).end(buffer);
            });

            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;

            // Delete old image from Cloudinary
            if (experience.publicId) {
                await cloudinary.uploader.destroy(experience.publicId);
            }
        }

        // Update experience in the database
        const updatedExperience = await prisma.experience.update({
            where: { id: experienceId },
            data: { jobTitle, company, location, duration, description, imageUrl, publicId },
        });

        return Response.json({ success: true, experience: updatedExperience }, { status: 200 });
    } catch (error) {
        console.error("❌ Error updating experience:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 📌 Handle DELETE Request (Delete Experience)
export async function DELETE(req: NextRequest) {
    try {
        console.log("🗑️ Deleting experience...");

        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse request body
        const { experienceId } = await req.json();
        if (!experienceId) {
            return Response.json({ error: "Experience ID is required" }, { status: 400 });
        }

        // Find the experience
        const experience = await prisma.experience.findUnique({
            where: { id: experienceId, userId: user.id },
        });

        if (!experience) {
            return Response.json({ error: "Experience not found" }, { status: 404 });
        }

        // Delete associated image from Cloudinary
        if (experience.publicId) {
            await cloudinary.uploader.destroy(experience.publicId);
        }

        // Delete the experience from the database
        await prisma.experience.delete({ where: { id: experienceId } });

        return Response.json({ success: true, message: "Experience deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting experience:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}