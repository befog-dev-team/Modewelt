import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to Upload to Cloudinary
const uploadToCloudinary = async (file, folder) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Data = reader.result?.toString().split(",")[1];

            cloudinary.uploader.upload(
                `data:${file.type};base64,${base64Data}`,
                { folder, resource_type: "raw" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
        };
    });
};

export async function POST(req) {
    try {
        const formData = await req.formData();

        console.log("📦 Form Data:", formData);

        // Extract Fields
        const fields = [
            "firstName",
            "middleName",
            "lastName",
            "gender",
            "email",
            "countryCode",
            "phone",
            "dob",
            "experienceYears",
            "experienceMonths",
            "currentSalary",
            "expectedSalary",
            "preferredLocation",
            "availableJoinDays",
            "currentLocation",
            "notes",
            "language",
            "skills",
            "checkbox",
            "jobId",
            "userId",
        ];

        let data = {};
        fields.forEach((field) => {
            data[field] = formData.get(field);
        });

        // Convert boolean values
        data.checkbox = data.checkbox === "true";

        // Handle File Uploads
        const resumeFile = formData.get("resumeFile");
        const additionalDocuments = formData.get("additionalDocuments");

        if (resumeFile) {
            const resumeUpload = await uploadToCloudinary(resumeFile, "job-resumes");
            data.resumeFile = resumeUpload.secure_url;
        }

        if (additionalDocuments) {
            const docsUpload = await uploadToCloudinary(additionalDocuments, "job-documents");
            data.additionalDocuments = docsUpload.secure_url;
        }

        // Save Application in Database
        const newApplication = await prisma.jobApplication.create({
            data,
        });

        return NextResponse.json({ success: true, application: newApplication }, { status: 201 });
    } catch (error) {
        console.error("❌ Error submitting application:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
