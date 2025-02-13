import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API Route: Handle POST request
export async function POST(req) {
    try {
        // Authenticate user
        const { user } = await validateRequest();
        console.log("🔐 User:", user);
        if (!user) {
            console.log("Unauthorized: No valid session found");
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("✅ Authenticated User:", user);

        // Parse form data
        const formData = await req.formData();
        const projectName = formData.get("projectName");
        const description = formData.get("description") || "";
        const file = formData.get("file");

        if (!projectName) {
            return Response.json({ error: "Project name is required" }, { status: 400 });
        }

        let mediaUploadResult = null;

        // Upload media to Cloudinary (if provided)
        if (file) {
            mediaUploadResult = await new Promise(async (resolve, reject) => {
                const buffer = Buffer.from(await file.arrayBuffer());

                cloudinary.uploader.upload_stream(
                    {
                        resource_type: file.type.startsWith("video/") ? "video" : "image",
                        folder: "projects-media",
                        transformation: file.type.startsWith("video/")
                            ? [{ width: 1280, height: 720, crop: "limit", fetch_format: "mp4" }]
                            : [{ quality: "auto", fetch_format: "jpg" }]
                    },
                    (error, result) => {
                        if (error) {
                            console.error("❌ Cloudinary Upload Error:", error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                ).end(buffer);
            });
        }

        // Save project in database
        const newProject = await prisma.project.create({
            data: {
                userId: user.id,
                name: projectName,
                description,
                media: mediaUploadResult
                    ? {
                        create: [
                            {
                                url: mediaUploadResult.secure_url,
                                fileName: file?.name || "default.jpg",
                                fileSize: file?.size || 0,
                                type: file?.type.startsWith("video/") ? "VIDEO" : "IMAGE",
                                public_id: mediaUploadResult.public_id,
                            },
                        ],
                    }
                    : undefined,
            },
            include: { media: true },
        });

        return Response.json({ success: true, project: newProject }, { status: 200 });
    } catch (error) {
        console.error("Error creating project:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}