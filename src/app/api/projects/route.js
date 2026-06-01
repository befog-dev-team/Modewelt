import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { uploadFile, deleteFile } from "@/lib/uploadHelper";

// API Route: Handle POST request
export async function POST(req) {
    try {
        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse form data
        const formData = await req.formData();
        const projectName = formData.get("projectName");
        const description = formData.get("description") || "";
        const file = formData.get("file");

        if (!projectName) {
            return Response.json({ error: "Project name is required" }, { status: 400 });
        }

        let mediaUploadResult = null;

        // Upload media (if provided)
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            mediaUploadResult = await uploadFile(buffer, "projects-media", file.name, file.type);
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

// API Route: Handle PUT request (Edit Project)
export async function PUT(req) {
    try {
        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Parse form data
        const formData = await req.formData();
        const projectId = formData.get("projectId");
        const projectName = formData.get("projectName");
        const description = formData.get("description") || "";
        const file = formData.get("file");
        if (!projectId || !projectName) {
            return Response.json({ error: "Project ID and name are required" }, { status: 400 });
        }
        // Find the project
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId: user.id },
            include: { media: true },
        });
        if (!project) {
            return Response.json({ error: "Project not found" }, { status: 404 });
        }
        let mediaUploadResult = null;
        // Upload new media (if provided)
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            mediaUploadResult = await uploadFile(buffer, "projects-media", file.name, file.type);
            // Delete old media if a new one is uploaded
            if (project.media?.length > 0 && project.media[0].public_id) {
                await deleteFile(project.media[0].public_id);
            }
        }
        // Update project in the database
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                name: projectName,
                description,
                media: mediaUploadResult
                    ? {
                        update: {
                            where: { id: project.media[0].id },
                            data: {
                                url: mediaUploadResult.secure_url,
                                fileName: file?.name || "default.jpg",
                                fileSize: file?.size || 0,
                                type: file?.type.startsWith("video/") ? "VIDEO" : "IMAGE",
                            },
                        },
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
        return Response.json({ success: true, project: updatedProject }, { status: 200 });
    } catch (error) {
        console.error("❌ Error updating project:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
// API Route: Handle DELETE request (Delete Project)
export async function DELETE(req) {
    try {
        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Parse request body
        const { projectId } = await req.json();
        if (!projectId) {
            return Response.json({ error: "Project ID is required" }, { status: 400 });
        }
        // Find the project
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId: user.id },
            include: { media: true },
        });
        if (!project) {
            return Response.json({ error: "Project not found" }, { status: 404 });
        }
        // Delete associated media
        if (project.media.length > 0) {
            for (const media of project.media) {
                if (media.public_id) {
                    await deleteFile(media.public_id);
                }
            }
        }
        // Delete the project from the database
        await prisma.project.delete({
            where: { id: projectId },
        });
        return Response.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting project:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}