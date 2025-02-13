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

// API Route: Handle POST request (Add Education)
export async function POST(req) {
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
        const institution = formData.get("institution");
        const degree = formData.get("degree");
        const duration = formData.get("duration");
        const additionalInfo = formData.get("additionalInfo") || "";
        const file = formData.get("file");

        if (!institution || !degree || !duration) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        let imageUrl = null;

        if (file) {
            console.log("📤 Uploading to Cloudinary...");
            const buffer = Buffer.from(await file.arrayBuffer());

            try {
                const uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: "education-logos", transformation: [{ quality: "auto", fetch_format: "jpg" }] },
                        (error, result) => {
                            if (error) {
                                console.error("❌ Cloudinary Upload Error:", error);
                                reject(error);
                            } else {
                                resolve(result?.secure_url);
                            }
                        }
                    ).end(buffer);
                });

                imageUrl = uploadResult;
                console.log("✅ Uploaded Image URL:", imageUrl);
            } catch (uploadError) {
                console.error("❌ Cloudinary Upload Failed:", uploadError);
                return Response.json({ error: "Image upload failed" }, { status: 500 });
            }
        }

        // console.log("🚀 Saving Education Data:", { institution, degree, duration, additionalInfo, imageUrl });

        // Save education in the database
        const newEducation = await prisma.education.create({
            data: {
                userId: user.id,
                institution,
                degree,
                duration,
                additionalInfo,
                imageUrl,
            },
        });

        // console.log("✅ Education Created:", newEducation);

        return Response.json({ success: true, education: newEducation }, { status: 201 });
    } catch (error) {
        console.error("❌ Error creating education:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// API Route: Handle PUT request (Edit Education)
export async function PUT(req) {
    try {
        console.log("✏️ Updating education...");

        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse form data
        const formData = await req.formData();
        const educationId = formData.get("educationId");
        const institution = formData.get("institution");
        const degree = formData.get("degree");
        const duration = formData.get("duration");
        const additionalInfo = formData.get("additionalInfo") || "";
        const file = formData.get("file");

        if (!educationId || !institution || !degree || !duration) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        // Find the education record
        const education = await prisma.education.findUnique({
            where: { id: educationId, userId: user.id },
        });

        if (!education) {
            return Response.json({ error: "Education record not found" }, { status: 404 });
        }

        let imageUrl = education.imageUrl;

        // Upload new image to Cloudinary (if provided)
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "education-logos", transformation: [{ quality: "auto", fetch_format: "jpg" }] },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                ).end(buffer);
            });

            imageUrl = uploadResult;
        }

        // Update education in the database
        const updatedEducation = await prisma.education.update({
            where: { id: educationId },
            data: { institution, degree, duration, additionalInfo, imageUrl },
        });

        return Response.json({ success: true, education: updatedEducation }, { status: 200 });
    } catch (error) {
        console.error("❌ Error updating education:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// API Route: Handle DELETE request (Delete Education)
export async function DELETE(req) {
    try {
        console.log("🗑️ Deleting education record...");

        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse request body
        const { educationId } = await req.json();

        if (!educationId) {
            return Response.json({ error: "Education ID is required" }, { status: 400 });
        }

        // Find the education record
        const education = await prisma.education.findUnique({
            where: { id: educationId, userId: user.id },
        });

        if (!education) {
            return Response.json({ error: "Education record not found" }, { status: 404 });
        }

        // Delete the education record from the database
        await prisma.education.delete({
            where: { id: educationId },
        });

        console.log("✅ Education record deleted successfully");
        return Response.json({ success: true, message: "Education deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting education:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}