import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { uploadFile } from "@/lib/uploadHelper";

// API Route: Handle POST request (Add Education)
export async function POST(req) {
    try {
        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

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
            try {
                const buffer = Buffer.from(await file.arrayBuffer());
                const uploadResult = await uploadFile(buffer, "education-logos", file.name, file.type);
                imageUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.error("❌ Media Upload Failed:", uploadError);
                return Response.json({ error: "Image upload failed" }, { status: 500 });
            }
        }

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

        return Response.json({ success: true, education: newEducation }, { status: 200 });
    } catch (error) {
        console.error("❌ Error creating education:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// API Route: Handle PUT request (Edit Education)
export async function PUT(req) {
    try {
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

        // Upload new image (if provided)
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await uploadFile(buffer, "education-logos", file.name, file.type);
            imageUrl = uploadResult.secure_url;
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

        return Response.json({ success: true, message: "Education deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting education:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}