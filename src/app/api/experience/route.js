import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { uploadFile, deleteFile } from "@/lib/uploadHelper";

// Handle POST Request (Add Experience)
export async function POST(req) {
    try {
        const { user } = await validateRequest();
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
        
        const formData = await req.formData();
        const jobTitle = formData.get("jobTitle");
        const company = formData.get("company");
        const location = formData.get("location");
        const duration = formData.get("duration");
        const description = formData.get("description") || "";
        const file = formData.get("file");

        if (!jobTitle || !company || !location || !duration) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        let imageUrl = null;
        let publicId = null;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await uploadFile(buffer, "experience-logos", file.name, file.type);
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }

        const newExperience = await prisma.experience.create({
            data: { userId: user.id, jobTitle, company, location, duration, description, imageUrl, publicId }
        });

        return Response.json({ success: true, experience: newExperience }, { status: 200 });
    } catch (error) {
        console.error("❌ Error creating experience:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Handle PUT Request (Edit Experience)
export async function PUT(req) {
    try {
        const { user } = await validateRequest();
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const formData = await req.formData();
        const experienceId = formData.get("experienceId");
        const jobTitle = formData.get("jobTitle");
        const company = formData.get("company");
        const location = formData.get("location");
        const duration = formData.get("duration");
        const description = formData.get("description") || "";
        const file = formData.get("file");

        if (!experienceId || !jobTitle || !company || !location || !duration) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        const experience = await prisma.experience.findUnique({
            where: { id: experienceId, userId: user.id },
            select: { publicId: true, imageUrl: true },
        });
        if (!experience) return Response.json({ error: "Experience not found" }, { status: 404 });

        let imageUrl = experience.imageUrl;
        let publicId = experience.publicId;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await uploadFile(buffer, "experience-logos", file.name, file.type);
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
            if (experience.publicId) await deleteFile(experience.publicId);
        }

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

// Handle DELETE Request (Delete Experience)
export async function DELETE(req) {
    try {
        const { user } = await validateRequest();
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const { experienceId } = await req.json();
        if (!experienceId) return Response.json({ error: "Experience ID is required" }, { status: 400 });

        const experience = await prisma.experience.findUnique({
            where: { id: experienceId }
        });
        if (!experience) return Response.json({ error: "Experience not found" }, { status: 404 });

        if (experience.userId !== user.id && user.role !== "ADMIN") {
            return Response.json({ error: "Unauthorized" }, { status: 403 });
        }

        if (experience.publicId) await deleteFile(experience.publicId);
        await prisma.experience.delete({ where: { id: experienceId } });

        return Response.json({ success: true, message: "Experience deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting experience:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
