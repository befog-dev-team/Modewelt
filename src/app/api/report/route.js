import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/uploadHelper";

// Upload to Storage Function
const uploadToStorage = async (fileBuffer, folder, filename, fileType) => {
    return await uploadFile(fileBuffer, folder, filename, fileType);
};

export async function POST(req) {
    try {
        const formData = await req.formData();

        if (!formData) {
            return NextResponse.json({ error: "No form data provided" }, { status: 400 });
        }

        // Extract report details
        const userId = formData.get("userId");
        const reason = formData.get("reason");
        const customReason = formData.get("customReason") || null;
        const email = formData.get("email");
        const altEmail = formData.get("altEmail") || null;
        let postId = formData.get("postId") || null;
        let jobId = formData.get("jobId") || null;

        // Validate Required Fields
        if (!userId || !reason || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Convert 'undefined' string to null
        if (postId === "undefined" || postId === "") {
            postId = null;
        }
        if (jobId === "undefined" || jobId === "") {
            jobId = null;
        }

        // Ensure at least one valid ID is provided
        if (!postId && !jobId) {
            return NextResponse.json({ error: "Invalid report: postId or jobId required" }, { status: 400 });
        }

        // Create Report in Database
        const report = await prisma.report.create({
            data: {
                userId,
                reason,
                customReason,
                email,
                altEmail,
                postId,
                jobId, // Job ID is now properly validated
            },
        });

        console.log("Received Files:", formData.getAll("files"));

        // Upload Files to Cloudinary
        const reportFiles = formData.getAll("files") || [];
        const uploadedFiles = await Promise.all(
            reportFiles.map(async (document) => {
                if (document && typeof document.arrayBuffer === "function" && document.size > 0) {
                    const docBuffer = Buffer.from(await document.arrayBuffer());
                    const uploadResult = await uploadToStorage(docBuffer, "report-files", document.name, document.type);
                    return {
                        reportId: report.id, // Associate media with the report
                        fileName: document.name,
                        fileSize: document.size,
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id,
                        type: document.type.includes("image") ? "IMAGE" :
                            document.type.includes("video") ? "VIDEO" :
                                document.type.includes("pdf") ? "PDF" :
                                    document.type.includes("audio") ? "AUDIO" : "OTHER",
                    };
                }
                return null;
            })
        ).then(results => results.filter(Boolean)); // Filter out null values

        // Save Uploaded Media References in Database
        if (uploadedFiles.length > 0) {
            await prisma.media.createMany({
                data: uploadedFiles,
            });
        }

        return NextResponse.json({ message: "Report submitted successfully", report }, { status: 200 });
    } catch (error) {
        const errorDetails = error instanceof Error ? {
            message: error.message,
            stack: error.stack,
        } : {
            message: "Unknown error occurred",
            details: error,
        };

        console.error("Error submitting report:", errorDetails);

        return NextResponse.json(
            { error: "Internal Server Error", details: errorDetails },
            { status: 500 }
        );
    }
}
